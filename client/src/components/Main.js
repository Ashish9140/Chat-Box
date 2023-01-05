import React, { useState, useContext, useEffect } from 'react'
import { CartContext } from '../CartContext';
import Dropzone from 'react-dropzone';
import axios from "axios";
import MessageBody from './MessageBody';
import Picker from 'emoji-picker-react'

const Main = ({ socket }) => {

    const { user, rightTop, setMessageList, showChat, BASE_URL } = useContext(CartContext);
    const [value, setValue] = useState('');
    const [showPicker, setShowPicker] = useState(false);

    // here we are handling emoji picker
    const onEmojiClick = (event, emojiObject) => {
        setValue(value + emojiObject.emoji);
    };
    const handlePicker = () => {
        if (showPicker) {
            setShowPicker(false);
        } else {
            setShowPicker(true);
        }
    }

    const giveTime = () => {
        console.log((new Date(Date.now()).getMinutes()))
        if (new Date(Date.now()).getMinutes() < 10) {
            const time = new Date(Date.now()).getHours() +
                ":0" +
                new Date(Date.now()).getMinutes();
            return time;
        } else {
            const time = new Date(Date.now()).getHours() +
                ":" +
                new Date(Date.now()).getMinutes();
            return time;
        }
    }

    // here we are sending images and videos towards backend and socket
    const onDrop = async (files) => {
        const formData = new FormData();
        formData.append("avatar", files[0]);
        try {
            const res = await axios.post(`${BASE_URL}/upload/file`, formData)
            console.log(res.data.url);
            let roomId = user.email + rightTop.email;
            roomId = roomId.split('').sort().join('')
            let messageData = {
                room: roomId,
                sender: { name: user.name, email: user.email },
                receiver: { name: rightTop.name, email: rightTop.email },
                message: res.data.url,
                time: giveTime()
            };
            sendMessage(messageData);
        } catch (error) {
            console.log(error)
        }
    }


    // message sending or recieving process
    const sendMessage = async (messageData) => {
        await socket.emit("send", messageData);
        setMessageList((list) => [...list, messageData]);
    }


    const handleKeyDown = async (e) => {
        if (e.keyCode === 13 && value !== '' && value !== ' ') {
            let roomId = user.email + rightTop.email;
            roomId = roomId.split('').sort().join('')
            let messageData = {
                room: roomId,
                sender: { name: user.name, email: user.email },
                receiver: { name: rightTop.name, email: rightTop.email },
                message: value,
                time: giveTime()
            };
            sendMessage(messageData);
            setValue('');
            setShowPicker(false);
        }
    }

    const handleButtonDown = () => {
        if (value !== '' && value !== ' ') {
            let roomId = user.email + rightTop.email;
            roomId = roomId.split('').sort().join('')
            let messageData = {
                room: roomId,
                sender: { name: user.name, email: user.email },
                receiver: { name: rightTop.name, email: rightTop.email },
                message: value,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };
            sendMessage(messageData);
            setValue('');
            setShowPicker(false);
        }
    }

    useEffect(() => {
        const handler = (data) => {
            setMessageList((list) => [...list, data]);
        }
        socket.on("receive", handler);
        return () => {
            socket.off('receive', handler);
        }
    }, [])



    const handleClose = () => {
        document.querySelector(".mainTopBack").classList.remove("show");
        document.querySelector(".sidebar").classList.remove("open");
        document.querySelector(".main").classList.remove("close");
    }

    return (
        <div className="main">
            {
                (showChat) ?
                    <div>
                        <div className="mainTop border-1">
                            <div>
                                <img src={rightTop.avatar ? `${BASE_URL}/${rightTop.avatar}` : '/images/ppp3.jpg'} alt="logo" />
                                <span>{rightTop.name}</span>
                            </div>
                            <div className="mainTopBack" onClick={handleClose}>
                                <i className="fa-solid fa-circle-arrow-left"></i>
                            </div>
                        </div>

                        <div className="messageArea">

                            <MessageBody />
                            {showPicker ?
                                <div className="emojiReact">
                                    <Picker onEmojiClick={onEmojiClick} />
                                </div> : ''
                            }

                        </div>

                        <div className="sendForm">
                            <div className='emoji-picker' onClick={handlePicker} >
                                <i className="far fa-grin fa-2x"></i>
                            </div>
                            <div className="inputFrom">
                                <input type="text"
                                    placeholder='Enter your message'
                                    value={value}
                                    onChange={(e) => { setValue(e.target.value) }}
                                    onKeyDown={handleKeyDown}
                                />
                                <i className="fa-solid fa-paper-plane" onClick={handleButtonDown}></i>
                            </div>
                            <div className='select-img'>
                                <Dropzone onDrop={onDrop}>
                                    {({ getRootProps, getInputProps }) => (
                                        <section>
                                            <div {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <i className='fas fa-paperclip fa-2x'></i>
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="chatShow">
                        <i className="fa-regular fa-comments"></i>
                        <span>Select Any user or group to have chat</span>
                    </div>
            }
        </div>
    )
}

export default Main