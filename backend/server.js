const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/yourdbname', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define User model
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

// Define Room model
const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
});

const Room = mongoose.model('Room', RoomSchema);

// User routes
app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send('Username and password are required');
    }

    // Check for existing user
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('Username already exists');
    }

    // Create new user
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).send('User created');
  } catch (error) {
    console.error('Error creating user:', error.message);
    // MongoDB unique constraint error handling
    if (error.name === 'MongoError' && error.code === 11000) {
      return res.status(400).send('Username already exists');
    }
    res.status(500).send('Error creating user');
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send('Username and password are required');
    }

    // Find the user by username and password
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).send('Invalid username or password');
    }

    res.status(200).send('Login successful');
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).send('Error logging in');
  }
});

// Room routes
app.post('/createRoom', async (req, res) => {
  try {
    const { roomName, roomCode } = req.body;
    const newRoom = new Room({ name: roomName, code: roomCode });
    await newRoom.save();
    res.status(201).send('Room created');
  } catch (error) {
    console.error('Error creating room:', error.message);
    res.status(500).send('Error creating room');
  }
});

app.post('/joinRoom', async (req, res) => {
  try {
    const { roomCode } = req.body;
    const room = await Room.findOne({ code: roomCode });
    if (!room) {
      return res.status(404).send('Room not found');
    }
    res.status(200).send({ roomName: room.name });
  } catch (error) {
    console.error('Error joining room:', error.message);
    res.status(500).send('Error joining room');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
