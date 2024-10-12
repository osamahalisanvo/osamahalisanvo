let username;
let currentRoom;

document.getElementById('home-page').classList.add('hidden');
document.getElementById('chat-room').classList.add('hidden');

// Called when a user enters their username
function enterChat() {
  username = document.getElementById('username').value;
  if (username) {
    document.getElementById('login-page').classList.add('hidden');
    document.getElementById('home-page').classList.remove('hidden');
    document.getElementById('display-username').innerText = username;
    loadRooms();
  }
}

// Creates a new room and saves it to localStorage
function createRoom() {
  const roomName = document.getElementById('room-name').value;
  if (roomName) {
    let rooms = JSON.parse(localStorage.getItem('chatRooms') || '[]');
    if (!rooms.includes(roomName)) {
      rooms.push(roomName);
      localStorage.setItem('chatRooms', JSON.stringify(rooms));
      loadRooms();  // Refresh the list of rooms
    }
  }
}

// Loads all existing rooms from localStorage
function loadRooms() {
  const rooms = JSON.parse(localStorage.getItem('chatRooms') || '[]');
  const roomsDiv = document.getElementById('rooms');
  roomsDiv.innerHTML = '';

  rooms.forEach(roomName => {
    const roomDiv = document.createElement('div');
    roomDiv.classList.add('room');
    roomDiv.innerText = roomName;
    roomDiv.onclick = () => joinRoom(roomName);
    roomsDiv.appendChild(roomDiv);
  });
}

// User enters a room to see chat history
function joinRoom(roomName) {
  currentRoom = roomName;
  document.getElementById('home-page').classList.add('hidden');
  document.getElementById('chat-room').classList.remove('hidden');
  document.getElementById('room-title').innerText = roomName;
  loadMessages();
}

// Sends a new message in the current room
function sendMessage() {
  const messageText = document.getElementById('message-input').value;
  if (messageText) {
    const messages = JSON.parse(localStorage.getItem(currentRoom) || '[]');
    const message = { user: username, text: messageText, timestamp: new Date().toLocaleTimeString() };
    messages.push(message);
    localStorage.setItem(currentRoom, JSON.stringify(messages));
    document.getElementById('message-input').value = '';
    loadMessages();
  }
}

// Loads chat history of the current room
function loadMessages() {
  const messages = JSON.parse(localStorage.getItem(currentRoom) || '[]');
  const messagesDiv = document.getElementById('messages');
  messagesDiv.innerHTML = '';
  messages.forEach(msg => {
    const msgDiv = document.createElement('div');
    msgDiv.innerHTML = `<strong>${msg.user}</strong> [${msg.timestamp}]: ${msg.text}`;
    messagesDiv.appendChild(msgDiv);
  });
}

// Returns to the home page from a chat room
function leaveRoom() {
  document.getElementById('chat-room').classList.add('hidden');
  document.getElementById('home-page').classList.remove('hidden');
}
