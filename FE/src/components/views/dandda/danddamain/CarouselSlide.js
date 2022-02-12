import React from "react";
import { Card, makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { Route, Link, useNavigate } from "react-router-dom";
import { FaAndroid, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function CarouselSlide(props) {
    const { backgroundImage, title, profile_src, profile_name, id, url, turl } = props.content;

    const useStyles = makeStyles(() => ({
        card: {
            backgroundImage,
            backgroundRepeat: 'no-repeat',
            backgroundSize:'cover',
            borderRadius: 5,
            margin: '0px 15px',
            padding: '10px 10px',
            width: '75vw',
            height:'25vh',
            boxShadow: '10px 10px 10px grey', 
            display: 'flex',
            flexDirection: 'column', 
        },

    title: {
      justifyContent: "center",
      alignSelf: "center",
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
      console.log(url);
      // console.log(url);
      // 토스트 출력 내용과 재생할 비디오 URL값을 넘겨줌
      window.Android.showToast("카메라 실행", url);
      return ('arr')
    };

  const onClick = () => {
    movecamera(url)
    
  };

    return (
        <Card className={classes.card} onClick={onClick}>
            <div className={classes.circle} >
                <Avatar alt={profile_name} src={profile_src}/>
            </div>
            <h1 className={classes.title}>{title}</h1>
        </Card>
    );
}