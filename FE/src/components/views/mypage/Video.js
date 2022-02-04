import React from 'react';
import { makeStyles } from '@material-ui/core';

function Video({data}) {
  const useStyles = makeStyles(() => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      border:'1px solid black',
      padding:'5px'
    },
    video: {
      width: '90vw',
    },
    title: {
    },
    subtitle: {
    }
  }))
  const {title, likecnt, views, url, score} = data
  console.log(url)
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.video}>
        <video src={url} controls />
      </div>
      <div className={classes.title}>
        <p>{title}</p>
      </div>
      <div className={classes.subtitle}>
        <span>조회수 {views}</span>
        <span>좋아요 {likecnt}</span>
        <span>성공동작 {score}</span>
      </div>
    </div>
  );
}

export default Video;