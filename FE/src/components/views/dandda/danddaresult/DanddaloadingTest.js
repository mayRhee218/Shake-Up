/**
 * 모델 인식 결과 페이지
 *
 * @author 다은
 * @version 1.0.0
 * 작성일 : 2022-02-11
 *
 **/

import { useEffect, useState, useRef } from "react";
import React from "react";
import * as tf from "@tensorflow/tfjs";
import * as tmPose from "@teachablemachine/pose";
import { getFile } from "../../firebase/db";

function TmPose() {
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [model, setModel] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [results, setResults] = useState([]);
  const [labels, setLabels] = useState(null);
  const [maxPredictions, setMaxPredictions] = useState(null);
  const [animationFrame, setAnimationFrame] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);

  const videoRef = useRef();

  // 모델 로딩 함수
  const loadModel = async () => {
    // Next Level 학습 모델
    const URL = "https://teachablemachine.withgoogle.com/models/8a2i874rC/";
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    setIsModelLoading(true);
    try {
      const model = await tmPose.load(modelURL, metadataURL);

      const maxPredictions = model.getTotalClasses();

      setModel(model);
      setMaxPredictions(maxPredictions);
      setIsModelLoading(false);

      console.log("모델 로딩 성공");

      // 클래스 개수만큼 div 추가
      let label = "";
      for (let i = 0; i < maxPredictions; i++) {
        label += "<div>클래스 이름 : 정확도</div>";
      }

      setLabels(label);
    } catch (error) {
      console.log(error);
      setIsModelLoading(false);
    }
  };

  // 파이어 베이스의 video url 가져오기
  const uploadFirebaseVideo = async () => {
    const res = await getFile("daeun_test.mp4");
    setVideoURL(res);
  };

  // 인식하기
  let cnt = 0; // 맞춘 개수
  let startTimeSeconds; // 시작 시간 가져오기
  let curTimeSeconds; // 현재 시간 가져오기
  let timeSeconds; // (현재 시간 - 시작 시간) => 경과한 시간(초) 구하기
  let checkCount0 = false,
    checkCount1 = false,
    checkCount2 = false; // 동작이 맞았는지 체크

  const identify = async () => {
    const labelContainer = document.querySelector(".label-container");
    const { pose, posenetOutput } = await model.estimatePose(videoRef.current, false);
    const results = await model.predict(posenetOutput);

    setResults(results);

    // 경과 시간 구하기
    curTimeSeconds = new Date().getSeconds();
    timeSeconds = curTimeSeconds - startTimeSeconds;

    // 인식
    for (let i = 0; i < maxPredictions; i++) {
      // 클래스 이름 : 정확도 innerHTML로 넣기
      const prediction = results[i].className + ": " + results[i].probability.toFixed(2);
      labelContainer.childNodes[i].innerHTML = prediction;

      // left
      if (results[0].probability.toFixed(2) > 0.9) {
        if (timeSeconds >= 0 && timeSeconds <= 2) {
          if (!checkCount0) {
            console.log("left 인식 => 경과 시간 : " + timeSeconds);
            checkCount0 = true; // 반복문 안에서 setState 쓰면 리렌더링이 안되므로 쓰면 X
            setCorrectCount(++cnt);
          }
        }
      }
      // right
      else if (results[1].probability.toFixed(2) > 0.9) {
        if (timeSeconds >= 3 && timeSeconds <= 4) {
          if (!checkCount1) {
            console.log("right 인식 => 경과 시간 : " + timeSeconds);
            checkCount1 = true;
            setCorrectCount(++cnt);
          }
        }
      }
      // default
      // else if (results[2].probability.toFixed(2) > 0.9) {
      //   if (!checkCount2) {
      //     checkCount2 = true;
      //     setCorrectCount(++cnt);
      //   }
      // }
    }
  };

  // 동영상 인식 반복 호출
  const loop = async () => {
    await identify();
    setAnimationFrame(window.requestAnimationFrame(loop));
  };

  // loop 함수 호출하기 (이 함수는 한번만 실행, startTime을 구하기 위해 사용)
  const startLoop = () => {
    startTimeSeconds = new Date().getSeconds();
    loop();
  };

  // 모델 로딩
  useEffect(() => {
    loadModel();
    uploadFirebaseVideo();
  }, []);

  // 모델 로딩중일 때
  if (isModelLoading) {
    return <h2>Model Loading...</h2>;
  }

  // 비디오가 끝나면 인식 멈춤
  const myCallback = () => {
    return window.cancelAnimationFrame(animationFrame);
  };

  return (
    <div className="TmPose" style={{ textAlign: "center" }}>
      <h1 className="header" style={{ textAlign: "center" }}>
        Video Identification
      </h1>
      <div className="mainWrapper">
        <div className="mainContent">
          <div className="videoHolder">
            {videoURL && (
              <video
                id="video"
                class="file-upload-video"
                src={videoURL}
                width="300"
                height="300"
                crossOrigin="anonymous" // 이거 없으면 model.estimatePose 실행 안됨★
                ref={videoRef}
                autoPlay
                // controls
                muted
                onPlay={startLoop}
                onEnded={() => myCallback()} // 비디오 끝나면 인식 멈춤
              ></video>
            )}
          </div>
        </div>

        {/* <div className="identify-container">
          {videoURL && (
            <button className="button" onClick={startLoop}>
              인식 버튼을 눌러주세용
            </button>
          )}
        </div>
        <br></br> */}

        <div className="label-container" dangerouslySetInnerHTML={{ __html: labels }}></div>
        <br></br>
        <div className="result-container">
          맞춘 동작 개수
          {/* 몇 개 맞췄는지 결과 내기 */}
          <div className="resultContent">
            {correctCount} / {maxPredictions}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TmPose;
