import React, { useEffect, useRef, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useSwipeable } from "react-swipeable";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
//Components

//styled-components
import {
  PostMemberCard,
  PostMemberPicture,
  PostMemberName,
} from "../styles/StyledDetailPost";
//CSS
import "../styles/Chat1.css";
//icons
import IconHamburger from "../assets/icon-hamburger.svg";
import IconBackKey from "../assets/icon-left-arrow.svg";
import IconForwardKey from "../assets/icon-right-arrow.svg";
import IconMyPoint from "../assets/icon-mylocation.svg";
import IconCamera from "../assets/icon-camera-mono (1).svg";
import defaultProfile from "../assets/icon-default-profile.svg";
import SendBtn from "../assets/icon-sendbtn (1).svg";
import IconMainLogo from "../assets/icon-main-logo.svg";
import IconSiren from "../assets/icon-siren.svg";
import IconMoon from "../assets/icon-share-mono.svg";
import Notification from "../assets/icon-notification.svg";

let client = null;

function ChatTest(props) {
  const token = localStorage.getItem("login-token");
  const postId = props.Bungle;
  // const postId = 6;
  console.log("Chattest ", postId);
  // const token =
  //   "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqZW9uZ2h5ZW9udWs5OEBnbWFpbC5jb20iLCJpYXQiOjE2NTc1NjcxNTMsImV4cCI6MTY1NzY1MzU1M30.JOSRNC06Sp7xwvWbJ35kWONEV3NPm8M3T5V77f8wKPc";
  const username = localStorage.getItem("user-name");

  // console.log(token);
  const [publicChats, setPublicChats] = useState([]);
  const [userData, setUserData] = useState({
    type: "",
    nickName: "",
    receivername: "",
    roomId: "",
    connected: false,
    message: "",
  });

  // React.useEffect(() => {
  //   connect();
  // }, []);

  React.useEffect(() => {
    if (postId > 0) {
      connect();
    }
  }, [postId]);

  const connect = () => {
    let sock = new SockJS("http://52.79.214.48/ws/chat");
    client = over(sock);
    client.connect({ token }, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    client.subscribe(`/sub/chat/room/${postId}`, onMessageReceived);

    userJoin();
  };
  // console.log(userData);

  const onError = (err) => {
    console.log("Test ", err);
  };

  const userJoin = () => {
    console.log("Test user Join");
    var chatMessage = {
      type: "ENTER",
      nickName: "seowoo",
      roomId: `${postId}`,
      status: "JOIN",
    };
    client.send("/pub/chat/message", { token }, JSON.stringify(chatMessage));
    console.log("Test user Subscribe");
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const sendValue = () => {
    console.log("Test user send");
    if ((client && userData.message) || (client && fileUrl)) {
      var chatMessage = {
        type: "TALK",
        message: userData.message,
        roomId: `${postId}`,
        fileUrl: fileUrl,
      };
      console.log(chatMessage);
      client.send("/pub/chat/message", { token }, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
      setFileUrl(null);
    }
  };

  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    if (payloadData.type === "TALK") {
      console.log("switch Message");
      publicChats.push(payloadData);
      setPublicChats([...publicChats]);
    }
  };

  //날짜 커스텀
  let chattingDate = [];
  let ampm = "";
  let hour;
  let minutes;
  for (let i = 0; i < publicChats.length; i++) {
    hour = publicChats[i].createdAt.split(",")[3];
    minutes = publicChats[i].createdAt.split(",")[4];
    if (hour > 12) {
      ampm = "오후";
      hour = hour - 12;
      chattingDate.push(ampm + " " + hour + ":" + minutes);
    } else {
      ampm = "오전";
      hour = hour;
      chattingDate.push(ampm + " " + hour + ":" + minutes);
    }
  }
  console.log(publicChats);

  //Disconnect
  const chatDisconnect = () => {
    var chatMessage = {
      type: "QUIT",
      roomId: `${postId}`,
    };
    client.send("/pub/chat/message", { token }, JSON.stringify(chatMessage));
    client.disconnect(function () {
      alert("See you next time!");
    });
  };

  //엔터키
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      sendValue();
    }
  };

  //이미지 업로드
  const [isFile, setIsFile] = useState("");
  // const [Img, setImg] = useState([]);
  const [fileUrl, setFileUrl] = useState();

  const imageUpload = (e) => {
    if (e.target.files[0]) {
      setIsFile(e.target.files[0]);
    } else {
      setIsFile(null);
      return;
    }
  };
  console.log(isFile);

  const chatImg = async () => {
    if (fileUrl) {
      setFileUrl(null);
      console.log(fileUrl);
    } else {
      const formData = new FormData();
      formData.append("file ", isFile);
      const response = await axios.post(
        `http://52.79.214.48/chat/message/file`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      setFileUrl(response.data);
    }
    console.log(fileUrl);
  };
  console.log(fileUrl);

  React.useEffect(() => {
    chatImg();
  }, [isFile]);

  //햄버거 메뉴 토글
  // const [menuOpen, setMenuOpen] = useState(false);
  // const handlers = useSwipeable({
  //   trackMouse: true,
  //   onSwipedRight: () => setMenuOpen(true),
  // });
  const FilesArray = [
    "Lorem ipsum1",
    "Lorem ipsum2",
    "Lorem ipsum3",
    "Lorem ipsum4",
    "Lorem ipsum5",
  ];
  const MembersArray = [
    "Lorem ipsum1",
    "Lorem ipsum2",
    "Lorem ipsum3",
    "Lorem ipsum4",
    "Lorem ipsum5",
    "Lorem ipsum6",
    "Lorem ipsum7",
    "Lorem ipsum8",
    "Lorem ipsum9",
    "Lorem ipsum10",
    "Lorem ipsum11",
  ];
  const ReportArray = [
    { key: 1, value: "상업적 광고 및 판매" },
    { key: 2, value: "게시판 성격에 부적절함" },
    { key: 3, value: "음란물/불건전한 만남 및 대화" },
    { key: 4, value: "유출/사칭/사기" },
    { key: 5, value: "욕설/비하" },
    { key: 6, value: "낚시/놀람/도배" },
    { key: 7, value: "정당/정치인 비하 및 선거운동" },
  ];

  //토클 클릭시 회원 정보, 사진/동영상 정보 불러오기
  const chatPerson = () => {
    axios({
      method: "get",
      url: `http://52.79.214.48/chat/message/userinfo/${postId}`,
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        console.log(response.data.userId);
        // setUserId(response.data.userId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const [fileData, setFileData] = () => {};
  const chatFile = () => {
    axios({
      method: "get",
      url: `http://52.79.214.48/chat/message/files/${postId}`,
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Modal state
  const [isModal, setIsModal] = useState(false);
  const [isBtn, setIsBtn] = useState(false);
  const [userId, setUserId] = useState();

  const ModalOnClickHandler = () => {
    setIsModal(true);
  };
  const BtnOnClickHandler = () => {
    setIsBtn(!isBtn);
  };

  //Modal 밖 영역 클릭 시 닫기
  const el = useRef();
  console.log(el);

  const handleCloseModal = (e) => {
    if (isModal && (!el.current || !el.current.contains(e.target))) {
      setIsModal(false);
      setIsBtn(false);
    }
  };
  console.log(isModal);
  React.useEffect(() => {
    window.addEventListener("click", handleCloseModal);
    return () => {
      window.removeEventListener("click", handleCloseModal);
    };
  }, []);
  console.log(isModal, isBtn);

  //신고하기
  const chatReportPerson = () => {
    axios({
      method: "get",
      url: `http://52.79.214.48/user/report/{userId}`,
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div id="chat-app">
        <div id="page-wrap">
          <div className="chat-wrap">
            <nav className="chat-header" role="navigation">
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
                          <div>
                            <img
                              className="toggle-member-img"
                              src={defaultProfile}
                              alt=""
                            />
                          </div>
                          <div>
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
            </nav>
            {publicChats.map((chat, index) => (
              <div key={index}>
                {/* {console.log(chat.fileUrl)} */}
                {username !== chat.username ? (
                  <>
                    <div className="item">
                      <div className="profile">
                        <img src={defaultProfile} alt="" />
                      </div>
                      <div className="box">
                        <span className="nickname">Sender</span>
                        {chat.message && chat.message !== "" ? (
                          <>
                            <p className="msg">{chat.message}</p>
                          </>
                        ) : (
                          <>
                            {console.log(chat.fileUrl.data)}
                            {chat.fileUrl.slice(-3) === "jpg" ||
                            chat.fileUrl.slice(-3) === "png" ||
                            chat.fileUrl.slice(-4) === "jpeg" ||
                            chat.fileUrl.slice(-3) === "gif" ||
                            chat.fileUrl.slice(-3) === "bmp" ||
                            chat.fileUrl.slice(-3) === "img" ||
                            chat.fileUrl.slice(-3) === "JPG" ||
                            chat.fileUrl.slice(-3) === "PNG" ||
                            chat.fileUrl.slice(-4) === "JPEG" ||
                            chat.fileUrl.slice(-3) === "GIF" ||
                            chat.fileUrl.slice(-3) === "BMP" ||
                            chat.fileUrl.slice(-3) === "IMG" ? (
                              <>
                                <p className="mymsg-file">
                                  <img src={chat.fileUrl} alt="" />
                                </p>
                              </>
                            ) : (
                              <>
                                <p className="mymsg-file">
                                  <video controls name="media">
                                    <source
                                      src={chat.fileUrl}
                                      type="video/mp4"
                                    />
                                  </video>
                                </p>
                              </>
                            )}
                          </>
                        )}
                        <span className="time" key={index}>
                          {chattingDate[index]}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="myitem">
                      {/* <div className="profile">
                    <img src={defaultProfile} alt="" />
                  </div> */}
                      <div className="mybox">
                        <span className="mynickname">Sender</span>
                        {chat.message && chat.message !== "" ? (
                          <>
                            <p className="mymsg">{chat.message}</p>
                          </>
                        ) : (
                          <>
                            {console.log(chat.fileUrl.slice(-3))}
                            {chat.fileUrl.slice(-3) === "jpg" ||
                            chat.fileUrl.slice(-3) === "png" ||
                            chat.fileUrl.slice(-4) === "jpeg" ||
                            chat.fileUrl.slice(-3) === "gif" ||
                            chat.fileUrl.slice(-3) === "bmp" ||
                            chat.fileUrl.slice(-3) === "img" ? (
                              <>
                                <p className="mymsg-file">
                                  <img src={chat.fileUrl} alt="" />
                                </p>
                              </>
                            ) : (
                              <>
                                <p className="mymsg-file">
                                  <video controls name="media">
                                    <source
                                      src={chat.fileUrl}
                                      type="video/mp4"
                                    />
                                  </video>
                                </p>
                              </>
                            )}
                          </>
                        )}
                        <span className="mytime" key={index}>
                          {chattingDate[index]}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="chatting-footer-wrap">
            <div className="chatting-footer">
              <div className="chatting-footer-icon">
                <label className="input-file-button" for="fileUpload">
                  <img src={IconCamera} alt="" />
                </label>
                <input
                  type="file"
                  id="fileUpload"
                  accept="image/*, video/*"
                  name="chat_img"
                  onChange={imageUpload}
                />
                {/* <img src={IconCamera} alt="" /> */}
              </div>
              <div className="chatting-footer-input">
                <input
                  type="text"
                  placeholder={"체크할 항목"}
                  value={userData.message}
                  onChange={handleMessage}
                  onKeyPress={onKeyPress}
                />
                <button onClick={sendValue}>
                  <img src={SendBtn} alt="" />
                </button>
                {/* <button onClick={chatImg}>img</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatTest;
