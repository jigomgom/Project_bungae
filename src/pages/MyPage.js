import React from "react";
//CSS
import "../styles/MyPage.css";
//Components
import Divider from "../components/Divider";
//img
import defaultImg from "../assets/defaultImg.jpg";
import lighteningImg from "../assets/icon-lightening.jpg";
import tempImg from "../assets/icon-temp.svg";
function MyPage() {
  return (
    <div>
      <div className="mypage-content-wrap">
        <div className="mypage-profile-main">
          <div className="mypage-profile-img">
            <img src={defaultImg} alt="" />
          </div>
          <div className="mypage-profile-content">
            <div className="mypage-profile-title">닉네임</div>
            <div className="mypage-profile-desc">자기소개를 입력해주세요.</div>
            <div className="mypage-profile-detail">
              <img src={lighteningImg} alt="" />
              <span>25회 참여</span>
              <img src={tempImg} alt="" />
              <span>80°C</span>
            </div>
          </div>
        </div>
        <button className="mypage-profile-btn">프로필 수정</button>
      </div>
      <Divider />
      <div className="mypage-selectbar-list">
        <div className="mypage-selectbar">Lorem ipsum</div>
        <div className="mypage-selectbar">Lorem ipsum</div>
      </div>
      <Divider />
      <div className="mypage-selectbar-list">
        <div className="mypage-selectbar">Lorem ipsum</div>
        <div className="mypage-selectbar">Lorem ipsum</div>
        <div className="mypage-selectbar">Lorem ipsum</div>
      </div>
    </div>
  );
}

export default MyPage;
