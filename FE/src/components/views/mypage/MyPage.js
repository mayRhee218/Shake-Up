import { Tabs, Tab } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { TabPanel, a11yProps } from './TabPanel';
import Board1 from './board/Board1'
import Board2 from './board/Board2'
import Board3 from './board/Board3'
import Board4 from './board/Board4'
import Board5 from './board/Board5'
import { UserContext } from '../../../App'

function MyPage() {
  const { id } = useParams()
  const [value, setValue] = useState(0)
  const [user, setUser] = useState({})
  const { auth } = useContext(UserContext)
  const [following, setFollowing] = useState(false)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log('id', id, auth)
  const getUser = () => {
    axios.get(`/user/read/${id}`)
    .then(res => {
      setUser(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }
  const isFollow = () => {
    axios.post('sub/isfollow', {
      curuid: auth.id,
      targetuid: id
    })
      .then((res) => {
        console.log(auth.id, id, res.data)
        setFollowing(res.data)
      })
  }
  // 빨로우 요청 axios
  const followHandler =  () => {
    axios.post('sub/follow/', {
      curuid: auth.id,
      targetuid: id
    })
      .then(res => {
        if (res.data === '성공') {
          setFollowing(true)
        }
      })
  }
  const unfollowHandler = () => {
    axios.delete(`/sub/unfollow/${auth.id}/${id}`)
      .then(res => {
        if (res.data === '성공') {
          setFollowing(false)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  
  useEffect( async () => {
    await getUser();
    await isFollow();
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
          {following ? 
            <button onClick={unfollowHandler}>팔로우 취소</button>
            : <button onClick={followHandler}>팔로우</button>
          }
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
          <Board2 user= {user}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Board3 user= {user}/>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Board4 user= {user}/>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Board5 user= {user}/>
        </TabPanel>
      </div>
    </div>
  );
}

export default MyPage;