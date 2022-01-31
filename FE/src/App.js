import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";

import MainPage from './components/views/contents/dandda/dandda';
import LoginPage from './components/views/login/Login';
import SignUp from './components/views/Signup/Signup';
import SignUpNext from './components/views/Signup/SignupNext';
import Navbar from './components/views/bar/Navbar';
import JoinEnd from './components/views/Signup/JoinEnd';
import Find from './components/views/find/Find';
import FindId from './components/views/find/FindId';
import FindIdComplete from './components/views/find/FindIdComplete';
import FindPassword from './components/views/find/FindPassword';
import FindPasswordComplete from './components/views/find/FindPasswordComplete';
import PutCredentials from './components/views/login/PutCredentials';
import Auth from './hoc/auth';
import ArticleDetail from './components/views/community/ArticleDetail';
import DanddaMain from './components/views/dandda/DanddaMain';


function App() {

  const temp = Auth(MainPage, null);
  console.log(temp);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* <Route exact={true} path="/" element={<PrivateRoute component={Auth(MainPage)}/>}  /> */}
        <Route exact={true} path="/" element={<MainPage/>}  />
        <Route exact={true} path="/login" element={<LoginPage/>} />
        <Route exact={true} path="/find" element={<Find/>} />
        <Route exact={true} path="/find_id" element={<FindId/>} />
        <Route exact={true} path="/find_id_ok" element={<FindIdComplete/>} />
        <Route exact={true} path="/find_password" element={<FindPassword/>} />
        <Route exact={true} path="/find_password_ok" element={<FindPasswordComplete/>} />
        <Route exact={true} path="/signup" element={<SignUp/>} />
        <Route exact={true} path="/joinend" element={<JoinEnd/>}  />
        <Route exact={true} path="/signup/next" element={<SignUpNext/>} />
        <Route exact={true} path="/user/sujeong" element={<PutCredentials/>} />
        <Route exact={true} path="/community/:id" element={<ArticleDetail/>} />
        <Route exact={true} path="/dandda" element={<DanddaMain/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
