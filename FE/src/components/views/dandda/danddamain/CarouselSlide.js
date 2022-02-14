import React from "react";
import { Card, makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { Route, Link, useNavigate } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";
import { FaAndroid, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import zIndex from "@material-ui/core/styles/zIndex";

export default function CarouselSlide(props) {
  const { backgroundImage, title, profile_src, profile_name, id, uid, url, turl } = props.content;

  const useStyles = makeStyles(() => ({
    card: {
      backgroundImage,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      borderRadius: 5,
      margin: "0px 15px",
      padding: "10px 10px",
      width: "75vw",
      height: "25vh",
      boxShadow: "10px 10px 10px grey",
      display: "flex",
      flexDirection: "column",
    },

    title: {
      justifyContent: "center",
      borderRadius: 5,
      color: "white",
      width: "75vw",
      backgroundColor: "#6200EE",
      alignSelf: "center",
      textAlign: "center",
      lineHeight: "40px",
    },

    circle: {
      width: "15px",
      height: "15px",
      borderRadius: "50%",
    },
  }));

  const classes = useStyles();
  const navigate = useNavigate();

  // Android Studio의 [showToast] 함수 실행
  const movecamera = () => {
    // uploadModelUrl
    // const database = getDatabase();

    // set(ref(database), {
    //   message: "", // 안드로이드에서 녹화한 영상이 들어감
    //   turl: turl,
    // });

    console.log("url : " + url);
    console.log("turl : " + turl);
    // 토스트 출력 내용과 재생할 비디오 URL값을 넘겨줌
    window.Android.showToast(url, turl);
    return "arr";
  };

  const onClick = () => {
    // uploadModelUrl();
    movecamera();
  };

  // // realtime DB 에 turl 넣기
  // const uploadModelUrl = () => {};

  const goTomypage = () => {
    navigate(`/mypage/${uid}`);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h3 className={classes.title}>{title}</h3>
      <Card className={classes.card} onClick={onClick}>
        <div className={classes.circle} onClick={goTomypage}>
          <Avatar alt={profile_name} src={profile_src} />
        </div>
      </Card>
    </div>
  );
}
