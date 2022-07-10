//Libraries
import React from "react";
import { Routes, Route } from "react-router-dom";
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

import ProfileSetting from "./pages/ProfileSetting";
import MyLikeBung from "./pages/MyLikeBung";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatList from "./pages/ChatList";
import ChattingRoom from "./pages/ChattingRoom";
// Test
import Test from "./pages/Test";
import ChatTest1 from "./pages/ChatTest1";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/tagsearch" element={<TagSearch />} />
        <Route path="/categorysearch" element={<CategorySearch />} />
        {/* MyPage */}
        <Route path="/mypage" element={<MyPage />} />

        <Route path="/chatlist" element={<ChatList />} />
        <Route path="/detailpost" element={<DetailPost />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/profilesetting" element={<ProfileSetting />} />
        <Route path="/mylikebung" element={<MyLikeBung />} />
        <Route path="/chat" element={<ChattingRoom />} />
        {/* Test */}
        <Route path="/test" element={<Test />} />
        <Route path="/chattest" element={<ChatTest1 />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
