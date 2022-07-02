import React from "react";
//Img
import defaultImg from "../assets/defaultImg.jpg";
import cameraImg from "../assets/icon-camera.svg";
//CSS
import "../styles/MyPageSetting.css";
//Components
import Divider from "../components/Divider";

function MyPageSetting() {
  return (
    <div>
      <div className="mypage-setting-wrap">
        <div className="mypage-setting-done">
          <span>취소</span>
          <span>완료</span>
        </div>
        <div className="mypage-setting-profile">
          <img src={defaultImg} alt="" />
          <div className="mypage-setting-profile-btn">
            <div className="btn1" />
            <img src={cameraImg} alt="" className="btn2" />
          </div>
        </div>
        <div className="mypage-setting-desc">
          <label for="mypage-desc" className="mypage-setting-desc-label">
            자기소개
          </label>
          <input
            id="mypage-desc"
            className="mypage-setting-desc-input"
            type="search"
            placeholder="자기소개를 입력해주세요."
          />
        </div>
      </div>
      <Divider />
      <div className="mypage-setting-option-list">
        <div className="mypage-setting-option">
          <p className="mypage-setting-option-title">Lorem ipsum</p>
          <p className="mypage-setting-option-desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="mypage-setting-option">
          <p className="mypage-setting-option-title">Lorem ipsum</p>
          <p className="mypage-setting-option-desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="mypage-setting-option">
          <p className="mypage-setting-option-title">Lorem ipsum</p>
          <p className="mypage-setting-option-desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MyPageSetting;
