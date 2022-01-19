
import './App.css';
import Dandda from './components/views/contents/dandda/dandda';
import JoinEnd from './JoinEnd'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dandda/>} />
        <Route path="/joinend" element={<JoinEnd/>} />
      </Routes>
    </BrowserRouter>
     

  );
}

export default App;
