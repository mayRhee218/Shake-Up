import { Tabs, Tab } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TabPanel, a11yProps } from './TabPanel';
import Board1 from './board/Board1'
import Board2 from './board/Board2'
import Board3 from './board/Board3'
import Board4 from './board/Board4'
import Board5 from './board/Board5'

function MyPage({ match }) {
  const { uid } = useParams();
  const [user, setUser] = useState({});
  const [value, setValue] = useState(1)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getUser = () => {
    axios.get(`/user/read/${uid}`)
    .then(res => {
      setUser(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    getUser();
  }, []);


  return (
    <div className='mypage'>
      <div className='user'>
        <img src={user.profile} />
        <div>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>구독자수</p>
        </div>
        <div>
          <button>팔로우</button>
        </div>
      </div>
      <div>
        <div>
          <Tabs 
            value={value} onChange={handleChange} aria-label='secondary tabs example'
            indicatorColor="secondary" textColor="inherit" variant="fullWidth"
          > 
            <Tab label='댄따' {...a11yProps(0)} />
            <Tab label="월드컵" {...a11yProps(1)} />
            <Tab label="업로드영상" {...a11yProps(2)} />
            <Tab label="구독" {...a11yProps(3)} />
            <Tab label="좋아요영상" {...a11yProps(4)} />
          </Tabs>
        </div>
        <TabPanel value={value} index={0}>
          <Board1 user={user}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Board2 />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Board3 />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Board4 />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Board5 />
        </TabPanel>
      </div>
    </div>
  );
}

export default MyPage;