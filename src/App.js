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
import ChatList from "./pages/ChatList";
import ChattingRoom from "./pages/ChattingRoom";
import Map from "./pages/Map";

import OpenViduSettings from "./components/videos/OpenViduSettings";

import LoadingLogin from "./components/LoadingLogin";
import Notification from "./pages/Notification";

function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/loading" element={<LoadingLogin/>} />
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
        {/* 알림 */}
        <Route path="notification" element={<Notification />} />
        {/* Test */}
        <Route path="/videochat" element={<OpenViduSettings />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
