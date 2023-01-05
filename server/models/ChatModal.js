const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true }
});

const chatSchema = new Schema({
    room: { type: String, required: true },
    sender: subSchema,
    receiver: subSchema,
    message: { type: String, required: true },
    time: { type: String, required: true }
});

module.exports = mongoose.model('Chat', chatSchema, 'chats'); 