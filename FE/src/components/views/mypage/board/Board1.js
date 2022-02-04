import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


function Board1(props) {
  return (
    <div>
      <h1>댄따 참여 이력</h1>
      <div className='box'>
        <div>One</div>
        <div>Two</div>
        <div>Three</div>
      </div>
    </div>
  );
}

export default Board1;