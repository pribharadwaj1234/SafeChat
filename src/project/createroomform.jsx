import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateRoomForm.css';  // Import CSS for styling
import { v4 as uuidv4 } from 'uuid';  // Import the UUID library

function CreateRoomForm({ onCreateRoom }) {
  const [roomName, setRoomName] = useState('');
  const [roomLink, setRoomLink] = useState('');
  const navigate = useNavigate();

  const generateRoomLink = (roomName) => {
    const uniqueId = uuidv4();  // Generate a unique identifier
    const baseURL = 'http://localhost:3000';  // Update with your website URL
    return `${baseURL}/ChatRoom/${encodeURIComponent(roomName)}-${uniqueId}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (roomName) {
      const link = generateRoomLink(roomName);
      setRoomLink(link);
      onCreateRoom(roomName, link);  // Pass link instead of code
      setTimeout(() => {  // Delay to ensure state update
        navigate(`/ChatRoom/${roomName}-${link.split('-').pop()}`, { state: { roomLink: link } });
      }, 100);
    }
  };

  const handleRoomNameChange = (e) => {
    setRoomName(e.target.value);
  };

  return (
    <div className="create-room-container">
      <aside 
  className="aside-section"
  style={{ 
    fontFamily: "'Times New Roman', serif", // Apply the desired font family
    backgroundColor: '#f5f5f5', // Matching background color, if needed
    fontWeight:"bold",
    padding: '20px',
    textAlign: 'center',
    color: '#333'
  }}
>
  <h3>Instructions:</h3>
  <p>Enter a name for your new chat room and click "Create Room" to start chatting.</p>
  <p>Do not share personal information while chatting.</p>
  <p>Stay respectful.</p>
  <img src="/images/bear.png" alt="Signup Image" style={{ width: '70%', height: 'auto' }}/>
</aside>

      <main className="main-section">
        <form onSubmit={handleSubmit} className="create-room-form">
          <input
            type="text"
            placeholder="Create a room"
            value={roomName}
            onChange={handleRoomNameChange}
            className="input-field"
          />
          <button type="submit" className="submit-button">Create Room</button>
        </form>
        <div className="room-link">
          {/*{roomLink ? (
           /* <>
              <p>Room Link:</p>
              <a href={roomLink} target="_blank" rel="noopener noreferrer">{roomLink}</a>
              <p>Share this link with people you want to invite.</p>
            </>
          ) : (
            <p>No room link generated yet.</p>
          )}*/}
        </div>
      </main>
    </div>
  );
}

export default CreateRoomForm;
