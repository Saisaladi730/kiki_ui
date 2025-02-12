import React, { useEffect, useRef, useState } from 'react';
import { getVoiceText } from '../ApiServices/Apiservices';
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import ScrollToBottom from "react-scroll-to-bottom"

function Page2() {

    const { finalTranscript, transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition()
    const [selectedPhoto, setSelectedPhoto] = useState("");
    const [selectedPhotoCss, setSelectedPhotoCss] = useState("")
    const [chatMsg, setChatMsg] = useState([{ uservoice: '', airesp: '' }]);
    const [aiChat, setAiChat] = useState<string[]>([])
    const [selectedVoice,setSelectedVoice] = useState('');
    const [startAi,setStartAi] = useState('');
    const ref : any = useRef(false);
    const [FirstImg,setFirstImg] = useState('')

    function makeRefTrue()
    {
        ref.current = true;
    }

    useEffect(() => {
        setSelectedPhoto("images/p1.png")
        setSelectedVoice('alloy')
    }, [])

    useEffect(()=>{
        if(startAi != '')
        {
            const handleAiResponse = async (transcription_text: any) => {
                try {
                    const response = await axios.post("http://localhost:8000/process-transcription", transcription_text);
                    //setTranscription(response.data.transcription);  // Update UI with transcription
                    // let transcription = {
                    //     text : response.data,
                    //     voice: 'alloy'
                    // }
                    setChatMsg([...chatMsg, { airesp: response.data, uservoice: '' }]);
                    // const response1 = await axios.post("http://localhost:8000/generate_speech", transcription);
                    SpeechRecognition.startListening({ continuous: true });
                } catch (error) {
                    console.error("Error fetching transcription:", error);
                }
            };
            if (startAi != '') {
                let transcription = {
                    transcription_text: '',
                    voice: selectedVoice != '' ? selectedVoice : 'alloy'
                }
                handleAiResponse(transcription)
            }    
        }
    },[startAi])

    useEffect(() => {
        if (finalTranscript != "") {
            console.log(finalTranscript,'final transcript')
            setChatMsg([...chatMsg, { uservoice: finalTranscript, airesp: '' }]);
            resetTranscript()
        }
        console.log(finalTranscript, 'transcript')
    }, [finalTranscript])

    useEffect(() => {
        const handleAiResponse = async (transcription_text: any) => {
            try {
                SpeechRecognition.startListening({ continuous: false });
                const response = await axios.post("http://localhost:8000/process-transcription", transcription_text);
                //setTranscription(response.data.transcription);  // Update UI with transcription
                // let transcription = {
                //     text : response.data,
                //     voice: 'alloy'
                // }
                setChatMsg([...chatMsg, { airesp: response.data, uservoice: '' }]);
               // const response1 = await axios.post("http://localhost:8000/generate_speech", transcription);
               SpeechRecognition.startListening({ continuous: true });
            } catch (error) {
                console.error("Error fetching transcription:", error);
            }
        };
        if (chatMsg[chatMsg.length - 1].uservoice != '' && startAi !== '') {
            let transcription = {
                transcription_text: chatMsg[chatMsg.length - 1].uservoice,
                voice: selectedVoice != '' ? selectedVoice : 'alloy'
            }
            handleAiResponse(transcription)
        }
    }, [chatMsg])


    useEffect(() => {
        debugger
        const handleAiResponse = async (transcription_text: any) => {
            try {
                const response = await axios.post("http://localhost:8000/select_voices", transcription_text);
                //setTranscription(response.data.transcription);  // Update UI with transcription
                //setChatMsg([...chatMsg, { airesp: response.data, uservoice: '' }]);
            } catch (error) {
                console.error("Error fetching transcription:", error);
            }
        };
        if (selectedVoice != '' && startAi === '' && ref.current) {
            let transcription = {
                voices : selectedVoice
            }
            ref.current = true;
            handleAiResponse(transcription)
        }
    }, [selectedVoice])


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
                            <img src="images/P1.png" className={ selectedVoice === "alloy" ? "Pimg bg-white" : "Pimg"} onClick={() => {setSelectedPhoto("images/P1.png");setSelectedVoice("alloy");makeRefTrue()}} />
                                <span>
                                { selectedVoice === "alloy" ?<img
                                        src="images/heart.png"
                                        style={selectedVoice === "alloy" ? { width: '35px', position: 'absolute', marginLeft: '-3rem', marginTop: '-5px' } : undefined}
                                    /> : ''}
                                </span>
                                <img src="images/P2.png" className={ selectedVoice === "coral" ? "Pimg bg-white" : "Pimg"}   onClick={() => {setSelectedPhoto("images/P2.png");setSelectedVoice("coral");makeRefTrue()}} />
                                <span>
                                {selectedVoice === "coral" ?<img
                                        src="images/heart.png"
                                        style={selectedVoice === "coral" ? { width: '35px', position: 'absolute', marginLeft: '-3rem', marginTop: '-5px' } : undefined}
                                    /> : ''}
                                </span>
                                <img src="images/P3.png" className={ selectedVoice === "sage" ? "Pimg bg-white" : "Pimg"}  onClick={() => {setSelectedPhoto("images/P3.png");setSelectedVoice("sage");makeRefTrue()}} />
                                <span>

                                    {selectedVoice === "sage" ?<img
                                        src="images/heart.png"
                                        style={selectedVoice === "sage" ? { width: '35px', position: 'absolute', marginLeft: '-3rem', marginTop: '-5px' } : undefined}
                                    /> : ''}
                                </span>
                                <img src="images/P4.png" className={ selectedVoice === "echo" ? "Pimg bg-white" : "Pimg"}  onClick={() => {setSelectedPhoto("images/P4.png");setSelectedVoice("echo");makeRefTrue()}} />
                                <span>
                                {selectedVoice === "echo" ?<img
                                        src="images/heart.png"
                                        style={selectedVoice === "echo" ? { width: '35px', position: 'absolute', marginLeft: '-3rem', marginTop: '-5px' } : undefined}
                                    /> : ''}
                                </span>
                                <img src="images/P5.png" className={ selectedVoice === "onyx" ? "Pimg bg-white" : "Pimg"}  onClick={() => {setSelectedPhoto("images/P5.png");setSelectedVoice("onyx");makeRefTrue()}} />
                                <span>
                                {selectedVoice === "onyx" ?<img
                                        src="images/heart.png"
                                        style={selectedVoice === "onyx" ? { width: '35px', position: 'absolute', marginLeft: '-3rem', marginTop: '-5px' } : undefined}
                                    /> : ''}
                                </span>
                                <img src="images/P6.png" className={ selectedVoice === "ash" ? "Pimg bg-white" : "Pimg"}  onClick={() => {setSelectedPhoto("images/P6.png");setSelectedVoice("ash");makeRefTrue()}} />
                                <span>
                                {selectedVoice === "ash" ?<img
                                        src="images/heart.png"
                                        style={selectedVoice === "ash" ? { width: '35px', position: 'absolute', marginLeft: '-3rem', marginTop: '-5px' } : undefined}
                                    /> : ''}
                                </span>
                            </div>
                            <div className="selected-profile text-center">
                                <img src={selectedPhoto} className="Simg" />
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
                            <div className="col-11 text-right">
                            <button type="button" onClick={() => {setStartAi('start')}} className="start-btn">START</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                    <ScrollToBottom>
                            <div className="transcription-box">
                                <div className="chat-container">
                                    <div className="chat-box">
                                        {
                                            chatMsg.map((c: any, index: any) => {
                                                console.log(c.uservoice, 'uservoice')
                                                return <>
                                                    <div className={c.uservoice != '' ? "message left" : "message right"}>
                                                        <p>{c.uservoice != null ? c.uservoice : ''}</p>
                                                        <p>{c.airesp != null ? c.airesp : ''}</p>
                                                    </div>
                                                </>
                                            })
                                        }
                                    </div>
                                    {/* <div className="input-box text-right">
                                        <span className="ml-auto"><i className="fa-solid fa-microphone-lines"></i></span>
                                    </div> */}
                                </div>
                            </div>
                    </ScrollToBottom>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page2;
