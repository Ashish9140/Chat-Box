require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const DBConnect = require('./db');
const router = require('./routes');
const Socket = require('./socket');
const PORT = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors());

app.use(express.json({ limit: '8mb' }));
app.use('/uploads', express.static('uploads'));
app.use('/storage', express.static('storage'));

app.use(router);
DBConnect();

// socket connection
const io = require('socket.io')(server, {
    cors: {
        origin: process.env.BASE_URL,
        methods: ['GET', 'POST'],
    },
});
Socket(io);

server.listen(PORT, () => {
    console.log("Server is running on PORT", PORT);
})