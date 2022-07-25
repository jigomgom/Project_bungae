//Libraries
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// Notification Hook
// import usePushNotification from "./hook/usePushNotification";
//CSS
import "./App.css";
//Pages
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import TagSearch from "./pages/TagSearch";
import CategorySearch from "./pages/CategorySearch";
import Main from "./pages/Main";
import MyPage from "./pages/MyPage";

import DetailPost from "./pages/DetailPost";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";

import ProfileSetting from "./pages/ProfileSetting";
import MyLikeBung from "./pages/MyLikeBung";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatList from "./pages/ChatList";
import ChattingRoom from "./pages/ChattingRoom";
import Map from "./pages/Map";
// Test

function App() {
  // 실시간 채팅 state
  // const [realTimeChat, setRealTimeChat] = useState({});

  //실시간 채팅 알림
  // const { fireNotificationWithTimeout } = usePushNotification();
  // useEffect(() => {
  //   fireNotificationWithTimeout("Babble 채팅 메시지", 5000, {
  //     body: `${realTimeChat.sender}: ${realTimeChat.message}`,
  //   });
  // }, [realTimeChat]);

  return (
    <div className="App">
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        {/* social login redirection URL */}
        <Route path="/oauth" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/tagsearch" element={<TagSearch />} />
        <Route path="/categorysearch/:category" element={<CategorySearch />} />
        {/* MyPage */}
        <Route path="/mypage" element={<MyPage />} />

        <Route path="/chatlist" element={<ChatList />} />
        <Route path="/detailpost/:postId" element={<DetailPost />} />
        <Route path="/map/detailpost/:postId" element={<DetailPost />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/editpost" element={<EditPost />} />
        <Route path="/profilesetting" element={<ProfileSetting />} />
        <Route path="/mylikebung" element={<MyLikeBung />} />
        <Route path="/chat" element={<ChattingRoom />} />
        <Route path="/chat/:postId" element={<ChattingRoom />} />
        <Route path="/map" element={<Map />} />
        {/* Test */}
        {/* <Route path="/test" element={<Test />} /> */}
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
