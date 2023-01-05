import React, { useContext, useEffect } from 'react';
import { CartContext } from '../CartContext';
import ScrollToBottom from "react-scroll-to-bottom";

const MessageBody = () => {
    const { messageList, user, rightTop, BASE_URL } = useContext(CartContext);

    return (
        <ScrollToBottom className='message-container'>
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
                                                    <img src={rightTop.avatar ? `${BASE_URL}/${rightTop.avatar}` : '/images/ppp3.jpg'} draggable="false" />
                                                </div>
                                                <div className="msg">
                                                    <p>{message.message}</p>
                                                    <time>{message.time}</time>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className="avatar">
                                                    <img src={rightTop.avatar ? `${BASE_URL}/${rightTop.avatar}` : '/images/ppp3.jpg'} draggable="false" />
                                                </div>
                                                <div className="msg">
                                                    <a href={`${BASE_URL}/${message.message}`} target="_blank">
                                                        <img src={`${BASE_URL}/${message.message}`} alt="images" style={{ borderRadius: "5px" }} />
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
                                                    <img src={user.avatar ? `${BASE_URL}/${user.avatar}` : '/images/ppp3.jpg'} draggable="false" />
                                                </div>
                                                <div className="msg">
                                                    <p>{message.message}</p>
                                                    <time>{message.time}</time>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className="avatar">
                                                    <img src={user.avatar ? `${BASE_URL}/${user.avatar}` : '/images/ppp3.jpg'} draggable="false" />
                                                </div>
                                                <div className="msg">
                                                    <a href={`${BASE_URL}/${message.message}`} target="_blank">
                                                        <img src={`${BASE_URL}/${message.message}`} alt="images" style={{ borderRadius: "5px" }} />
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
