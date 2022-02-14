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
  let t; // (현재 시간 - 시작 시간) => 경과한 시간(초) 구하기
  // 동작이 맞았는지 체크
  let m0c0 = false,
    m0c1 = false,
    m0c2 = false,
    m0c3 = false,
    m0c4 = false,
    m0c5 = false,
    m0c6 = false,
    m0c7 = false,
    m0c8 = false,
    m0c9 = false;
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

      // // 클래스 개수만큼 div 추가
      // let label = "";
      // for (let i = 0; i < maxPredictions; i++) {
      //   label += "<div></div>";
      // }
      //
      // setLabels(label);
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
      // console.log("videoUrl 전 : " + videoUrl);
      const videoUrl = await getFile(data);
      console.log("videoUrl 후 : " + videoUrl);
      setVideoURL(videoUrl);
    });

    // 모델 url (turl) 가져오기
    const turlTmp = ref(database, "turl");
    onValue(turlTmp, async (snapshot) => {
      // console.log("turl 전 : " + data);
      const data = await snapshot.val();
      console.log("turl 후 : " + data);
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
    t = curTimeSeconds - startTimeSeconds;

    // 바운스
    if (turl === "https://teachablemachine.withgoogle.com/models/NuAS299xH/") {
      for (let i = 0; i < maxPredictions; i++) {
        // 클래스 이름 : 정확도 innerHTML로 넣기
        // const prediction = results[i].className + ": " + results[i].probability.toFixed(2);
        // labelContainer.childNodes[i].innerHTML = prediction;

        // side_up
        if (results[0].probability.toFixed(2) > 0.9) {
          if (
            (t >= 10 && t <= 12) ||
            (t >= 17 && t <= 19) ||
            (t >= 22 && t <= 24) ||
            (t >= 27 && t <= 29) ||
            (t >= 32 && t <= 34) ||
            (t >= 42 && t <= 44)
          ) {
            if (!m0c0) {
              console.log(results[0].className + " 인식 => 경과 시간 : " + t + "초");
              m0c0 = true; // 반복문 안에서 setState 쓰면 리렌더링이 안되므로 쓰면 X
              setCorrectCount(++cnt);
              // 맞았습니다 !! 표시
              setTimeout((labelContainer.innerHTML = "맞았습니다 !!"), 3000);
              labelContainer.innerHTML = "";
            }
          }
        }
        // side_down
        else if (results[1].probability.toFixed(2) > 0.9) {
          if (
            (t >= 13 && t <= 15) ||
            (t >= 20 && t <= 22) ||
            (t >= 24 && t <= 26) ||
            (t >= 29 && t <= 31) ||
            (t >= 43 && t <= 45)
          ) {
            if (!m0c1) {
              console.log(results[1].className + " 인식 => 경과 시간 : " + t + "초");
              m0c1 = true;
              setCorrectCount(++cnt);
              // 맞았습니다 !! 표시
              setTimeout((labelContainer.innerHTML = "맞았습니다 !!"), 3000);
              labelContainer.innerHTML = "";
            }
          }
        }
        // basic_up
        else if (results[2].probability.toFixed(2) > 0.9) {
          if ((t >= 37 && t <= 39) || (t >= 42 && t <= 44)) {
            if (!m0c2) {
              console.log(results[2].className + " 인식 => 경과 시간 : " + t + "초");
              m0c2 = true;
              setCorrectCount(++cnt);
              // 맞았습니다 !! 표시
              setTimeout((labelContainer.innerHTML = "맞았습니다 !!"), 3000);
              labelContainer.innerHTML = "";
            }
          }
        }
        // basic_down
        else if (results[3].probability.toFixed(2) > 0.9) {
          if (
            (t >= 35 && t <= 37) ||
            (t >= 44 && t <= 46) ||
            (t >= 56 && t <= 58) ||
            (t >= 59 && t <= 61)
          ) {
            if (!m0c3) {
              console.log(results[3].className + " 인식 => 경과 시간 : " + t + "초");
              m0c3 = true;
              setCorrectCount(++cnt);
              // 맞았습니다 !! 표시
              setTimeout((labelContainer.innerHTML = "맞았습니다 !!"), 3000);
              labelContainer.innerHTML = "";
            }
          }
        }
        // basic_up2
        else if (results[4].probability.toFixed(2) > 0.9) {
          if ((t >= 39 && t <= 41) || (t >= 46 && t <= 48)) {
            if (!m0c4) {
              console.log(results[4].className + " 인식 => 경과 시간 : " + t + "초");
              m0c4 = true;
              setCorrectCount(++cnt);
              // 맞았습니다 !! 표시
              setTimeout((labelContainer.innerHTML = "맞았습니다 !!"), 3000);
              labelContainer.innerHTML = "";
            }
          }
        }
        // basic_down2
        else if (results[5].probability.toFixed(2) > 0.9) {
          if ((t >= 38 && t <= 40) || (t >= 45 && t <= 47)) {
            if (!m0c5) {
              console.log(results[5].className + " 인식 => 경과 시간 : " + t + "초");
              m0c5 = true;
              setCorrectCount(++cnt);
              // 맞았습니다 !! 표시
              setTimeout((labelContainer.innerHTML = "맞았습니다 !!"), 3000);
              labelContainer.innerHTML = "";
            }
          }
        }
        // down3_left
        else if (results[6].probability.toFixed(2) > 0.9) {
          if ((t >= 50 && t <= 52) || (t >= 53 && t <= 55)) {
            if (!m0c6) {
              console.log(results[6].className + " 인식 => 경과 시간 : " + t + "초");
              m0c6 = true;
              setCorrectCount(++cnt);
              // 맞았습니다 !! 표시
              setTimeout((labelContainer.innerHTML = "맞았습니다 !!"), 3000);
              labelContainer.innerHTML = "";
            }
          }
        }
        // down3_right
        else if (results[7].probability.toFixed(2) > 0.9) {
          if ((t >= 48 && t <= 50) || (t >= 51 && t <= 53)) {
            if (!m0c7) {
              console.log(results[7].className + " 인식 => 경과 시간 : " + t + "초");
              m0c7 = true;
              setCorrectCount(++cnt);
              // 맞았습니다 !! 표시
              setTimeout((labelContainer.innerHTML = "맞았습니다 !!"), 3000);
              labelContainer.innerHTML = "";
            }
          }
        }
        // down4_left
        else if (results[8].probability.toFixed(2) > 0.9) {
          if ((t >= 62 && t <= 64) || (t >= 66 && t <= 68)) {
            if (!m0c8) {
              console.log(results[8].className + " 인식 => 경과 시간 : " + t + "초");
              m0c8 = true;
              setCorrectCount(++cnt);
              // 맞았습니다 !! 표시
              setTimeout((labelContainer.innerHTML = "맞았습니다 !!"), 3000);
              labelContainer.innerHTML = "";
            }
          }
        }
        // down4_left
        else if (results[9].probability.toFixed(2) > 0.9) {
          if ((t >= 61 && t <= 63) || (t >= 64 && t <= 66)) {
            if (!m0c9) {
              console.log(results[9].className + " 인식 => 경과 시간 : " + t + "초");
              m0c9 = true;
              setCorrectCount(++cnt);
              // 맞았습니다 !! 표시
              setTimeout((labelContainer.innerHTML = "맞았습니다 !!"), 3000);
              labelContainer.innerHTML = "";
            }
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
    return (
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
        <ClipLoader color={color} loading={loading} css={override} size={150} />
      </div>
    );
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
          <div
            className="videoHolder"
            // style={{ visibility: "hidden" }}
          >
            {videoURL && (
              <video
                id="video"
                className="file-upload-video"
                src={videoURL}
                width="300"
                height="300"
                crossOrigin="anonymous" // 이거 없으면 model.estimatePose 실행 안됨★
                ref={videoRef}
                // autoPlay
                controls
                onPlay={startLoop}
                onEnded={() => myCallback()} // 비디오 끝나면 인식 멈춤
              ></video>
            )}
          </div>
        </div>

        <div
          className="label-container" // style={{ visibility: "hidden" }}
          // dangerouslySetInnerHTML={{ __html: labels }}
        ></div>
        <br></br>
        <div
          className="result-container"
          // style={{ visibility: "hidden" }}
        >
          {/* <div className="checkvideoURL">videoURL 없을 때 :{videoURL}</div> */}
          {/* {videoURL && <div className="checkvideoURL">videoURL 있을 때 :{videoURL}</div>} */}
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
