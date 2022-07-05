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
import Post from "./pages/Post";
import MyPageSetting from "./pages/MyPageSetting";
import MyPageRecent from "./pages/MyPageRecent";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
        <Route path="/post" element={<Post />} />
        <Route path="/mypagesetting" element={<MyPageSetting />} />
        <Route path="/mypagerecent" element={<MyPageRecent />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
