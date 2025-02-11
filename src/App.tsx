import React from 'react';
import './App.css';

function App() {
  return <>

    <div className="header">
      {/* <!-- Image and text --> */}
      <nav class="navbar navbar-light bg-light" style="background-color: #f8f9fa7d !important;">
        <a className="navbar-brand" href="#">
          {/* <!-- <img src="/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30" */}
            {/* className="d-inline-block align-top" alt="">
                    Bootstrap --> */}
            <span className="logo">KIKI &nbsp;</span><span className="spl-text">Born to Love</span><span><img src="images/heart.png" style="width: 50px;" /></span>
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
              <img src="images/P1.png" className="Pimg bg-white" />
              <span><img src="images/heart.png" style="width: 35px;position: absolute;margin-left: -3rem;margin-top: -5px;"/></span>
              <img src="images/P2.png" className="Pimg" />
              <img src="images/P3.png" className="Pimg" />
              <img src="images/P4.png" className="Pimg" />
              <img src="images/P5.png" className="Pimg" />
              <img src="images/P6.png" className="Pimg" />
            </div>
            <div className="selected-profile text-center">
              <img src="images/P1.png" className="Simg mt-3" />
              <span><img src="images/heart.png" style="width: 50px;position: absolute;margin-left: -3rem;margin-top: 1.5rem;"/></span>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="transcription-box">
            <div className="chat-container">
              <div className="chat-box">
                <div className="message left">
                  <p>hello</p>
                </div>
                <div className="message right">
                  {/* <!-- <p className="text-right fs-12">Me</p> --> */}
                  <p>hi</p>
                </div>
                <div className="message left">
                  <p>How are you?</p>
                </div>
              </div>
              <div className="input-box text-right">
                {/* <!-- <input type="text" placeholder="Type a message..." /> --> */}
                <span className="ml-auto"><i className="fa-solid fa-microphone-lines"></i></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </>
}

export default App;
