import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//Img
import profileSetImg from "../assets/icon-profilesetting.svg";
//CSS
import "../styles/ProfileSetting.css";

//icon
import IconBackKey from "../assets/icon-left-arrow.svg";

function MyPageSetting() {
  //프로필 미리보기 state
  const navigate = useNavigate();
  const [profile, setProfile] = React.useState(profileSetImg);
  //프로필 파일 객체
  const [file, setFile] = React.useState();
  const fileInput = React.useRef(null);

  //미리보기, 파일
  const onChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      //업로드 취소할 시
      setProfile(profileSetImg);
      return;
    }
    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        console.log(reader);
        setProfile(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  console.log(file);

  return (
    <div>
      {/* <div className="profile-header-wrap">
        <img className="profile-header-backkey" src={IconBackKey} alt=""/>
        <h3 className="profile-header-title">
          나의 벙글
        </h3>
      </div> */}
      <div className="profile-setting-wrap">
        {/* 지용 헤더 수정 */}
        <div className="profile-setting-done">
          <img
            style={{
              cursor: "pointer",
              marginLeft: "5px",
              marginTop: "10px",
              width: "11.67px",
              height: "19.8px",
            }}
            src={IconBackKey}
            alt=""
            onClick={() => {
              navigate("/mypage");
            }}
          />
          <span>완료</span>
        </div>
        <div className="profile-setting-profile">
          <input
            type="file"
            style={{ display: "none" }}
            accept="image/*"
            name="profile_img"
            onChange={onChange}
            ref={fileInput}
          />
          <img
            src={profile}
            alt=""
            style={{ alignItems: "center", cursor: "pointer" }}
            onClick={() => {
              fileInput.current.click();
            }}
          />
        </div>
        <div className="profile-setting-form">
          <div className="profile-setting-form-nickname">
            <label className="profile-setting-form-title">닉네임</label>
            <input
              className="profile-setting-form-input"
              type="search"
              placeholder="닉네임을 입력해주세요."
            />
          </div>
          <div className="profile-setting-form-desc">
            <label className="profile-setting-form-title">자기소개</label>
            <input
              className="profile-setting-form-input"
              type="search"
              placeholder="자기소개를 입력해주세요."
            />
          </div>
          {/* <button className="profile-setting-form-btn">가입하기</button> */}
        </div>
      </div>
    </div>
  );
}

export default MyPageSetting;
