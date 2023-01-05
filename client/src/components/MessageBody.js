import React, { useContext, useEffect } from 'react';
import { CartContext } from '../CartContext';
import ScrollToBottom from "react-scroll-to-bottom";

const MessageBody = () => {
    const { messageList, user, rightTop } = useContext(CartContext);

    return (
        <ScrollToBottom className='message-container'>
            {/* <div className="card-body ">
                {
                    messageList.map((message, index) => {
                        if (message.name === user.name) {
                            return (
                                <div className="row justify-content-end" key={index}>
                                    <div className="col-6 col-sm-7 col-md-7">
                                        {
                                            (message.text.match(/\.(jpeg|jpg|gif|png|PNG)$/) !== null) ?
                                                <a href={`http://localhost:5000/${message.message}`} target="_blank">
                                                    <img src={`http://localhost:5000/${message.message}`} className='justify-content-end float-right imgWrapper' style={{ width: "280px", borderRadius: "5px" }} alt="image" />
                                                </a>
                                                :
                                                <p className='sent justify-content-end float-right'>
                                                    {message.text}
                                                    <span className='time float-right'>{message.time}</span>
                                                </p>
                                        }
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div className="row" key={index}>
                                    <div className="col-2 col-sm-1 col-md-1">
                                        <img src={`http://localhost:5000${message.avatar}`} className="chat-pic rounded-circle" alt='img' style={{ marginTop: "10px" }} />
                                    </div>
                                    <div className="col-6 col-sm-7 col-md-7">
                                        {
                                            (message.text.match(/\.(jpeg|jpg|gif|png|PNG)$/) !== null) ?
                                                <a href={`http://localhost:5000/${message.text}`} target="_blank">
                                                    <img src={`http://localhost:5000/${message.text}`} className="imgWrapper" alt="images" style={{ width: "280px", borderRadius: "5px" }} />
                                                </a>
                                                : ((message.text.match(/\.(mp3)$/) !== null) ?
                                                    <div className='recieve-audio'>
                                                        <audio
                                                            src={`http://localhost:5000/${message.text}`}
                                                            alt="audio"
                                                            controls
                                                        />
                                                    </div>
                                                    : ((message.text.match(/\.(mp4)$/) !== null) ?
                                                        <video
                                                            src={`http://localhost:5000/${message.text}`}
                                                            alt="vedio"
                                                            typeof='video/mp4'
                                                            controls
                                                            style={{ width: "280px", borderRadius: "5px" }}
                                                        />
                                                        :
                                                        <p className='receive'>
                                                            {message.text}
                                                            <span className='time float-right'>{message.name}({message.time})</span>
                                                        </p>

                                                    ))
                                        }
                                    </div>
                                </div>
                            )
                        }
                    })
                }

            </div> */}

            <ul className='chat'>
                {
                    messageList.map((message, index) => {
                        if ((message.sender.email !== user.email)) {
                            return (
                                <li className="other" key={index}>
                                    {
                                        (message.message.match(/\.(jpeg|jpg|gif|png|PNG)$/) === null) ?
                                            <>
                                                <div className="avatar">
                                                    <img src={rightTop.avatar ? `http://localhost:5000/${rightTop.avatar}` : '/images/ppp3.jpg'} draggable="false" />
                                                </div>
                                                <div className="msg">
                                                    <p>{message.message}</p>
                                                    <time>{message.time}</time>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className="avatar">
                                                    <img src={rightTop.avatar ? `http://localhost:5000/${rightTop.avatar}` : '/images/ppp3.jpg'} draggable="false" />
                                                </div>
                                                <div className="msg">
                                                    <a href={`http://localhost:5000/${message.message}`} target="_blank">
                                                        <img src={`http://localhost:5000/${message.message}`} alt="images" style={{ borderRadius: "5px" }} />
                                                    </a>
                                                </div>
                                            </>
                                    }
                                </li>
                            )
                        }
                        else {
                            return (
                                <li className="self" key={index}>
                                    {
                                        (message.message.match(/\.(jpeg|jpg|gif|png|PNG)$/) === null) ?
                                            <>
                                                <div className="avatar">
                                                    <img src={user.avatar ? `http://localhost:5000/${user.avatar}` : '/images/ppp3.jpg'} draggable="false" />
                                                </div>
                                                <div className="msg">
                                                    <p>{message.message}</p>
                                                    <time>{message.time}</time>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className="avatar">
                                                    <img src={user.avatar ? `http://localhost:5000/${user.avatar}` : '/images/ppp3.jpg'} draggable="false" />
                                                </div>
                                                <div className="msg">
                                                    <a href={`http://localhost:5000/${message.message}`} target="_blank">
                                                        <img src={`http://localhost:5000/${message.message}`} alt="images" style={{ borderRadius: "5px" }} />
                                                    </a>
                                                </div>
                                            </>

                                    }
                                </li>
                            )

                        }
                    })
                }
            </ul>
        </ScrollToBottom >
    )
};

export default MessageBody;
