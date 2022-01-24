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
import Navbar from './components/views/bar/Navbar';
import JoinEnd from './JoinEnd';
// import Auth from './hoc/auth';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact={true} path="/" element={<MainPage/>} />
        <Route exact={true} path="/login" element={<LoginPage/>} />
        <Route exact={true} path="/joinend" element={<JoinEnd/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
