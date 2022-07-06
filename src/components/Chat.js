import React, { useEffect, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";

var stompClient = null;
const ChatRoom = () => {
  const [privateChats, setPrivateChats] = useState(new Map());
  const [publicChats, setPublicChats] = useState([]);
  const [tab, setTab] = useState("CHATROOM");
  const [userData, setUserData] = useState({
    type: "",
    nickName: "",
    receivername: "",
    roomId: "",
    connected: false,
    message: "",
  });
  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const connect = () => {
    let Sock = new SockJS("http://13.125.151.93/ws/chat");
    stompClient = over(Sock);
    console.log(stompClient);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe(
      "/topic/chat/room/3ea66a21-727f-4f8a-bdb2-bf1660950c9b",
      onMessageReceived
    );
    // stompClient.subscribe('/user/'+userData.nickName+'/private', onPrivateMessage);
    userJoin();
  };

  const userJoin = () => {
    console.log("Test user Join");
    var chatMessage = {
      type: "ENTER",
      nickName: userData.nickName,
      roomId: "3ea66a21-727f-4f8a-bdb2-bf1660950c9b",
      status: "JOIN",
    };
    stompClient.send("/app/chat/message", {}, JSON.stringify(chatMessage));
  };

  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "JOIN":
        console.log("switch JOIN");
        if (!privateChats.get(payloadData.nickName)) {
          privateChats.set(payloadData.nickName, []);
          setPrivateChats(new Map(privateChats));
        }
        break;
      case "MESSAGE":
        console.log("switch Message");
        publicChats.push(payloadData);
        setPublicChats([...publicChats]);
        break;
    }
  };

  const onPrivateMessage = (payload) => {
    console.log(payload);
    var payloadData = JSON.parse(payload.body);
    if (privateChats.get(payloadData.nickName)) {
      privateChats.get(payloadData.nickName).push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list = [];
      list.push(payloadData);
      privateChats.set(payloadData.nickName, list);
      setPrivateChats(new Map(privateChats));
    }
  };

  const onError = (err) => {
    console.log("Test ", err);
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };
  const sendValue = () => {
    console.log("Test user send");
    if (stompClient) {
      var chatMessage = {
        type: "TALK",
        nickName: userData.nickName,
        message: userData.message,
        roomId: "3ea66a21-727f-4f8a-bdb2-bf1660950c9b",
        status: "MESSAGE",
      };
      console.log(chatMessage);
      stompClient.send("/app/chat/message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const sendPrivateValue = () => {
    if (stompClient) {
      var chatMessage = {
        nickName: userData.nickName,
        receiverName: tab,
        message: userData.message,
        status: "MESSAGE",
      };

      if (userData.nickName !== tab) {
        privateChats.get(tab).push(chatMessage);
        setPrivateChats(new Map(privateChats));
      }
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const handlenickName = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, nickName: value });
  };

  const registerUser = () => {
    connect();
  };
  return (
    <div className="container">
      {userData.connected ? (
        <div className="chat-box">
          <div className="member-list">
            <ul>
              <li
                onClick={() => {
                  setTab("CHATROOM");
                }}
                className={`member ${tab === "CHATROOM" && "active"}`}
              >
                Chatroom
              </li>
              {[...privateChats.keys()].map((name, index) => (
                <li
                  onClick={() => {
                    setTab(name);
                  }}
                  className={`member ${tab === name && "active"}`}
                  key={index}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
          {tab === "CHATROOM" && (
            <div className="chat-content">
              <ul className="chat-messages">
                {publicChats.map((chat, index) => (
                  <li
                    className={`message ${
                      chat.nickName === userData.nickName && "self"
                    }`}
                    key={index}
                  >
                    {chat.nickName !== userData.nickName && (
                      <div className="avatar">{chat.nickName}</div>
                    )}
                    <div className="message-data">{chat.message}</div>
                    {chat.nickName === userData.nickName && (
                      <div className="avatar self">{chat.nickName}</div>
                    )}
                  </li>
                ))}
              </ul>

              <div className="send-message">
                <input
                  type="text"
                  className="input-message"
                  placeholder="enter the message"
                  value={userData.message}
                  onChange={handleMessage}
                />
                <button
                  type="button"
                  className="send-button"
                  onClick={sendValue}
                >
                  send
                </button>
              </div>
            </div>
          )}
          {tab !== "CHATROOM" && (
            <div className="chat-content">
              <ul className="chat-messages">
                {[...privateChats.get(tab)].map((chat, index) => (
                  <li
                    className={`message ${
                      chat.nickName === userData.nickName && "self"
                    }`}
                    key={index}
                  >
                    {chat.nickName !== userData.nickName && (
                      <div className="avatar">{chat.nickName}</div>
                    )}
                    <div className="message-data">{chat.message}</div>
                    {chat.nickName === userData.nickName && (
                      <div className="avatar self">{chat.nickName}</div>
                    )}
                  </li>
                ))}
              </ul>

              <div className="send-message">
                <input
                  type="text"
                  className="input-message"
                  placeholder="enter the message"
                  value={userData.message}
                  onChange={handleMessage}
                />
                <button
                  type="button"
                  className="send-button"
                  onClick={sendPrivateValue}
                >
                  send
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="register">
          <input
            id="user-name"
            placeholder="Enter your name"
            name="nickName"
            value={userData.nickName}
            onChange={handlenickName}
            margin="normal"
          />
          <button type="button" onClick={registerUser}>
            connect
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
