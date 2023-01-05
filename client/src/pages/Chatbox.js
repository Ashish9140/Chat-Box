import React, { useEffect } from 'react'
import './../css/Chatbox.css'
import ProfileModal from '../components/modals/ProfileModal';
import io from "socket.io-client";
import Sidebar from '../components/Sidebar';
import Main from '../components/Main';
const socket = io.connect('https://wlone.onrender.com');

const Chatbox = () => {
    return (
        <div className='chatCotaniner'>
            <ProfileModal />

            <Sidebar socket={socket} />

            <Main socket={socket} />

        </div>
    )
}

export default Chatbox