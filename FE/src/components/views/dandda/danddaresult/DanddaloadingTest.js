/**
 * @description Make an image classification app using React and Tensorflow JS
 */

import { useEffect, useState, useRef } from "react";
import React from "react";
import "./Danddaloading.css";
import * as tf from "@tensorflow/tfjs";
import * as tmPose from "@teachablemachine/pose";
import $ from "jquery";

function TmPose() {
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [model, setModel] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [results, setResults] = useState([]);

  const videoRef = useRef();

  let labelContainer = "<div>엘리먼트 추가</div>";

  // 모델 로딩 함수
  const loadModel = async () => {
    const URL = "https://teachablemachine.withgoogle.com/models/8a2i874rC/";
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    setIsModelLoading(true);
    try {
      const model = await tmPose.load(modelURL, metadataURL);
      const maxPredictions = model.getTotalClasses();

      setModel(model);
      console.log("모델 로딩 성공");
      setIsModelLoading(false);

      for (let i = 0; i < maxPredictions; i++) {
        labelContainer = "<div>엘리먼트 수정</div>";
        // elements.push(React.createElement("div", null, `엘리먼트 추가`));
      }

      // let labelContainer = React.createElement("div", { className: "label-container" }, elements);
    } catch (error) {
      console.log(error);
      setIsModelLoading(false);
    }
  };

  // 비디오 업로드
  const uploadVideo = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setVideoURL(url);
    } else {
      setVideoURL(null);
    }
  };

  // 인식하기
  const identify = async () => {
    const results = await model.classify(videoRef.current);
    setResults(results);
  };

  // 모델 로딩
  useEffect(() => {
    loadModel();
  }, []);

  // 모델 로딩중일 때
  if (isModelLoading) {
    return <h2>Model Loading...</h2>;
  }

  return (
    <div className="TmPose">
      <h1 className="header">Video Identification</h1>
      <div className="inputHolder">
        <input
          type="file"
          accept="video/*"
          capture="camera"
          className="uploadInput"
          onChange={uploadVideo}
        />
      </div>
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
                alt="Upload Preview"
                crossOrigin="anonymous"
                ref={videoRef}
                controls
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

        <div dangerouslySetInnerHTML={{ __html: labelContainer }} className="label-container"></div>
      </div>
    </div>
  );
}

export default TmPose;
