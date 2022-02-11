/**
 * 모델 인식 결과 페이지
 *
 * @author 다은
 * @version 1.0.0
 * 작성일 : 2022-02-11
 *
 **/

import React, { useEffect, useState, useRef } from "react";
import { css } from "@emotion/react";
import "./Danddaloading.css";
import * as tmPose from "@teachablemachine/pose";
import { getFile } from "../../firebase/db";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { getDatabase, ref, onValue } from "firebase/database";
// Can be a string as well. Need to ensure each key-value pair ends with ;

// const override = css`
//     display: block;
//     margin: 0 auto;
//     border-color: red;
// `;

function Danddaloading() {
  // 로딩중
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  const database = getDatabase();

  const message = ref(database, "message");
  onValue(message, (snapshot) => {
    const data = snapshot.val();
    // console.log("데이터베이스안의 값 : " + data);
  });
  // 로딩중 끝

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
    const URL = "https://teachablemachine.withgoogle.com/models/8a2i874rC/"; // 넘어올 값
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
        label += "<div></div>";
      }

      setLabels(label);
    } catch (error) {
      console.log(error);
      setIsModelLoading(false);
    }
  };

  // 파이어 베이스의 realtime video url 가져오기
  const uploadFirebaseVideo = () => {
    const url = "https://dance-704a8-default-rtdb.firebaseio.com/message.json";
    axios
      .get(url)
      .then(async (res) => {
        const tmp = await getFile(res.data);
        setVideoURL(tmp);
      })
      .catch((err) => {
        console.log(err);
      });
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
            console.log(results[i].className + " 인식 => 경과 시간 : " + timeSeconds + "초");
            checkCount0 = true; // 반복문 안에서 setState 쓰면 리렌더링이 안되므로 쓰면 X
            setCorrectCount(++cnt);
          }
        }
      }
      // right
      else if (results[1].probability.toFixed(2) > 0.9) {
        if (timeSeconds >= 3 && timeSeconds <= 4) {
          if (!checkCount1) {
            console.log(results[i].className + " 인식 => 경과 시간 : " + timeSeconds + "초");
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
      <div className="mainWrapper">
        <div className="mainContent">
          <div
            className="sweet-loading"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "88vh",
            }}
          >
            {/* <ClipLoader color={color} loading={loading} css={override} size={150} /> */}
            {/* <ClipLoader color={color} loading={loading} css={override} size={150} /> */}
          </div>

          <div className="videoHolder" style={{ visibility: "hidden" }}>
            {videoURL && (
              <video
                id="video"
                className="file-upload-video"
                src={videoURL}
                width="300"
                height="300"
                crossOrigin="anonymous" // 이거 없으면 model.estimatePose 실행 안됨★
                ref={videoRef}
                autoPlay
                muted
                onPlay={startLoop}
                onEnded={() => myCallback()} // 비디오 끝나면 인식 멈춤
              ></video>
            )}
          </div>
{/* =======
    
    
    return (
        <div className="sweet-loading" style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center' 
            , width: '100%', height: '88vh'
        }}>
            
            {/* <ClipLoader color={color} loading={loading} css={override} size={150} /> */}
{/* feature/FE/danddamain */} 
        </div>

        {/* <div className="identify-container">
          {videoURL && (
            <button className="button" onClick={startLoop}>
              인식 버튼을 눌러주세용
            </button>
          )}
        </div>
        <br></br> */}

        <div
          className="label-container"
          style={{ visibility: "hidden" }}
          dangerouslySetInnerHTML={{ __html: labels }}
        ></div>
        <br></br>
        <div className="result-container" style={{ visibility: "hidden" }}>
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
export default Danddaloading;
