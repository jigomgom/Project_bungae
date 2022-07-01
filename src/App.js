import React from "react";
import "./App.css"
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import TagSearch from "./pages/TagSearch";
import CategorySearch from "./pages/CategorySearch";
import Main from "./pages/Main";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";

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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
