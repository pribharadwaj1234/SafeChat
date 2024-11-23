import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatForm from './project/main';
import NavBar from './project/navigation';
import LoginForm from './project/login21'; 
import CreateRoomForm from './project/createroomform'; 
import TermsConditions from './project/terms';
import ChatRoom from './project/ChatRoom';    
import Signup from './project/signup';
import PrivacyPolicy from './project/privacypolicy';
import React, {useState} from 'react';
import HelpCenter from './project/helpcenter';
import Logout from './project/logout';
import axios from 'axios'
function App() {
 

  const [rooms, setRooms] = useState([]);
axios.default.withCredentials = true;
  
  const handleLogin = (username, password) => {
    axios.post('https://safe-chat-ivory.vercel.app/register', {username, password})

    console.log('Logged in user:', username);
    console.log('Password:', password);
  };

  const handleCreateRoom = (roomName, roomCode) => {
    const newRoom = { name: roomName, code: roomCode };
    setRooms([...rooms, newRoom]);
  };

  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<ChatForm />} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/login21' element={<LoginForm onLogin={handleLogin} />} />
          <Route path='/createroomform' element={<CreateRoomForm onCreateRoom={handleCreateRoom} />} />
          <Route path='/privacypolicy' element={<PrivacyPolicy/>} />
          <Route path='/terms' element={<TermsConditions/>} />
          <Route path='/helpcenter' element={<HelpCenter/>} />
          <Route path='/logout' element={<Logout/>} />
          <Route path="/ChatRoom/:id" element={<ChatRoom />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
