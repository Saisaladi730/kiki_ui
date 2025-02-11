import React, { useEffect, useState } from 'react';
import { getVoiceText } from '../ApiServices/Apiservices';
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import ScrollToBottom from "react-scroll-to-bottom"

function Page() {

    const { finalTranscript, transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition()
    const [selectedPhoto, setSelectedPhoto] = useState("");
    const [selectedPhotoCss, setSelectedPhotoCss] = useState("")
    const [chatMsg, setChatMsg] = useState([{ uservoice: '', airesp: '' }]);
    const [aiChat, setAiChat] = useState<string[]>([])


    let arr: string[] = []



    useEffect(() => {
        setSelectedPhoto("images/p1.png")
    }, [])

    useEffect(() => {
        if (finalTranscript != "") {
            setChatMsg([...chatMsg, { uservoice: finalTranscript, airesp: '' }]);
        }
        console.log(finalTranscript, 'transcript')
    }, [finalTranscript])

    useEffect(() => {
        const handleAiResponse = async (transcription_text: any) => {
            try {
                const response = await axios.post("http://localhost:8000/process-transcription", transcription_text);
                //setTranscription(response.data.transcription);  // Update UI with transcription
                let transcription = {
                    text : response.data,
                    voice: 'alloy'
                }
                setChatMsg([...chatMsg, { airesp: response.data, uservoice: '' }]);
                const response1 = await axios.post("http://localhost:8000/generate_speech", transcription);
            } catch (error) {
                console.error("Error fetching transcription:", error);
            }
        };
        if (chatMsg[chatMsg.length - 1].uservoice != '') {
            let transcription = {
                transcription_text: chatMsg[chatMsg.length - 1].uservoice
            }
            handleAiResponse(transcription)
        }
    }, [chatMsg])


    useEffect(() => {
        // const handleAiResponse = async (transcription_text: any) => {
        //     try {

        //         const response = await axios.post("http://localhost:8000/generate_speech", transcription_text);
        //         //setTranscription(response.data.transcription);  // Update UI with transcription
        //         //setChatMsg([...chatMsg, { airesp: response.data, uservoice: '' }]);
        //     } catch (error) {
        //         console.error("Error fetching transcription:", error);
        //     }
        // };
        // if (chatMsg[chatMsg.length - 1].airesp != '') {
        //     let transcription = {
        //         text : chatMsg[chatMsg.length - 1].airesp,
        //         voice: 'alloy'
        //     }
        //     handleAiResponse(transcription)
        // }
    }, [chatMsg])


    return (
        <>
            <div className="header">
                {/* Image and text */}
                <nav className="navbar navbar-light h-bg">
                    <a className="navbar-brand" href="#">
                        <span className="logo">KIKI &nbsp;</span>
                        <span className="spl-text">Born to Love</span>
                        <span><img src="images/heart.png" style={{ width: "50px" }} /></span>
                    </a>
                </nav>
            </div>
            <div className="body-content">
                <div className="row m-0 col-12">
                    <div className="col-9">
                        <div className="profiles-section mt-4">
                            <div className="col-12 mb-5 text-center">
                                <h2 className="heading">Select Voice</h2>
                            </div>
                            <div className="circle text-center">
                                <img src="images/P1.png" className="Pimg bg-white" onClick={() => setSelectedPhoto("images/P1.png")} />
                                <span>
                                    <img
                                        src="images/heart.png"
                                        style={{
                                            width: '35px',
                                            position: 'absolute',
                                            marginLeft: '-3rem',
                                            marginTop: '-5px'
                                        }}
                                    />
                                </span>
                                <img src="images/P2.png" className="Pimg" onClick={() => setSelectedPhoto("images/P2.png")} />
                                <img src="images/P3.png" className="Pimg" onClick={() => setSelectedPhoto("images/P3.png")} />
                                <img src="images/P4.png" className="Pimg" onClick={() => setSelectedPhoto("images/P4.png")} />
                                <img src="images/P5.png" className="Pimg" onClick={() => setSelectedPhoto("images/P5.png")} />
                                <img src="images/P6.png" className="Pimg" onClick={() => setSelectedPhoto("images/P6.png")} />
                            </div>
                            <div className="selected-profile text-center">
                                <img src={selectedPhoto} className="Simg mt-3" />
                                <span>
                                    <img
                                        src={"images/heart.png"}
                                        style={{
                                            width: "50px",
                                            position: "absolute",
                                            marginLeft: "-3rem",
                                            marginTop: "1.5rem"
                                        }}
                                    />
                                </span>
                            </div>
                            <button onClick={() => SpeechRecognition.startListening()}>START</button>

                        </div>
                    </div>
                    <div className="col-3">
                    <ScrollToBottom>
                            <div className="transcription-box">
                                <div className="chat-container">
                                    <div className="chat-box">
                                        {
                                            chatMsg.map((c: any, index: any) => {
                                                console.log(index, 'clnegth')
                                                return <>
                                                    <div className={c.uservoice != '' ? "message left" : "message right"}>
                                                        <p>{c.uservoice != null ? c.uservoice : ''}</p>
                                                        <p>{c.airesp != null ? c.airesp : ''}</p>
                                                    </div>
                                                </>
                                            })
                                        }
                                    </div>
                                    <div className="input-box text-right">
                                        <span className="ml-auto"><i className="fa-solid fa-microphone-lines"></i></span>
                                    </div>
                                </div>
                            </div>
                    </ScrollToBottom>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;
