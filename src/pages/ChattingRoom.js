import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux"; 
import { getChatClient } from "../redux/modules/BungleSlice";

import AxiosAPI from "../customapi/CustomAxios";
import moment from "moment";
import { getCookie, setCookie } from "../customapi/CustomCookie";

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

import IconHighTemp from "../assets/icon-manner-high.svg";
import IconMiddleTemp from "../assets/icon-manner-middle.svg";
import IconLowTemp from "../assets/icon-manner-low.svg";

import IconLightening from "../assets/icon-lightening.svg";

let client = null;
function ChattingRoom({ setRealTimeChat }) {
  // SERVER URL
  // const SERVER_URL = "http://3.37.61.25";
  const SERVER_URL = "https://gutner.shop"; //?????????
  // const SERVER_URL = "https://meeting-platform.shop"; //?????????
  const dispatch = useDispatch();
  // navigate
  const navigate = useNavigate();

  // ????????????
  const BungleOnwer = useSelector((state) => state.Bungle.isOwner);
  // ?????? ?????? ?????? ??? ID
  const Bungle = useSelector((state) => state.Bungle.OnwerPostId);
  // ????????? ?????? ??? ID
  // const Guest = useSelector((state) => state.Bungle.detailBungle.postId);
  const userProfileInfo = useSelector((state) => state.Bungle.userProfile);
  // console.log(userProfileInfo);
  const params = useParams();
  // if (Bungle) {
  //   console.log("PostID ", Bungle);
  // }
  const token = localStorage.getItem("login-token");
  const PK = Number( localStorage.getItem("userId") );
  let postId;
  const Guest = params.postId;

  if (Bungle) {
    postId = Bungle;
  } else {
    postId = String(Guest);
  } // console.log(parseInt(postId)); }
  console.log("OnwerPostId ", Bungle, "userId ", PK, "Guest( params.postId ) ", Guest, "Change Post ID ", postId);
  // const { postID } = useParams();

  const userPersonalId = Number(localStorage.getItem("userId"));

  // console.log(token);
  const [publicChats, setPublicChats] = useState([]);
  const [notiChats, setNotiChats] = useState({});
  const [userData, setUserData] = useState({
    type: "",
    nickName: "",
    receivername: "",
    roomId: "",
    connected: false,
    message: "",
  });

  useEffect(() => {
    if (postId > 0 || Number(postId) > 0) {
      connect();
    }
  }, [postId]); // postId defendency ??????

  const connect = () => {
    console.log("Connect ??????");
    let sock = new SockJS(`${SERVER_URL}/wss/chat`);
    client = over(sock);
    client.connect({ token }, onConnected, onError);
  };

  const onError = (err) => {
    console.log("Test ", err);
  };

  const onConnected = () => {
    dispatch( getChatClient( { client, Guest } ) );
    setUserData({ ...userData, connected: true });
    if (Bungle) {
      console.log("?????? connect");
      client.subscribe(`/sub/chat/room/${postId}`, onMessageReceived);
    } else if (Guest) {
      console.log("????????? connect");
      client.subscribe(`/sub/chat/room/${parseInt(postId)}`, onMessageReceived);
    }
    userJoin();
  };
  // console.log(userData);

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
    
    client.send("/pub/chat/message", { PK }, JSON.stringify(chatMessage));
    console.log("Test user Subscribe");
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const sendValue = async () => {
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
      // console.log(chatMessage);
      client.send("/pub/chat/message", { PK }, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
      setFileUrl(null);
    }
  };

  const onMessageReceived = (payload) => {
    
    var payloadData = JSON.parse(payload.body);
    console.log( payloadData );
    if (
      payloadData.type === "TALK" ||
      payloadData.type === "ENTER" ||
      payloadData.type === "QUIT"
    ) {
      console.log("switch Message");
      publicChats.push(payloadData);
      setNotiChats(() => payloadData);
      setPublicChats([...publicChats]);
    }
  };

  //????????? ?????? ??????
  // const { fireNotificationWithTimeout } = usePushNotification();
  // useEffect(() => {
  //   fireNotificationWithTimeout("Babble ?????? ?????????", 5000, {
  //     body: `${notiChats.sender}: ${notiChats.message}`,
  //   });
  // }, [notiChats]);

  // const realTimeChat = () => {
  //   setRealTimeChat(notiChats);
  //   console.log("??????!!!");
  // };
  // useState(() => {
  //   realTimeChat();
  // }, [notiChats]);

  // console.log(
  //   "????????? : ",
  //   notiChats.sender,
  //   "//",
  //   "?????????: ",
  //   notiChats.message
  // );
  //Notification Hook
  // const { fireNotificationWithTimeout } = usePushNotification();
  // fireNotificationWithTimeout("Bungle ?????? ?????????", 5000, {
  //   body: `${notiChats.sender}: ${notiChats.message}`,
  // });

  //?????? ?????????
  let chattingDate = [];

  let ampm = "";
  let hour;
  let minutes;

  for (let i = 0; i < publicChats.length; i++) {
    hour = publicChats[i].createdAt.split(",")[3];
    minutes = publicChats[i].createdAt.split(",")[4];
    if (hour > 12) {
      ampm = "??????";
      hour = hour - 12;
      chattingDate.push(ampm + " " + hour + ":" + minutes);
    } else {
      ampm = "??????";
      hour = hour;
      chattingDate.push(ampm + " " + hour + ":" + minutes);
    }
  }
  // console.log("publicChats: ", publicChats);

  //Disconnect
  const chatDisconnect = () => {
    console.log("Chat disconnect");
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
    client.send("/pub/chat/message", { PK }, JSON.stringify(chatMessage));
    client.disconnect(function () {
      alert("See you next time!");
    });
  };

  //unsub
  // const chatUnsubscribe = () => {
  //   if (Bungle) {
  //     let subscription = client.subscribe(
  //       `/sub/chat/room/${postId}`,
  //       onMessageReceived
  //     );
  //     subscription.unsubscribe();
  //     navigate("/main");
  //   } else if (Guest) {
  //     let subscription = client.subscribe(
  //       `/sub/chat/room/${postId}`,
  //       onMessageReceived
  //     );
  //     subscription.unsubscribe();
  //     navigate("/main");
  //   }
  // };

  //?????????
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      sendValue();
    }
  };

  //????????? ?????????
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
  // console.log(isFile);

  const chatImg = async () => {
    if (fileUrl) {
      setFileUrl(null);
      console.log(fileUrl);
    } else {
      const formData = new FormData();
      formData.append("file ", isFile);
      const response = await AxiosAPI.post(
        `/chat/message/file`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // Authorization: token,
          },
        }
      );
      setFileUrl(response.data);
    }
    console.log(fileUrl);
  };
  // console.log(fileUrl);

  useEffect(() => {
    // console.log( isFile );
    if (isFile) {
      chatImg();
    }
  }, [isFile]);

  //?????? ?????? Modal Files Array
  const FilesArray = [
    "Lorem ipsum1",
    "Lorem ipsum2",
    "Lorem ipsum3",
    "Lorem ipsum4",
    "Lorem ipsum5",
  ];

  //?????? ?????? Modal Members Array
  const MembersArray = [];

  //?????? ?????? Modal Report Array
  const ReportArray = [
    { key: 1, value: "????????? ?????? ??? ??????" },
    { key: 2, value: "????????? ????????? ????????????" },
    { key: 3, value: "?????????/???????????? ?????? ??? ??????" },
    { key: 4, value: "??????/??????/??????" },
    { key: 5, value: "??????/??????" },
    { key: 6, value: "??????/??????/??????" },
    { key: 7, value: "??????/????????? ?????? ??? ????????????" },
  ];

  //?????? ????????? ?????? ??????, ??????/????????? ?????? ????????????
  const [chatPeople, setChatPeople] = useState([]);
  const [chatFiles, setChatFiles] = useState([]);

  const chatPerson = () => {
    AxiosAPI({
      method: "get",
      url: `/chat/message/userinfo/${postId}`,
      // headers: {
      //   Authorization: token,
      // },
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
    AxiosAPI({
      method: "get",
      url: `/chat/message/files/${postId}`,
      // headers: {
      //   Authorization: token,
      // },
    })
      .then((response) => {
        console.log(response.data);
        setChatFiles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // console.log("?????? : ", chatPeople);
  // console.log("?????? : ", chatFiles);

  // Modal state

  //?????? ?????? ?????? state
  const [chatModal, setChatModal] = useState(false);
  //???????????? ?????? state
  const [isModal, setIsModal] = useState(false);
  //?????? ???????????? ?????? ???????????? ??? ?????? state
  const [isBtn, setIsBtn] = useState(false);
  //?????? ?????? ????????? ?????? state
  const [profileModal, setProfileModal] = useState(false);

  //???????????? ?????? state ??????
  const ModalOnClickHandler = () => {
    setIsModal(true);
  };
  //?????? ????????? ?????? state ??????
  const ModalProfileOnClickHandler = () => {
    setProfileModal(() => true);
  };
  //?????? ???????????? ?????? ???????????? ??? ?????? state ??????
  // const BtnOnClickHandler = () => {
  //   setIsBtn(!isBtn);
  // };

  //Chatting Detail Modal ??? ?????? ?????? ??? ??????
  const handleModal = (e) => {
    const clicked = e.target.closest(".modal-chat-content-wrap");
    if (clicked) return;
    else {
      setChatModal(false);
    }
  };

  //Report Modal ??? ?????? ?????? ??? ??????
  const handleReportModal = (e) => {
    const clicked = e.target.closest(".modal-content-wrap");
    if (clicked) return;
    else {
      setIsModal(false);
    }
  };

  //Detail Profile Modal ??? ?????? ?????? ??? ??????
  const handleDetailProfile = (e) => {
    const clicked = e.target.closest(".modal-content-wrap-profile");
    if (clicked) return;
    else {
      setProfileModal(false);
    }
  };

  // console.log(
  //   "???????????? : ",
  //   isModal,
  //   "???????????? ??????: ",
  //   isBtn,
  //   "?????? ??????: ",
  //   chatModal
  // );

  //????????????
  const [report, setReport] = useState("");
  const [reportUserId, setReportUserId] = useState();
  console.log(report);
  const chatReportPerson = () => {
    AxiosAPI({
      method: "post",
      url: `/user/report/${reportUserId}`,
      // headers: {
      //   Authorization: token,
      // },
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
  //?????? ????????? ?????? ???????????? ??????

  //userId ???????????? ??????
  function getInnerHTML(id) {
    setReportUserId(() => id);
    console.log(id);
  }
  console.log("?????? ?????? Id: ", reportUserId);

  //????????? ?????? ??????
  const [chatProfile, setChatProfile] = useState({});
  const detailProfile = () => {
    AxiosAPI({
      method: "get",
      url: `/chat/details/${reportUserId}`,
      // headers: {
      //   Authorization: token,
      // },
    })
      .then((response) => {
        setChatProfile(() => response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    console.log( "reportUser ", reportUserId );
    if (reportUserId) {
      detailProfile();
    }
  }, [reportUserId]);

  //?????? ????????? ????????????
  const [beforeChat, setBeforeChat] = useState([]);

  //?????? ????????? ??????
  let beforeChattingDate = [];
  let beforeAmpm = "";
  let beforeHour;
  let beforeMinutes;
  for (let i = 0; i < beforeChat.length; i++) {
    beforeHour = beforeChat[i].createdAt.split(",")[3];
    beforeMinutes = beforeChat[i].createdAt.split(",")[4];
    if (beforeHour > 12) {
      beforeAmpm = "??????";
      beforeHour = beforeHour - 12;
      beforeChattingDate.push(
        beforeAmpm + " " + beforeHour + ":" + beforeMinutes
      );
    } else {
      beforeAmpm = "??????";
      beforeHour = beforeHour;
      beforeChattingDate.push(
        beforeAmpm + " " + beforeHour + ":" + beforeMinutes
      );
    }
  }

  const getMessage = () => {
    AxiosAPI({
      method: "get",
      url: `/chat/message/${postId}`,
      // headers: {
      //   Authorization: token,
      // },
    })
      .then((response) => {
        console.log(response);
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].type === "TALK") {
            setBeforeChat(response.data);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // console.log("??????: ", beforeChat);

  useEffect(() => {
    // getMessage undefined ?????? ???
    if (postId > 0) {
      getMessage();
    }
  }, [postId]);

  //?????? ????????? ??? ??????
  const [outOwner, setOutOwner] = useState(false);

  const handleOutOwner = () => {
    for (let i = 0; i < publicChats.length; i++) {
      if (publicChats[i].quitOwner === true) {
        console.log("????????? ?????????: ", publicChats[i].quitOwner);
        setOutOwner(() => true);
      }
    }
  };
  console.log("?????? ?????????? : ", outOwner);

  useEffect(() => {
    handleOutOwner();
  }, [publicChats]);

  //?????? ?????? ?????????
  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    const { scrollHeight, clientHeight } = messagesEndRef.current;
    messagesEndRef.current.scrollTop = scrollHeight - clientHeight;
    // console.log(messagesEndRef);
  };

  useEffect(
    () => {
      scrollToBottom();
    },
    [publicChats],
    [beforeChat]
  );

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
                setOutOwner(() => false);
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
                        <p>??????, ?????????</p>
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
                      <p>?????? ??????</p>
                      {chatPeople.map((item, index) => {
                        return (
                          <div
                            className="modal-member"
                            key={index}
                            onClick={() => {
                              getInnerHTML(item.userId);
                            }}
                          >
                            <div className="modal-member-profile-img">
                              <img
                                className="modal-member-img"
                                src={item.profileUrl}
                                alt=""
                                onClick={() => {
                                  ModalProfileOnClickHandler();
                                }}
                              />
                            </div>
                            <div className="modal-member-profile-content">
                              <p
                                onClick={() => {
                                  ModalProfileOnClickHandler();
                                }}
                              >
                                {item.nickname}
                              </p>
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
                        <p>?????????</p>
                      </div>
                      <div className="modal-footer-">
                        <img
                          className="modal-footer-noti"
                          src={Notification}
                          alt=""
                        />
                      </div>
                    </div>
                    {profileModal && (
                      <div className="modal-wrapper-profile">
                        <div
                          className="modal-overlay-profile"
                          onClick={(e) => {
                            handleDetailProfile(e);
                          }}
                        >
                          <div className="modal-inner-profile">
                            <div className="modal-content-wrap-profile">
                              <div className="modal-content-title-profile">
                                <img src={chatProfile.profileUrl} alt="" />
                                <p>{chatProfile.nickname}</p>
                                <div className="modal-content-profile-detail">
                                  <img
                                    src={IconLightening}
                                    alt=""
                                    className="icon-ligtening"
                                  ></img>
                                  <span>{chatProfile.bungCount} ??????</span>
                                  <img
                                    src={
                                      chatProfile.mannerTemp >= 50
                                        ? IconHighTemp
                                        : chatProfile.mannerTemp >= 25
                                        ? IconMiddleTemp
                                        : IconLowTemp
                                    }
                                    alt=""
                                  ></img>
                                  <span>{chatProfile.mannerTemp}??C</span>
                                </div>
                                <div className="modal-content-profile-intro">
                                  <p>{chatProfile.intro}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {isModal && (
                      <div className="modal-wrapper">
                        <div
                          className="modal-overlay"
                          onClick={(e) => {
                            handleReportModal(e);
                          }}
                        >
                          <div className="modal-inner">
                            <div className="modal-content-wrap">
                              <div className="modal-content-title">
                                <p>????????????</p>
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
                                        setIsBtn(true);
                                      }}
                                    >
                                      {item.value}
                                    </div>
                                  </>
                                );
                              })}
                            </div>
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
                                      ????????????
                                    </div>
                                  </div>
                                </div>
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
            {beforeChat.map((chat, index) => (
              <div key={index}>
                {/* {console.log(chat)} */}
                {/* {chat.type === "ENTER" && <div>{chat.message}</div>} */}
                {chat.type === "TALK" ? (
                  <>
                    {userPersonalId !== chat.userId ? (
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
                                {/* {console.log(chat.fileUrl.data)} */}
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
                              {beforeChattingDate[index]}
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
                            {/* <span className="mynickname">{chat.sender}</span> */}
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
                            <span className="time" key={index}>
                              {beforeChattingDate[index]}
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                ) : null}
              </div>
            ))}
            {publicChats.map((chat, index) => (
              <div key={index}>
                {/* {console.log(chat)} */}
                {/* {chat.type === "ENTER" && <div>{chat.message}</div>} */}
                {chat.type === "TALK" ? (
                  <>
                    {userPersonalId !== chat.userId ? (
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
                            {/* <span className="mynickname">{chat.sender}</span> */}
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
                  </>
                ) : (
                  <>
                    <p className="msg-noti">{chat.message}</p>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="chatting-footer-wrap">
            {outOwner === true ? null : (
              <>
                <div className="chatting-footer">
                  <div className="chatting-footer-icon">
                    <label className="input-file-button" htmlFor="fileUpload">
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
                      placeholder={"????????? ??????"}
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
              </>
            )}
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
