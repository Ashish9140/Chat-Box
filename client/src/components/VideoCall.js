import React, { useEffect, useState, useRef, useContext } from 'react';
import { CartContext } from '../CartContext';
import Peer from "simple-peer";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
`;

const Video = styled.video`
  border: 1px solid blue;
  width: 50%;
  height: 50%;
`;

function VideoCall({ socket }) {
    const { user, rightTop } = useContext(CartContext);
    console.log(user, rightTop);
    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [room, setRoom] = useState();
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);

    const userVideo = useRef();
    const partnerVideo = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            setStream(stream);
            if (userVideo.current) {
                userVideo.current.srcObject = stream;
            }
        })
        let roomId = user.email + rightTop.email;
        roomId = roomId.split('').sort().join('')
        setRoom(roomId)

        socket.on("hey", (data) => {
            console.log("Called");
            setReceivingCall(true);
            setCaller(data.from._id);
            setCallerSignal(data.signal);
        })
    }, []);

    async function callPeer() {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            config: {

                iceServers: [
                    {
                        urls: "stun:numb.viagenie.ca",
                        username: "sultan1640@gmail.com",
                        credential: "98376683"
                    },
                    {
                        urls: "turn:numb.viagenie.ca",
                        username: "sultan1640@gmail.com",
                        credential: "98376683"
                    }
                ]
            },
            stream: stream,
        });

        peer.on("signal", data => {
            socket.emit("callUser", { userToCall: rightTop, signalData: data, from: user, room: room })
        })

        peer.on("stream", stream => {
            if (partnerVideo.current) {
                partnerVideo.current.srcObject = stream;
            }
        });

        socket.on("callAccepted", signal => {
            setCallAccepted(true);
            peer.signal(signal);
        })

    }

    // function acceptCall() {
    //     setCallAccepted(true);
    //     const peer = new Peer({
    //         initiator: false,
    //         trickle: false,
    //         stream: stream,
    //     });
    //     peer.on("signal", data => {
    //         socket.emit("acceptCall", { signal: data, to: caller })
    //     })

    //     peer.on("stream", stream => {
    //         partnerVideo.current.srcObject = stream;
    //     });

    //     peer.signal(callerSignal);
    // }

    let UserVideo;
    if (stream) {
        UserVideo = (
            <Video playsInline muted ref={userVideo} autoPlay />
        );
    }

    let PartnerVideo;
    if (callAccepted) {
        PartnerVideo = (
            <Video playsInline ref={partnerVideo} autoPlay />
        );
    }

    let incomingCall;
    // if (receivingCall) {
    //     incomingCall = (
    //         <div>
    //             <h1>{caller} is calling you</h1>
    //             <button onClick={acceptCall}>Accept</button>
    //         </div>
    //     )
    // }
    return (
        <Container>
            <Row>
                {UserVideo}
                {PartnerVideo}
            </Row>
            {/* <Row>
                {allUser.map(key => {
                    if (key._id === user._id) {
                        return null;
                    }
                    return (
                        <button onClick={() => callPeer(key)}>Call {key.name}</button>
                    );
                })}
            </Row> */}
            <button onClick={() => callPeer()}>Call</button>
            <Row>
                {incomingCall}
            </Row>
        </Container>
    );
}

export default VideoCall;