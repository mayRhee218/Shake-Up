import React from "react";
import { Card, makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { Route, Link, useNavigate } from "react-router-dom";

export default function CarouselSlide(props) {
  const { backgroundImage, title, profile_name, profile_src, id } = props.content;

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

  const onClick = () => {
    // navigate(`./${id}`, {state: {alt: profile_name, src: profile_src, vid: id}})
    // navigate(`./loading`, { state: { alt: profile_name, src: profile_src, vid: id } });
    navigate(`./test`, { state: { alt: profile_name, src: profile_src, vid: id } });
  };

  return (
    <Card className={classes.card} onClick={onClick}>
      <div className={classes.circle}>
        <Avatar alt={profile_name} src={profile_src} />
      </div>
      <h1 className={classes.title}>{title}</h1>
    </Card>
  );
}
