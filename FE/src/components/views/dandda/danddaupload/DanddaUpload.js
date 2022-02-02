import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import kakao from './images/kakao.jpg' 
import insta from './images/instagram.jpg'
import face from './images/facebook.png'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


function DanddaUpload(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    comments: false,
    score: false,
    show: false,
  });

  function onSubmit(event) {
    event.preventDefault();
    console.log(event.target[0].value)
    console.log(event.target[1].checked)
    console.log(event.target[2].checked)
    console.log(event.target[3].checked)
  }
  

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

// 폼그룹 => textfield, 해쉬태그, 스위치 일괄 submit
  return (
    <form onSubmit={onSubmit}>
    <FormGroup role="form">
      <TextField/>      
      <FormControlLabel
        control={
          <Switch
            checked={state.checkedB}
            onChange={handleChange}
            name="comments"
            color="primary"
          />
        }
        label="댓글 허용"
      />
      <FormControlLabel
        control={
          <Switch
            checked={state.checkedB}
            onChange={handleChange}
            name="score"
            color="primary"
          />
        }
        label="점수 표시"
      />
      <FormControlLabel
        control={
          <Switch
            checked={state.checkedB}
            onChange={handleChange}
            name="show"
            color="primary"
          />
        }
        label="영상 비공개"
      />
      <button type='submit'>제출</button>
    </FormGroup>
    </form>
  );
}

export default DanddaUpload;