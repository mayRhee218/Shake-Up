import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Video from '../Video'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  box: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));



function Board1(props) {
  const [videos, setVideos] = useState([]);
  const getVideos = () => {
    //axios get category. uid
  }

  useEffect(() => {
    getVideos();
  }, []);

  const classes = useStyles();

  return (
    <div>
      <div>
      {/* {videos.map(video) => (
        <Video />
      )} */}
    </div>
      <h1>댄따 참여 이력</h1>
      <div className={classes.box}>
        <div>
          <h1>최고점 획득 댄따</h1>
        </div>
      <div className={classes.box}>
        <img alt="댄따" src = {}/>
        <></>
      </div>
      <div className={classes.box}>Three</div>
      </div>
    </div>
  );
}

export default Board1;