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

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact={true} path="/" element={<MainPage/>} />
        <Route exact={true} path="/login" element={<LoginPage/>} />
        <Route exact={true} path="/joinend" element={<JoinEnd/>} />
        <Route exact={true} path="/signup" element={<SignUp/>} />
        <Route exact={true} path="/signup/next" element={<SignUpNext/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
