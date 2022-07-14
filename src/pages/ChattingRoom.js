import React, { useEffect, useRef, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/pagination";
//Component
// import Chat from "../components/Chat";
// import ChatTest from "../components/ChatTest";

//styled-components
import {
  HeaderWrap,
  BackKey,
  Logo,
  PageTitle,
  HeadrIconsWrap,
  IconMyLocation,
  IconNotification,
  IconSetting,
  IconHamburger,
} from "../styles/StyledHeader.js";
import {
  PostMemberCard,
  PostMemberPicture,
  PostMemberVideo,
  PostMemberName,
} from "../styles/StyledDetailPost";
//CSS
import "../styles/Chat1.css";
//icons
import Hamburger from "../assets/icon-hamburger.svg";
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
import Setting from "../assets/icon-setting.svg";

let client = null;

function ChattingRoom() {
  // SERVER URL
  // const SERVER_URL = "http://3.37.61.25";
  const SERVER_URL = "http://52.79.214.48";
  // navigate
  const navigate = useNavigate();
  // 방장권한
  const BungleOnwer = useSelector((state) => state.Bungle.isOwner);
  // 내가 만든 채팅 룸 ID
  const Bungle = useSelector((state) => state.Bungle.OnwerPostId);
  // 참여자 채팅 룸 ID
  const Guest = useSelector((state) => state.Bungle.detailBungle.postId);
  // if (Bungle) {
  //   console.log("PostID ", Bungle);
  // }
  const token = localStorage.getItem("login-token");

  let postId;

  console.log(Bungle);
  console.log(Guest);

  if (Bungle > 0) {
    postId = Bungle;
  } else if (Guest > 0) {
    postId = String(Guest);
    // console.log(parseInt(postId));
  }

  console.log(Bungle, Guest, postId);
  // const { postID } = useParams();

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
    if (postId > 0 || Number(postId) > 0) {
      connect();
    }
  }, [postId]);

  const connect = () => {
    let sock = new SockJS(`${SERVER_URL}/ws/chat`);
    client = over(sock);
    client.connect({ token }, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    if (Bungle) {
      client.subscribe(`/sub/chat/room/${postId}`, onMessageReceived);
    } else if (Guest) {
      client.subscribe(`/sub/chat/room/${parseInt(postId)}`, onMessageReceived);
    }
    userJoin();
  };
  // console.log(userData);

  const onError = (err) => {
    console.log("Test ", err);
  };

  const userJoin = () => {
    console.log("Test user Join");
    if (Bungle) {
      var chatMessage = {
        type: "ENTER",
        nickName: "seowoo",
        roomId: `${postId}`,
        status: "JOIN",
      };
    } else if (Guest) {
      var chatMessage = {
        type: "ENTER",
        nickName: "seowoo",
        roomId: `${parseInt(postId)}`,
        status: "JOIN",
      };
    }

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
      if (Bungle) {
        var chatMessage = {
          type: "TALK",
          message: userData.message,
          roomId: `${postId}`,
          fileUrl: fileUrl,
        };
      } else if (Guest) {
        var chatMessage = {
          type: "TALK",
          message: userData.message,
          roomId: `${parseInt(postId)}`,
          fileUrl: fileUrl,
        };
      }
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
    if (Bungle) {
      var chatMessage = {
        type: "QUIT",
        roomId: `${postId}`,
      };
    } else if (Guest) {
      var chatMessage = {
        type: "QUIT",
        roomId: `${parseInt(postId)}`,
      };
    }
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
        `${SERVER_URL}/chat/message/file`,
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

  //채팅 상세 Modal Files Array
  const FilesArray = [
    "Lorem ipsum1",
    "Lorem ipsum2",
    "Lorem ipsum3",
    "Lorem ipsum4",
    "Lorem ipsum5",
  ];

  //채팅 상세 Modal Members Array
  const MembersArray = [];

  //채팅 상세 Modal Report Array
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
  const [chatPeople, setChatPeople] = useState([]);
  const [chatFiles, setChatFiles] = useState([]);

  const chatPerson = () => {
    axios({
      method: "get",
      url: `${SERVER_URL}/chat/message/userinfo/${postId}`,
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        console.log(response.data);
        setChatPeople(() => response.data);
        MembersArray.push(chatPeople);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const [fileData, setFileData] = () => {};
  const chatFile = () => {
    axios({
      method: "get",
      url: `${SERVER_URL}/chat/message/files/${postId}`,
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        console.log(response.data);
        setChatFiles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log("사람 : ", chatPeople);
  console.log("파일 : ", chatFiles);

  // Modal state

  //채팅 상세 모달 state
  const [chatModal, setChatModal] = useState(false);
  //신고하기 모달 state
  const [isModal, setIsModal] = useState(false);
  //신고 모달에서 해당 사항클릭 후 버튼 state
  const [isBtn, setIsBtn] = useState(false);
  //유저ID 값 담을 배열
  const [userId, setUserId] = useState();

  //신고하기 모달 state 관리
  const ModalOnClickHandler = () => {
    setIsModal(true);
  };
  //신고 모달에서 해당 사항클릭 후 버튼 state 관래
  const BtnOnClickHandler = () => {
    setIsBtn(!isBtn);
  };

  //Chatting Detail Modal 밖 영역 클릭 시 닫기
  const handleModal = (e) => {
    const clicked = e.target.closest(".modal-chat-content-wrap");
    if (clicked) return;
    else {
      setChatModal(false);
    }
  };

  console.log(
    "신고모달 : ",
    isModal,
    "신고하기 버튼: ",
    isBtn,
    "채팅 상세: ",
    chatModal
  );

  //신고하기
  const [report, setReport] = useState("");
  const [reportUserId, setReportUserId] = useState();
  console.log(report);
  const chatReportPerson = () => {
    setUserId();
    axios({
      method: "post",
      url: `${SERVER_URL}/user/report/${reportUserId}`,
      headers: {
        Authorization: token,
      },
      data: {
        history: report,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //userId 가져오는 함수
  function getInnerHTML(id) {
    const element = document.getElementById("userId");
    setReportUserId(id);
    console.log(id);
  }
  console.log("유저 Id: ", reportUserId);

  console.log(publicChats);

  //이전 메세지 불러오기
  const getMessage = () => {
    axios({
      method: "get",
      url: `${SERVER_URL}/chat/message/${postId}`,
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

  React.useEffect(() => {
    getMessage();
  }, []);

  //채팅 자동 스크롤
  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    const { scrollHeight, clientHeight } = messagesEndRef.current;
    messagesEndRef.current.scrollTop = scrollHeight - clientHeight;
    console.log(messagesEndRef);
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [publicChats]);

  return (
    <>
      <div id="chat-app">
        <div id="page-wrap">
          <HeaderWrap>
            <Logo src={IconMainLogo} style={{ visibility: "hidden" }} />
            <BackKey
              src={IconBackKey}
              onClick={() => {
                navigate("/main");
              }}
            />
            <PageTitle style={{ visibility: "hidden" }}></PageTitle>
            <HeadrIconsWrap>
              <IconMyLocation
                style={{ visibility: "hidden" }}
                src={IconMyPoint}
              />
              <IconNotification
                src={Notification}
                style={{ visibility: "hidden" }}
              />
              <IconSetting src={Setting} style={{ visibility: "hidden" }} />
              <IconHamburger
                src={Hamburger}
                onClick={() => {
                  setChatModal(!chatModal);
                  chatPerson();
                  chatFile();
                }}
              />
            </HeadrIconsWrap>
          </HeaderWrap>
          {chatModal && (
            <div className="modal-chat-wrapper">
              <div
                className="modal-chat-overlay"
                onClick={(e) => {
                  handleModal(e);
                }}
              >
                <div className="modal-chat-inner">
                  <div className="modal-chat-content-wrap">
                    <div className="modal-chat-content-file">
                      <div className="modal-chat-content-title">
                        <p>사진, 동영상</p>
                        <img src={IconForwardKey} alt="" />
                      </div>
                      <Swiper
                        style={{ marginLeft: "20px" }}
                        spaceBetween={10}
                        slidesPerView={3}
                      >
                        {chatFiles.map((item, index) => {
                          return (
                            <SwiperSlide key={index}>
                              <PostMemberCard>
                                {item.fileUrl.slice(-3) === "jpg" ||
                                item.fileUrl.slice(-3) === "png" ||
                                item.fileUrl.slice(-4) === "jpeg" ||
                                item.fileUrl.slice(-3) === "gif" ||
                                item.fileUrl.slice(-3) === "bmp" ||
                                item.fileUrl.slice(-3) === "img" ||
                                item.fileUrl.slice(-4) === "jfif" ||
                                item.fileUrl.slice(-3) === "JPG" ||
                                item.fileUrl.slice(-3) === "PNG" ||
                                item.fileUrl.slice(-4) === "JPEG" ||
                                item.fileUrl.slice(-3) === "GIF" ||
                                item.fileUrl.slice(-3) === "BMP" ||
                                item.fileUrl.slice(-3) === "IMG" ? (
                                  <>
                                    <PostMemberPicture src={item.fileUrl} />
                                  </>
                                ) : (
                                  <>
                                    <PostMemberVideo>
                                      <source src={item.fileUrl} />
                                    </PostMemberVideo>
                                  </>
                                )}
                              </PostMemberCard>
                            </SwiperSlide>
                          );
                        })}
                      </Swiper>
                    </div>
                    <div className="modal-divider"></div>
                    <div className="modal-member-list">
                      <p>번개 멤버</p>
                      {chatPeople.map((item, index) => {
                        return (
                          <div className="modal-member" key={index}>
                            <div className="modal-member-profile-img">
                              <img
                                className="modal-member-img"
                                src={item.profileUrl}
                                alt=""
                              />
                            </div>
                            <div
                              className="modal-member-profile-content"
                              onClick={() => {
                                getInnerHTML(item.userId);
                              }}
                            >
                              <p>{item.nickname}</p>
                              <img
                                className="modal-member-siren"
                                src={IconSiren}
                                alt=""
                                onClick={() => {
                                  ModalOnClickHandler();
                                }}
                              />
                              <p id="userId" style={{ visibility: "hidden" }}>
                                {item.userId}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="modal-footer">
                      <div
                        className="modal-footer-exit"
                        onClick={() => {
                          chatDisconnect();
                          navigate("/main");
                        }}
                      >
                        <img
                          className="modal-footer-moon"
                          src={IconMoon}
                          alt=""
                        />
                        <p>나가기</p>
                      </div>
                      <div className="modal-footer-">
                        <img
                          className="modal-footer-noti"
                          src={Notification}
                          alt=""
                        />
                      </div>
                    </div>
                    {isModal && (
                      <div className="modal-wrapper">
                        <div className="modal-overlay">
                          <div className="modal-inner">
                            <div className="modal-content-wrap">
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
                                        setReport(() => item.value);
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
                            <div
                              className="modal-content-wrap-report"
                              onClick={() => {
                                chatReportPerson();
                                setIsModal(!isModal);
                                setIsBtn(!isBtn);
                              }}
                            >
                              신고하기
                            </div>
                            <div className="modal-content-divider"></div>
                            <div
                              className="modal-content-wrap-exit"
                              onClick={() => {
                                setIsModal(!isModal);
                                setIsBtn(!isBtn);
                              }}
                            >
                              신고 닫기
                            </div>
                            <div className="modal-content-divider"></div>
                            {report && (
                              <div
                                className="modal-content-wrap-reselect"
                                onClick={() => {
                                  setIsBtn(!isBtn);
                                  setReport(undefined);
                                }}
                              >
                                다른 항목으로 신고하기
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="chat-wrap" ref={messagesEndRef}>
            {publicChats.map((chat, index) => (
              <div key={index}>
                {/* {console.log(chat)} */}
                {username !== chat.username ? (
                  <>
                    <div className="item">
                      <div className="profile">
                        <img src={chat.profileUrl} alt="" />
                      </div>
                      <div className="box">
                        <span className="nickname">{chat.sender}</span>
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
                            chat.fileUrl.slice(-4) === "jfif" ||
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
                        <span className="mynickname">{chat.sender}</span>
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
                            chat.fileUrl.slice(-4) === "jfif" ||
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

  // return (
  //   <div>
  //     {/* <Chat /> */}
  //     <ChatTest Bungle={Bungle} />
  //   </div>
  // );
}

export default ChattingRoom;
