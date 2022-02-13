/**
 * 모델 인식 결과 페이지
 *
 * @author 다은
 * @version 1.0.0
 * 작성일 : 2022-02-12
 *
 **/

import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import "./Danddaloading.css";
import * as tmPose from "@teachablemachine/pose";
import ClipLoader from "react-spinners/ClipLoader";
import { getDatabase, ref, onValue } from "firebase/database";
import { getFile } from "../../firebase/db";
// Can be a string as well. Need to ensure each key-value pair ends with ;

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Danddaloading() {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#ffffff");
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [model, setModel] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [checkTurl, setCheckTurl] = useState(false);
  const [turl, setTurl] = useState(null);
  const [results, setResults] = useState([]);
  const [labels, setLabels] = useState(null);
  const [maxPredictions, setMaxPredictions] = useState(null);
  const [animationFrame, setAnimationFrame] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);

  const videoRef = useRef();

  const navigate = useNavigate();

  let cnt = 0; // 맞춘 개수
  let startTimeSeconds; // 시작 시간 가져오기
  let curTimeSeconds; // 현재 시간 가져오기
  let timeSeconds; // (현재 시간 - 시작 시간) => 경과한 시간(초) 구하기
  let checkCount0 = false,
    checkCount1 = false; // 동작이 맞았는지 체크
  let URL;

  // 모델 URL 값이 세팅 되었을 때, 모델 로딩 함수 실행
  const getTurl = () => {
    URL = turl;

    if (!checkTurl) loadModel();
    else return;
  };

  // 모델 로딩 함수
  const loadModel = async () => {
    // URL = "https://teachablemachine.withgoogle.com/models/8a2i874rC/"; // 넘어올 값

    setCheckTurl(true);

    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    setIsModelLoading(true); // 모델 로딩중...
    try {
      const model = await tmPose.load(modelURL, metadataURL);

      const maxPredictions = model.getTotalClasses();

      setModel(model);
      setMaxPredictions(maxPredictions);
      setIsModelLoading(false);

      console.log("모델 로딩 성공");
      console.log("loadModel 함수의 turl : " + URL);

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
  const downloadFirebaseVideo = () => {
    const database = getDatabase();

    // 영상 url 가져오기
    const message = ref(database, "message");
    onValue(message, async (snapshot) => {
      const data = snapshot.val();
      const videoUrl = await getFile(data);
      setVideoURL(videoUrl);
    });

    // 모델 url (turl) 가져오기
    const turlTmp = ref(database, "turl");
    onValue(turlTmp, async (snapshot) => {
      const data = await snapshot.val();
      setTurl(data);
    });
  };

  // 인식하기
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
            console.log(results[0].className + " 인식 => 경과 시간 : " + timeSeconds + "초");
            checkCount0 = true; // 반복문 안에서 setState 쓰면 리렌더링이 안되므로 쓰면 X
            setCorrectCount(++cnt);
          }
        }
      }
      // right
      else if (results[1].probability.toFixed(2) > 0.9) {
        if (timeSeconds >= 3 && timeSeconds <= 4) {
          if (!checkCount1) {
            console.log(results[1].className + " 인식 => 경과 시간 : " + timeSeconds + "초");
            checkCount1 = true;
            setCorrectCount(++cnt);
          }
        }
      }
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

  // 파이어베이스 업로드
  useEffect(() => {
    downloadFirebaseVideo();
  }, []);

  // 모델 로딩중일 때
  if (isModelLoading) {
    return <h2>Model Loading...</h2>;
  }

  // 비디오가 끝나면 인식 멈춤
  const myCallback = () => {
    navigate("/:id", {
      state: {
        maxPredictions: maxPredictions,
        correctCount: correctCount,
      },
    });
    // return window.cancelAnimationFrame(animationFrame);
  };

  return (
    <div className="TmPose" style={{ textAlign: "center" }}>
      <div className="mainWrapper">
        <div className="mainContent">
          {/* <div
            className="sweet-loading"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "88vh",
            }}
          >
            <ClipLoader color={color} loading={loading} css={override} size={150} />
          </div> */}

          <div
            className="videoHolder"
            // style={{ visibility: "hidden" }}
          >
            {videoURL && (
              <video
                id="video"
                className="file-upload-video"
                src={videoURL}
                width="auto"
                height="auto"
                crossOrigin="anonymous" // 이거 없으면 model.estimatePose 실행 안됨★
                ref={videoRef}
                autoPlay
                muted
                onPlay={startLoop}
                onEnded={() => myCallback()} // 비디오 끝나면 인식 멈춤
              ></video>
            )}
          </div>
        </div>
        <div
          className="label-container"
          // style={{ visibility: "hidden" }}
          dangerouslySetInnerHTML={{ __html: labels }}
        ></div>
        <br></br>
        <div
          className="result-container"
          // style={{ visibility: "hidden" }}
        >
          {/* 몇 개 맞췄는지 결과 내기 */}
          {turl && (
            <div className="getTurl">
              맞춘 동작 개수<br></br>
              {correctCount} / {maxPredictions}
              {getTurl()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Danddaloading;
