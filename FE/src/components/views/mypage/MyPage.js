import { Tabs, Tab } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TabPanel, a11yProps } from './TabPanel';
import Video from './Video';
import Videos from './Videos';
import Board1 from './board/Board1'

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


  const goo = () => {
    const credentials = {
      category: 0,
      comment: 'gwanigwani',
      content: 'hi',
      score: 100,
      isshow: 0,
      thumbnail: 'thumbnail',
      title: 'title',
      uid: 2,
      url: 'hi'
    }
    axios.post(`video/create`, credentials)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }
  const data = {
    category: '',
    content: '',
    iscomment: '',
    isshow: '',
    score: 0,
    thumbnail: '',
    uid: 1,
    url: '',
  }
  axios.post('/video/create', data)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
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
          <button onClick={goo}>팔로우</button>
        </div>
      </div>
      <div>
        <div>
          <Tabs 
            value={value} onChange={handleChange} aria-label='secondary tabs example'
            indicatorColor="secondary" textColor="inherit" variant="fullWidth"
          >  
            <Tab icon={<img src='/favicon/left.png'/>} {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Thr" {...a11yProps(2)} />
            <Tab label="Item Thr" {...a11yProps(3)} />
            <Tab label="Item Thr" {...a11yProps(4)} />
          </Tabs>
        </div>
        <TabPanel value={value} index={0}>
          <Board1 user={user}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <h1>투</h1>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <h2>쓰리</h2>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Videos />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <h2>파입</h2>
        </TabPanel>
      </div>
      {/* 탭 */}
      <div>
        {/* <Videos/> */}
      </div>
    </div>
  );
}

export default MyPage;