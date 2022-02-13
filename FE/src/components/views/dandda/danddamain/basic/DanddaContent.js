import React, { useState, useEffect } from "react";
import CarouselSlide from "../CarouselSlide";
import { useNavigate } from "react-router-dom";
import { FaAndroid, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Slide from "@material-ui/core/Slide";
import img1 from "./img/1.png";
import img2 from "./img/2.png";
import img3 from "./img/3.png";
import profile_src from "./img/profile.png";
import axios from "axios";

function Arrow(props) {
  const { direction, clickFunction } = props;
  const icon = direction === "left" ? <FaChevronLeft /> : <FaChevronRight />;

  return <div onClick={clickFunction}>{icon}</div>;
}

function DanddaContent() {
  // axios로 댄서 이미지, 섬네일, 정보 받아오기

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode === 39) {
        onArrowClick("right");
      }
      if (e.keyCode === 37) {
        onArrowClick("left");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const SLIDE_INFO = [
    {
      backgroundImage: `url(${img1})`,
      title: "바운스",
      profile_name: "seoyoung",
      profile_src: profile_src,
      id: "바운스vid",
      url: "https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F12345.mp4?alt=media&token=b2d33474-a957-49b1-946c-a699cc9f6209",
      turl: "https://teachablemachine.withgoogle.com/models/8a2i874rC/",
    },
    {
      backgroundImage: `url(${img2})`,
      title: "피치스",
      profile_name: "seoyoung",
      profile_src: profile_src,
      id: "피치스vid",
      url: "https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1644628771425?alt=media&token=11872f38-890f-4c3e-8ba0-b938aed11a42",
      turl: "",
    },
    {
      backgroundImage: `url(${img3})`,
      title: "아이솔레이션",
      profile_name: "seoyoung",
      profile_src: profile_src,
      id: "아이솔레이션",
      url: "https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F12345.mp4?alt=media&token=b2d33474-a957-49b1-946c-a699cc9f6209",
      turl: "",
    },
  ];

  const [index, setIndex] = useState(0);
  const content = SLIDE_INFO[index];
  const numSlides = SLIDE_INFO.length;

  const [slideIn, setSlideIn] = useState(true);
  const [slideDirection, setSlideDirection] = useState("down");

  const navigate = useNavigate();

  const onArrowClick = (direction) => {
    const increment = direction === "left" ? -1 : 1;
    const newIndex = (index + increment + numSlides) % numSlides;

    const oppDirection = direction === "left" ? "right" : "left";
    setSlideDirection(direction);
    setSlideIn(false);

    setTimeout(() => {
      setIndex(newIndex);
      setSlideDirection(oppDirection);
      setSlideIn(true);
    }, 500);
  };

  //Android Studio의 [showToast] 함수 실행
  // const movecamera = (e) => {
  //     console.log(videoUrl);
  //     // 토스트 출력 내용과 재생할 비디오 URL값을 넘겨줌
  //     window.Android.showToast("카메라 실행", videoUrl);
  // };

  // const loadingPage = () => {
  //     //이동할 페이지 작성
  //     navigate("/danddaloading", {
  //         state: {},
  //     });
  // };

  return (
    <div className="DanddaMain">
      {/* 해당 캐로셀을 클릭 시 카메라 이동 함수 실행 */}
      <div
        className="Carousel"
        // onClick={movecamera}
      >
        <Arrow direction="left" clickFunction={() => onArrowClick("left")} />
        <Slide in={slideIn} direction={slideDirection}>
          <div>
            <CarouselSlide content={content} />
          </div>
        </Slide>
        <Arrow direction="right" clickFunction={() => onArrowClick("right")} />
      </div>
    </div>
  );
}

export default DanddaContent;
