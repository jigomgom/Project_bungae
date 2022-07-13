import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { editUserProfile } from "../redux/modules/BungleSlice";
import { useSelector } from "react-redux";
//Img
import profileSetImg from "../assets/icon-profilesetting.svg";
//CSS
import "../styles/ProfileSetting.css";

//icon
import IconBackKey from "../assets/icon-left-arrow.svg";

function MyPageSetting() {
  const userProfileInfo = useSelector( state => state.Bungle.userProfile);
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
  // console.log(file);

  const dispatch = useDispatch();

  const nickName_Ref = useRef();
  const intro_Ref = useRef();

  const editUserProfileComplete = () => {
    console.log( nickName_Ref.current.value );
    console.log( intro_Ref.current.value );
    console.log( file );
    const profileDto = {
      nickName: nickName_Ref.current.value,
      intro: intro_Ref.current.value
    };

    const formData = new FormData();
    formData.append(
      "profileDto",
      new Blob([JSON.stringify(profileDto, { contentType: "application/json" })], {
        type: "application/json",
      })
    );
    if( file === undefined ){
      formData.append("profileImg ", "");
    }else{
      formData.append("profileImg ", file);
    }

    dispatch( editUserProfile( formData ) );
    navigate("/mypage");
  };

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
          <span onClick={editUserProfileComplete}>완료</span>
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
            src={ userProfileInfo.profileUrl ? userProfileInfo.profileUrl : profile}
            alt=""
            style={{ objectFit:"cover", alignItems: "center", cursor: "pointer" }}
            onClick={() => {
              fileInput.current.click();
            }}
          />
        </div>
        <div className="profile-setting-form">
          <div className="profile-setting-form-nickname">
            <label className="profile-setting-form-title">{userProfileInfo.nickName ? userProfileInfo.nickName : "닉네임" }</label>
            <input
              ref={nickName_Ref}
              className="profile-setting-form-input"
              type="search"
              placeholder="닉네임을 입력해주세요."
            />
          </div>
          <div className="profile-setting-form-desc">
            <label className="profile-setting-form-title">{ userProfileInfo.intro ? userProfileInfo.intro: "자기소개"}</label>
            <input
              ref={intro_Ref}
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
