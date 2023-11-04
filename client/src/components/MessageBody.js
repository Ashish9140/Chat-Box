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
                                        (message.message.match(/\.(jpeg|jpg|gif|png|PNG|bmp|tiff|raw|psd|eps|svg|webp|heif|ico|tga|pnm|exif)$/) === null) ?
                                            <>
                                                <div className="avatar">
                                                    <img src={rightTop.avatar ? `${BASE_URL}/${rightTop.avatar}` : '/images/ppp3.jpg'} draggable="false" />
                                                </div>
                                                <div className="msg">
                                                    <p>
                                                        {((message.message.match(/\.(mp4|avi|mov|mkv|wmv|flv|m4v|webm|3gp|asf|vob|mpg|mts|ogg|divx|mp3|pdf|doc|docx|xls|xlsx|ppt|pptx|zip|rar|7z|tar|gz|bz2|exe|dll|bat|msi|txt|csv|xml|html|json|css|js|php|java|c|cpp|h)$/)) !== null) ?
                                                            <a href={`${BASE_URL}/${message.message}`} target='_blank'>
                                                                ${BASE_URL}${message.message}
                                                            </a>
                                                            :
                                                            `${message.message}`
                                                        }
                                                    </p>
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
                                                        <time>{message.time}</time>
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
                                                    <p>
                                                        {((message.message.match(/\.(mp4|avi|mov|mkv|wmv|flv|m4v|webm|3gp|asf|vob|mpg|mts|ogg|divx|mp3|pdf|doc|docx|xls|xlsx|ppt|pptx|zip|rar|7z|tar|gz|bz2|exe|dll|bat|msi|txt|csv|xml|html|json|css|js|php|java|c|cpp|h)$/)) !== null) ?
                                                            <a href={`${BASE_URL}/${message.message}`}>
                                                                {BASE_URL}/${message.message}
                                                            </a>
                                                            :
                                                            `${message.message}`
                                                        }
                                                    </p>
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
                                                        <time>{message.time}</time>
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
