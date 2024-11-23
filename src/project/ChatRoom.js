import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './ChatRoom.css';

const ChatRoom = () => {
  const { id } = useParams();
  const location = useLocation();
  const { roomLink } = location.state || {};
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(null);

  useEffect(() => {
    const storageKey = `chatMessages_${id}`;
    const storedMessages = JSON.parse(localStorage.getItem(storageKey)) || [];
    setMessages(storedMessages);
  }, [id]);

  useEffect(() => {
    const storageKey = `chatMessages_${id}`;
    localStorage.setItem(storageKey, JSON.stringify(messages));
  }, [messages, id]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() || file) {
      const newMessage = {
        user: 'You',
        text: message,
        image: fileType === 'image' ? file : null, 
        document: fileType === 'document' ? file : null, 
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      setFile(null);
      setFileType(null);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (selectedFile.type.startsWith('image/')) {
        setFileType('image');
      } else {
        setFileType('document');
      }
    }
  };

  const getFileUrl = (file) => {
    return URL.createObjectURL(file); // Create a URL for the actual file object
  };
  
  return (
    <div className="chat-room-container">
      {roomLink && (
        <div className="room-info">
          <div className="room-link-display">
            <p>Room Link:</p>
            <a href={roomLink} target="_blank" rel="noopener noreferrer">{roomLink}</a>
          </div>
        </div>
      )}
      <h2 className="text-center">Chat Room: {id}</h2>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            <strong>{msg.user}:</strong> {msg.text}
            {msg.image && <img src={getFileUrl(msg.image)} alt="shared content" className="shared-image" />}
            {msg.document && (
  <a href={getFileUrl(msg.document)} target="_blank" rel="noopener noreferrer">
    Open Document
  </a>
)}

          </div>
        ))}
      </div>
      <form className="chat-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="chat-input"
        />
        <input
          type="file"
          accept="image/*,.pdf,.doc,.docx,.txt"
          onChange={handleFileChange}
          className="file-input"
        />
        <button type="submit" className="chat-button"  style={{ backgroundColor: '#ffe4e1'}}>Send</button>
      </form>
    </div>
  );
};

export default ChatRoom;
