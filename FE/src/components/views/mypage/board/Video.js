import React, { useState } from 'react';
import { makeStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { deleteFile } from '../../firebase/db';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border:'1px solid black',
    padding:'5px'
  },
  video: {
    width: '200px',
    display: 'flex',
    justifyContent: 'center',
    zIndex: -1
  },
  title: {
  },
  subtitle: {
  },
  icon : {
    marginTop: '3px',
    zIndex: 1
  }
}))

function Video({data, propFunction, key, index}) {
  const [dialog, setDialog] = useState(false)
  const {vid, uid, title, likecnt, views, url, score} = data
  // const userId = localStorage.getItem('userId')
  const userId = 1
  const deleteVideo = async () => {
    await deleteFile(vid)
    axios.post(`video/delete/${vid}`)
      .then(res => {
        console.log(vid)
      })
      .catch(err => {
        console.log(err)
      })
  }
  const onOpen = (event) => {
    setDialog(true)
  }
  const onClose = () => {
    setDialog(false)
    propFunction(index)
  }
  const onDelete = async() => {
    // await deleteVideo()
    setDialog(false)
  }
  const classes = useStyles();
  return (
    <div className={classes.root} >
      <div className={classes.video} >
        <video src={url} />
      </div>
      <div className={classes.title}>
        <span>{title}</span>
      </div>
      <div className={classes.subtitle}>
        <span>{vid}</span>
        <span>조회수 {views}</span>
        <span>좋아요 {likecnt}</span>
        <span>성공동작 {score}</span>
        {
          uid === userId ? 
          <DeleteIcon className={classes.icon} onClick={onOpen}/>
          : <></>
        }
      </div>
      <Dialog
        open={dialog}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"정말 삭제하시겠습니까"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            선택한 영상을 삭제하시려면 '예', 취소하시려면 '아니요'를 눌러주세요
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>아니요</Button>
          <Button onClick={onDelete} autoFocus>
            예
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Video;