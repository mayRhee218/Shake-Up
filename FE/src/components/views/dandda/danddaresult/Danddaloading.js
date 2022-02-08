/**
 * 댄따 결과 로딩 페이지
 *
 * @author 다은
 * @version 1.0.0
 * 작성일 : 2022-02-07
 *
 **/
import React from "react";
import "./Danddaloading.css";
import * as tf from "@tensorflow/tfjs";
import * as tmPose from "@teachablemachine/pose";
import $ from "jquery";

function Danddaloading() {
  // 다은이가 만든 함수들
  const URL = "https://teachablemachine.withgoogle.com/models/8a2i874rC/";
  var predictVideo;
  let model, modelLoadContainer, labelContainer, maxPredictions, checkPause, checkNotLoadedVideo;
  var video = document.getElementById("video");

  async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // append/get elements to the DOM
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
      // and class labels
      labelContainer.appendChild(document.createElement("div"));
    }

    modelLoadContainer = document.getElementById("model-load-container");
    modelLoadContainer.innerHTML = "모델 로딩 성공!";
  }

  async function predict() {
    // 일시정지 버튼 클릭 시 predict 함수 리턴
    if (checkPause) return;

    console.log("predict 함수 호출");

    const { pose, posenetOutput } = await model.estimatePose(video, false);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);

    for (let i = 0; i < maxPredictions; i++) {
      const classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2);
      labelContainer.childNodes[i].innerHTML = classPrediction;
    }
  }

  async function loop(timestamp) {
    await predict();
    window.requestAnimationFrame(loop);
  }

  // 비디오가 로딩 되었을 때
  video.addEventListener("loadeddata", (event) => {
    console.log("비디오 로딩 시작");
  });

  // 비디오가 끝났을 때
  video.addEventListener("ended", (event) => {
    console.log("비디오 end");
  });

  // 비디오 재생 버튼 클릭 시 호출
  video.addEventListener("play", (event) => {
    console.log("비디오 play");
    checkPause = false;
    predictVideo = window.requestAnimationFrame(loop);
  });

  // 비디오 일시정지 버튼 클릭 시 호출 => predict 함수 리턴
  video.addEventListener("pause", (event) => {
    console.log("비디오 pause");
    checkPause = true;
    window.cancelAnimationFrame(predictVideo);
  });

  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $(".video-upload-wrap").hide();

        $(".file-upload-video").attr("src", e.target.result);
        $(".file-upload-content").show();

        $(".video-title").html(input.files[0].name);
      };

      reader.readAsDataURL(input.files[0]);
    } else {
      removeUpload();
    }
  }

  function removeUpload() {
    $(".file-upload-input").replaceWith($(".file-upload-input").clone());
    $(".file-upload-content").hide();
    $(".video-upload-wrap").show();
  }
  $(".video-upload-wrap").bind("dragover", function () {
    $(".video-upload-wrap").addClass("video-dropping");
  });
  $(".video-upload-wrap").bind("dragleave", function () {
    $(".video-upload-wrap").removeClass("video-dropping");
  });

  return (
    <>
      <div>Teachable Machine Pose Model</div>
      <button type="button" onclick="init()">
        Start
      </button>
      <div class="file-upload">
        <button
          class="file-upload-btn"
          type="button"
          onclick="$('.file-upload-input').trigger( 'click' )"
        >
          Add Video
        </button>

        <div class="video-upload-wrap">
          <input class="file-upload-input" type="file" onchange="readURL(this);" accept="video/*" />
          <div class="drag-text">
            <h3>Drag and drop a file or select add Video</h3>
          </div>
        </div>
        <div class="file-upload-content">
          <video
            id="video"
            class="file-upload-video"
            src="#"
            width="300"
            height="300"
            controls
            muted
          ></video>
          <div class="video-title-wrap">
            <button type="button" onclick="removeUpload()" class="remove-video">
              Remove <span class="video-title">Uploaded Video</span>
            </button>
          </div>
        </div>
      </div>
      <div id="model-load-container"></div>
      <div id="label-container"></div>
    </>
  );
}
export default Danddaloading;
