/**
 * @description Make an image classification app using React and Tensorflow JS
 */

import { useEffect, useState, useRef } from "react";
import React from "react";
import * as tf from "@tensorflow/tfjs";
import * as tmPose from "@teachablemachine/pose";
import $ from "jquery";
import { getFile } from "../../firebase/db";

function TmPose() {
  const [isModelLoading, setIsModelLoading] = useState(false);
  // const [model, setModel] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [results, setResults] = useState([]);
  const [labels, setLabels] = useState(null);

  const videoRef = useRef();

  let model, maxPredictions;

  // 모델 로딩 함수
  const loadModel = async () => {
    // Next Level 학습 모델
    const URL = "https://teachablemachine.withgoogle.com/models/Fwie9ZFvv/";
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    setIsModelLoading(true);
    try {
      model = await tmPose.load(modelURL, metadataURL);
      maxPredictions = model.getTotalClasses();

      // setModel(model);
      console.log("모델 로딩 성공");
      setIsModelLoading(false);

      // 클래스 개수만큼 div 추가
      let label = "";
      console.log("maxPredictions : " + maxPredictions);
      for (let i = 0; i < maxPredictions; i++) {
        label += "<div>엘리먼트 수정</div>";
      }
      setLabels(label);
    } catch (error) {
      console.log(error);
      setIsModelLoading(false);
    }
  };

  // 파이어 베이스의 video url 가져오기
  const uploadFirebaseVideo = async () => {
    const res = await getFile("12345.mp4");
    setVideoURL(res);
  };

  // 인식하기
  const identify = async () => {
    console.log("identify 함수 호출");

    const video = document.querySelector(".");
    console.log("identify 함수 호출2");
    const { pose, posenetOutput } = await model.estimatePose(videoRef, false);
    console.log("identify 함수 호출3");
    const results = await model.predict(posenetOutput);
    console.log("identify 함수 호출4");
    setResults(results);
    console.log("result : " + results);
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

  return (
    <div className="TmPose">
      <h1 className="header">Video Identification</h1>
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
                ref={videoRef}
                autoPlay
                muted
              ></video>
            )}
          </div>

          <div className="result-container">
            {/* {results.length > 0 && (
            <div className="resultsHolder">
              {results.map((result, index) => {
                return (
                  <div className="result" key={result.className}>
                    <span className="name">{result.className}</span>
                    <span className="confidence">
                      Confidence level: {(result.probability * 100).toFixed(2)}%{" "}
                      {index === 0 && <span className="bestGuess">Best Guess</span>}
                    </span>
                  </div>
                );
              })}
            </div>
          )} */}
          </div>
        </div>

        <div className="identify-container">
          {videoURL && (
            <button className="button" onClick={identify}>
              인식 버튼을 눌러주세용
            </button>
          )}
        </div>

        <div dangerouslySetInnerHTML={{ __html: labels }} className="label-container"></div>
      </div>
    </div>
  );
}

export default TmPose;
