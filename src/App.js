//Libraries
import React from "react";
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
//test
import TermsConditions from "./pages/TermsConditions";

// 404 Not found
import NotFound from "./components/NotFound";
// Private Routes
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<PrivateRoutes />}>
          {/* social login redirection URL */}
          {/* <Route path="/oauth" element={<Login />} /> */}
          <Route path="/main" element={<Main />} />
          <Route path="/tagsearch" element={<TagSearch />} />
          <Route
            path="/categorysearch/:category"
            element={<CategorySearch />}
          />
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
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="/oauth" element={<LoadingLogin />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
        <Route path="/termsconditions" element={<TermsConditions />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
