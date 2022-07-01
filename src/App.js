import React from "react";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import TagSearch from "./pages/TagSearch";
import CategorySearch from "./pages/CategorySearch";
import Main from "./pages/Main";
import MyPage from "./pages/MyPage";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/tagsearch" element={<TagSearch />} />
        <Route path="/categorysearch" element={<CategorySearch />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </div>
  );
}

export default App;
