import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import { getUserProfile, myLikeBungleList } from "../redux/modules/BungleSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// Library

//CSS
import "../styles/MyPage.css";
//Components
import Divider from "../components/Divider";
//img
import defaultImg from "../assets/defaultImg.jpg";
import lighteningImg from "../assets/icon-lightening.jpg";
import tempImg from "../assets/icon-temp.svg";

function MyPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ isLoad, setIsLoad ] = useState( true );
  const userProfileInfo = useSelector( state => state.Bungle.userProfile);
  console.log( userProfileInfo );

  const myLikeBungleClickHandler = () => {
    dispatch( myLikeBungleList() );
    navigate("/mylikebung");
  };
  
  useEffect(()=>{
    if( isLoad ){
      dispatch( getUserProfile() );
      setTimeout(()=>{setIsLoad( false )}, 150);
    }
  }, []);

  return (
    <div>
      <div className="mypage-content-wrap">
        <div className="mypage-profile-main">
          <div className="mypage-profile-img">
            <img style={{ objectFit:"cover" }}src={ userProfileInfo.profileUrl ? userProfileInfo.profileUrl : defaultImg} alt="" />
          </div>
          <div className="mypage-profile-content">
            <div className="mypage-profile-title">{userProfileInfo.nickName ? userProfileInfo.nickName : "닉네임"}</div>
            <div className="mypage-profile-desc">{ userProfileInfo.intro ? userProfileInfo.intro : "자기소개를 입력해주세요."}</div>
            <div className="mypage-profile-detail">
              <img src={lighteningImg} alt="" />
              <span>25회 참여</span>
              <img src={tempImg} alt="" />
              <span>80°C</span>
            </div>
          </div>
        </div>
        <button className="mypage-profile-btn" onClick={()=>{navigate("/profilesetting")}}>프로필 수정</button>
      </div>
      <Divider />
      {/* 지용 리스트들 변경 */}
      <div className="mypage-selectbar-list">
        <div className="mypage-selectbar" onClick={myLikeBungleClickHandler}>내가 찜한 벙글</div>
        <div className="mypage-selectbar">내가 작성한 벙글</div>
      </div>
      <Divider />
      <div className="mypage-selectbar-list">
        <div className="mypage-selectbar">비매너 유저 신고</div>
        <div className="mypage-selectbar">나의 신고 내역</div>
        {/* <div className="mypage-selectbar">Lorem ipsum</div> */}
      </div>
    </div>
  );
}

export default MyPage;
