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

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.video}>
        <video src='' controls />
      </div>
      <div className={classes.title}>
        <p>K-POP 따라하기</p>
      </div>
      <div className={classes.subtitle}>
        <span>조회수</span>
        <span>좋아요</span>
        <span>성공동작</span>
      </div>
    </div>
  );
}

export default Video;