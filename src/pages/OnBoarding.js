import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userAgreeLocation } from "../redux/modules/BungleSlice";

import {
  OnBoardModalWrapper,
  OnBoardModalOverlay,
  OnBoardModalInner,
  OnBoardModalContentWrap,
  OnboardImageWrap,
  OnboardImgTitle,
  OnboardImgLogo,
  OnboardTitle,
  OnboardSubTitle,
  OnboardAgreeText,
  OnboardButton
} from "../styles/StyledOnBoarding";

import "../styles/swiperStyles.css";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
import { Pagination } from "swiper";

// icon
import IconLoginLogo from "../assets/icon-login-title.svg";
import IconIllustration from "../assets/icon-login-illustration.svg";

import IconEdit from "../assets/icon-edit-footer.svg";
import IconCreate from "../assets/icon-create-post.svg";

import IconLike from "../assets/icon-like.svg";
import IconUnlike from "../assets/icon-unlike.svg";
// image
import ImgBottomBar from "../assets/img-bottom-bar.svg";
import ImgMap from "../assets/img-map.svg";
import ImgChat from "../assets/img-chat.svg";
import ImgMyBungle from "../assets/img-mybungle.svg";

function OnBoarding() {
  //
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 온보딩 체크 여부
  const userAgree = useSelector( state => state.Bungle.userAgree );
  console.log( userAgree );
  const [ isChecked, setIsChecked ] = useState(false);
  const [ isClosed, setIsClosed ] = useState( false );
 
  const checkBoxOnClickHandler = ( event ) => {
    setIsChecked( event.target.checked );
  }
  const closeOnboarding = () => {
    setIsClosed( true );
    dispatch( userAgreeLocation( ) )
  }

  const exitOnboardingClickHanlder = () => {
    navigate("/");
  }
  if( userAgree || isClosed ){
    return null;
  }
  else{
  return (
      <>
        <OnBoardModalWrapper>
          <OnBoardModalOverlay>
            <OnBoardModalInner>
              <Swiper
                // pagination={pagination}
                pagination={true}
                modules={[Pagination]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <OnBoardModalContentWrap>
                    <OnboardImageWrap>
                      <OnboardImgTitle src={IconLoginLogo} />
                    </OnboardImageWrap>
                    <OnboardImgLogo src={IconIllustration} />
                    <h3>벙글 가입을 환영합니다</h3>
                  </OnBoardModalContentWrap>
                </SwiperSlide>
                <SwiperSlide>
                  <OnBoardModalContentWrap>
                    <h3>저희 서비스는 이렇게 사용하셔야 해요</h3>
                  </OnBoardModalContentWrap>
                </SwiperSlide>
                <SwiperSlide>
                  <OnBoardModalContentWrap>
                    <OnboardTitle>1. GPS를 허용 해주셔야해요</OnboardTitle>
                    <OnboardSubTitle>아니면 위치를 알 수 없답니다</OnboardSubTitle>
                  </OnBoardModalContentWrap>
                </SwiperSlide>
                <SwiperSlide>
                  <OnBoardModalContentWrap>
                    <OnboardTitle>2. 메인에서 벙글들을 살펴보세요</OnboardTitle>
                    <h4>실시간 벙글</h4>
                    <OnboardSubTitle>지금 현재 이루어지고 있는 벙글과</OnboardSubTitle>
                    <h4>마감 임박순 벙글</h4>
                    <OnboardSubTitle>곧 시작할 벙글을 확인할 수 있어요</OnboardSubTitle>
                  </OnBoardModalContentWrap>
                </SwiperSlide>
                <SwiperSlide>
                  <OnBoardModalContentWrap>
                    <OnboardTitle>3. 메인에서 벙글들을 찜해보세요</OnboardTitle>
                    <div style={{ display:"flex", gap:"30px"}}>
                    <img style={{ width:"20%", marginTop:"25px", marginBottom:"25px"}} src={IconUnlike} alt=""/>
                    <img style={{ width:"20%", marginTop:"25px", marginBottom:"25px"}} src={IconLike} alt=""/>
                    </div>
                    <OnboardSubTitle>벙글들을 찜하기를 통해 관리할 수 있어요</OnboardSubTitle>
                    <OnboardSubTitle>나의 벙글에서 찜 목록을 확인해보세요</OnboardSubTitle>
                  </OnBoardModalContentWrap>
                </SwiperSlide>
                <SwiperSlide>
                  <OnBoardModalContentWrap>
                  <OnboardTitle>4. 메인에서 벙글을 검색해보세요</OnboardTitle>
                  <OnboardSubTitle style={{marginBottom: "-10px"}}>내 위치에서 가까운 순으로</OnboardSubTitle>
                  <h4>태그 검색</h4>
                  <OnboardSubTitle>메인의 검색란에서 태그를 검색할 수 있고</OnboardSubTitle>
                  <h4>카테고리 검색</h4>
                  <OnboardSubTitle>카테고리를 눌러서 확인할 수도 있어요</OnboardSubTitle>
                  </OnBoardModalContentWrap>
                </SwiperSlide>
                <SwiperSlide>
                  <OnBoardModalContentWrap>
                    <OnboardTitle>5.하단에서 벙글을 생성해보세요</OnboardTitle>
                    <img style={{ width:"20%", marginTop:"25px", marginBottom:"25px"}} src={IconCreate} alt=""/>
                    <OnboardSubTitle>벙글이 없다면 가운데 벙글 아이콘을 눌러</OnboardSubTitle>
                    <OnboardSubTitle>직접 생성할 수 있어요</OnboardSubTitle>
                    <OnboardSubTitle>24시간 동안만 벙글을 설정할 수 있답니다.</OnboardSubTitle>
                    <OnboardSubTitle>벙글이 생성되면 채팅방이 개설돼요.</OnboardSubTitle>
                  </OnBoardModalContentWrap>
                </SwiperSlide>
                <SwiperSlide>
                  <OnBoardModalContentWrap>
                    <OnboardTitle>6.하단에서 벙글을 수정해보세요</OnboardTitle>
                    <img style={{ width:"25%", marginTop:"25px", marginBottom:"25px"}} src={IconEdit} alt=""/>
                    <OnboardSubTitle>벙글을 수정하고 싶다면</OnboardSubTitle>
                    <OnboardSubTitle>가운데 수정 아이콘을 눌러 수정, 삭제할 수 있어요</OnboardSubTitle>
                    <OnboardSubTitle>생성된 벙글은 약속시간의 24시간 뒤에 삭제돼요</OnboardSubTitle>
                  </OnBoardModalContentWrap>
                </SwiperSlide>
                <SwiperSlide>
                  <OnBoardModalContentWrap>
                    <OnboardTitle>7.하단에서 지도를 검색해보세요</OnboardTitle>
                    <img style={{ width:"22%", marginTop:"25px", marginBottom:"25px"}} src={ImgMap} alt=""/>
                    <OnboardSubTitle>내 주변의 벙글들을 한눈에 볼 수 있고</OnboardSubTitle>
                    <OnboardSubTitle>태그 검색으로 주변 벙글을 확인할 수도 있어요.</OnboardSubTitle>
                    <OnboardSubTitle>상세 설정으로 다양한 벙글들을 찾아보세요</OnboardSubTitle>
                  </OnBoardModalContentWrap>
                </SwiperSlide>
                <SwiperSlide>
                  <OnBoardModalContentWrap>
                    <OnboardTitle>8.채팅 목록을 확인해보세요.</OnboardTitle>
                      <img style={{ width:"22%", marginTop:"25px", marginBottom:"25px"}} src={ImgChat} alt=""/>
                    <OnboardSubTitle>참여하신 벙글들의 채팅을 확인할 수 있어요.</OnboardSubTitle>
                  </OnBoardModalContentWrap>
                </SwiperSlide>
                <SwiperSlide>
                <OnBoardModalContentWrap>
                  <OnboardTitle>9.프로필을 수정해보세요.</OnboardTitle>
                    <img style={{ width:"22%", marginTop:"25px", marginBottom:"25px"}} src={ImgMyBungle} alt=""/>
                    <OnboardSubTitle>찜한 목록들을 확인할 수 있고 </OnboardSubTitle>
                    <OnboardSubTitle>프로필을 수정해 앞으로 만날 주변 분들에게 </OnboardSubTitle>
                    <OnboardSubTitle>특별한 이미지를 심어주세요.</OnboardSubTitle>
                  </OnBoardModalContentWrap>
                </SwiperSlide>
                <SwiperSlide>
                <OnBoardModalContentWrap>
                  <span style={{ marginLeft:"270px",fontSize:"16px", cursor:"pointer"}}className="material-icons" onClick={()=>{exitOnboardingClickHanlder()}}>
                    close
                  </span>
                  <OnboardTitle>이제 벙글하러 가요.</OnboardTitle>
                    <img style={{ width:"70%", marginTop:"25px", marginBottom:"25px"}} src={IconLoginLogo} alt=""/>
                      <label style={{ fontWeight: "400", fontSize: "14px",lineHeight: "17px" }}>
                        <input style={{ position:"relative", top:"2.5px" }} type="checkbox" name="color" onChange={ event =>{checkBoxOnClickHandler(event)}}/> 벙글의 위치 기반 서비스 이용에 동의하십니까?
                      </label>
                      <OnboardAgreeText>서비스 동의 후, 벙글을 이용할 수 있습니다.</OnboardAgreeText>
                      {!isChecked ? <OnboardButton style={{ backgroundColor: "#D9D9D9", color:"#898989" }} >벙글하러 가기</OnboardButton> 
                      : <OnboardButton style={{ backgroundColor: "#FFC634", color:"black" }} onClick={()=>{closeOnboarding()}}>벙글하러 가기</OnboardButton> }
                  </OnBoardModalContentWrap>
                </SwiperSlide>
              </Swiper>
            </OnBoardModalInner>
          </OnBoardModalOverlay>
        </OnBoardModalWrapper>
      </>
    );
  }
}

export default OnBoarding;
