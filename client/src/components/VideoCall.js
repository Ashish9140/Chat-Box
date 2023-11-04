import React, { useEffect, useState, useRef, useContext } from 'react';
import { CartContext } from '../CartContext';
import io from "socket.io-client";
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

function App() {
    const { user, allUser } = useContext(CartContext);
    console.log(user);
    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);

    const userVideo = useRef();
    const partnerVideo = useRef();
    const socket = useRef();

    useEffect(() => {
        socket.current = io.connect("https://stchrom.tgb.software");
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            setStream(stream);
            if (userVideo.current) {
                userVideo.current.srcObject = stream;
            }
        })

        socket.current.on("hey", (data) => {
            console.log("Called");
            setReceivingCall(true);
            setCaller(data.from);
            setCallerSignal(data.signal);
        })
    }, []);

    async function callPeer(Navuser) {
        let roomId = user.email + Navuser.email;
        roomId = roomId.split('').sort().join('')

        // Join User
        await socket.emit("join_room", roomId);
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
            socket.current.emit("callUser", { userToCall: Navuser, signalData: data, from: user, room: roomId })
        })

        peer.on("stream", stream => {
            if (partnerVideo.current) {
                partnerVideo.current.srcObject = stream;
            }
        });

        socket.current.on("callAccepted", signal => {
            setCallAccepted(true);
            peer.signal(signal);
        })

    }

    function acceptCall() {
        setCallAccepted(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream,
        });
        peer.on("signal", data => {
            socket.current.emit("acceptCall", { signal: data, to: caller })
        })

        peer.on("stream", stream => {
            partnerVideo.current.srcObject = stream;
        });

        peer.signal(callerSignal);
    }

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
    if (receivingCall) {
        incomingCall = (
            <div>
                <h1>{caller} is calling you</h1>
                <button onClick={acceptCall}>Accept</button>
            </div>
        )
    }
    return (
        <Container>
            <Row>
                {UserVideo}
                {PartnerVideo}
            </Row>
            <Row>
                {allUser.map(key => {
                    if (key._id === user._id) {
                        return null;
                    }
                    return (
                        <button onClick={() => callPeer(key._id)}>Call {key}</button>
                    );
                })}
            </Row>
            <Row>
                {incomingCall}
            </Row>
        </Container>
    );
}

export default App;