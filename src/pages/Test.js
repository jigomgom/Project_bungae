import React from "react";

function Test() {
  //   var constraints = { audio: true, video: true };

  //   navigator.mediaDevices.getUserMedia(constraints);
  // .then(function (mediaStream) {
  //   var video = document.querySelector("video");
  //   video.srcObject = mediaStream;
  //   video.onloadedmetadata = function (e) {
  //     video.play();
  //   };
  // })
  // .catch(function (err) {
  //   console.log(err.name + ": " + err.message);
  // });
  // always check for errors at the end.

  const getWebcam = (callback) => {
    try {
      const constraints = {
        video: true,
        audio: true,
      };
      navigator.mediaDevices.getUserMedia(constraints).then(callback);
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };

  const Styles = {
    Video: {
      width: "100%",
      height: "100%",
      background: "rgba(245, 240, 215, 0.5)",
    },
    None: { display: "none" },
  };

  const [playing, setPlaying] = React.useState(undefined);

  const videoRef = React.useRef(null);

  React.useEffect(() => {
    getWebcam((stream) => {
      setPlaying(true);
      videoRef.current.srcObject = stream;
    });
  }, []);
  const startOrStop = () => {
    if (playing) {
      const s = videoRef.current.srcObject;
      s.getTracks().forEach((track) => {
        track.stop();
      });
    } else {
      getWebcam((stream) => {
        setPlaying(true);
        videoRef.current.srcObject = stream;
      });
    }
    setPlaying(!playing);
  };

  return (
    <>
      <div style={{ width: "100vw", height: "100vh", padding: "3em" }}>
        <video ref={videoRef} autoPlay style={Styles.Video} />
        <button color="warning" onClick={() => startOrStop()}>
          {playing ? "Stop" : "Start"}{" "}
        </button>
      </div>
    </>
  );
}

export default Test;

{
  /* <nav className="chat-header" role="navigation">
              <div className="chat-header-backkey">
                <img src={IconBackKey} alt="" />
              </div>
              <div id="menuToggle">
                <input
                  type="checkbox"
                  onClick={() => {
                    chatPerson();
                    chatFile();
                  }}
                />

                <span></span>
                <span></span>
                <span></span>

                <ul id="menu">
                  <div className="toggle-file">
                    <div className="toggle-file-title">
                      <li>사진, 동영상</li>
                      <img src={IconForwardKey} alt="" />
                    </div>
                    <Swiper
                      style={{ marginTop: "20px" }}
                      spaceBetween={70}
                      slidesPerView={3}
                    >
                      {FilesArray.map((item, index) => {
                        return (
                          <SwiperSlide key={index}>
                            <PostMemberCard>
                              <PostMemberPicture />
                            </PostMemberCard>
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>
                  <div className="toggle-member-list">
                    <li>번개 멤버</li>
                    {MembersArray.map((item, index) => {
                      return (
                        <div className="toggle-member" key={index}>
                          <img
                            className="toggle-member-img"
                            src={defaultProfile}
                            alt=""
                          />
                          <p>{item}</p>
                          <img
                            className="toggle-member-siren"
                            src={IconSiren}
                            alt=""
                            onClick={() => {
                              ModalOnClickHandler();
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="toggle-footer">
                    <img className="toggle-footer-moon" src={IconMoon} alt="" />
                    <p>나가기</p>
                    <img
                      className="toggle-footer-noti"
                      src={Notification}
                      alt=""
                    />
                  </div>
                  {isModal && (
                    <div className="modal-wrapper">
                      <div className="modal-overlay">
                        <div className="modal-inner">
                          <div className="modal-content-wrap" ref={el}>
                            <div className="modal-content-title">
                              <p>신고내역</p>
                            </div>
                            {ReportArray.map((item, index) => {
                              return (
                                <>
                                  <div className="modal-content-divider"></div>
                                  <div
                                    className="modal-content-report"
                                    key={index}
                                    onClick={() => {
                                      BtnOnClickHandler();
                                    }}
                                  >
                                    {item.value}
                                  </div>
                                </>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {isBtn && (
                    <div className="modal-wrapper-btn">
                      <div className="modal-inner-btn">
                        <div className="modal-content-wrap-btn">
                          <div>신고하기</div>
                        </div>
                      </div>
                    </div>
                  )}
                </ul>
              </div>
            </nav> */
}
