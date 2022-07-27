/*
  작성자 : 한지용
  작성 날짜 : 
  작성 내용 :
*/

import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getMainBungleList,
  likeBungleList,
  moreBungleList,
  getIntervalNotification,
} from "../redux/modules/BungleSlice";

import Loading from "../components/Loading";

import Tag from "../components/Tag";
import Search from "../components/Search";
import Category from "../components/Category";

import {
  MainWrap,
  ContentDivide,
  MainContentWrap,
  MainContentTitle,
  MainContentItemWrap,
  MainContentItemFrame,
  MainContentItemImg,
  MainContentItemImgTemp,
  MainContentTextWrap,
  MainContentTitleWrap,
  MainContentItemTitle,
  MainContentItemLike,
  MainContentItemTimePeople,
  MainContentButton,
} from "../styles/StyledMain.js";

import { MainHeaderWrap, MainHeaderLogo, MainHeaderIconsWrap, IconMyLocation, IconSetting, IconNotification } from "../styles/StyledHeader";

// css
import {
  FooterWrap,
  FooterIconWrap,
  FooterIconImg,
  FooterIconText,
  FooterAddBungae,
} from "../styles/StyledFooter.js";

//icons
import IconLike from "../assets/icon-like.svg";
import IconUnlike from "../assets/icon-unlike.svg";
import defaultCardImg from "../assets/defaultImg.jpg";
import IconHighTemp from "../assets/icon-manner-high.svg";
import IconMiddleTemp from "../assets/icon-manner-middle.svg";
import IconLowTemp from "../assets/icon-manner-low.svg";
import IconMainLogo from "../assets/icon-main-logo.svg";

import IconMyPoint from "../assets/icon-mylocation.svg";
import Notification from "../assets/icon-notification.svg";
import Setting from "../assets/icon-setting.svg";

// Footer Icons
import IconHomeCurrent from "../assets/icon-home-current.svg";
import IconLocation from "../assets/icon-location.svg";
import IconChat from "../assets/icon-chat.svg";
import IconMyBungae from "../assets/icon-account.svg";
import IconCreate from "../assets/icon-create-post.svg";
import IconEdit from "../assets/icon-edit-footer.svg";

import SockJS from "sockjs-client";
import AxiosAPI from "../customapi/CustomAxios";

function Main() {
  // 알림 call
  const interval = useRef(null);
  // 알림 state
  const NotificationState = useSelector( state => state.Bungle.isReadNotification );
  const [ notificationState, setNotificationState ] = useState( NotificationState);
  useEffect(()=>{
    setNotificationState( NotificationState );
  },[NotificationState])
  // isOwner
  const ownerCheck = useSelector((state) => state.Bungle.isOwner);

  // dispatch
  const dispatch = useDispatch();
  // navigate
  const navigate = useNavigate();
  // load
  const [isLoad, setIsLoad] = useState(true);
  const realTimeList = useSelector((state) => state.Bungle.realTime);
  const endTimeList = useSelector((state) => state.Bungle.endTime);

  // 벙글 리스트 전체 조회하기
  // 현위치 찾아오기
  // 지도 경도, 위도 State
  // location 정보 저장
  const [location, setLocation] = useState();
  // 에러 메세지 저장
  const [error, setError] = useState();
  // GPS 옵션
  const options = {
    /*
    maximumAge
    : 캐시에 저장한 위치정보를 대신 반환할 수 있는 최대 시간을 나타내는 양의 long 값. 
    0을 지정한 경우 장치가 위치정보 캐시를 사용할 수 없으며 반드시 실시간으로 위치를 알아내려 시도해야 한다는 뜻. 
    Infinity를 지정한 경우 지난 시간에 상관없이 항상 캐시에 저장된 위치정보를 반환해야 함. 기본 값은 0입니다.
    timeout
    : 기기가 위치를 반환할 때 소모할 수 있는 최대 시간(밀리초)을 나타내는 양의 long 값. 
    기본 값은 Infinity로, 위치를 알아내기 전에는 getCurrentPosition()이 반환하지 않을 것임을 나타냄.
    enableHighAccuracy
    : 위치정보를 가장 높은 정확도로 수신하고 싶음을 나타내는 불리언 값. true를 지정했으면, 지원하는 경우 장치가 더 정확한 위치를 제공. 
     그러나 응답 속도가 느려지며 전력 소모량이 증가. 
     반면 false를 지정한 경우 기기가 더 빠르게 반응하고 전력 소모도 줄일 수 있는 대신 정확도가 떨어짐. 기본 값은 false.
    */
    enableHighAccuracy: true,
    // timeout
    timeout: 10000, // 10000
    maximumAge: 0,
  };

  const handleSuccess = (pos) => {
    const { latitude, longitude } = pos.coords;

    setLocation({
      latitude,
      longitude,
    });
  };

  // Geolocation의 `getCurrentPosition` 메소드에 대한 실패 callback 핸들러
  const handleError = (error) => {
    setError(error.message);
    console.log( error.code );
    console.log(error.message);
    if( error.message === "User denied Geolocation"){
      alert("사이트 설정에서 GPS 설정을 켜주세요");
    }
        // if( error.message );
  };

  // GPS 아이콘 클릭, update position
  const getCurrentLocationBtnClick = () => {
    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      options
    );
    dispatch(getMainBungleList(location));
  };
  

  useEffect(() => {
    // const response = navigator.geolocation;
    // console.log( response );
    
    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      options
    );
    window.scrollTo(0,0);
  }, []);

  useEffect(()=>{
    interval.current = setInterval( async()=>{
      dispatch( getIntervalNotification() );
    }, 5000);
    return () => clearInterval( interval.current );
  },[])
  

  useEffect(() => {
    if (location) {
      dispatch(getMainBungleList(location));
    }
  }, [location]);

  // 실시간 벙글 하트 state
  const [isRealTimeHeart, setIsRealTimeHeart] = useState([
    false,
    false,
    false,
    false,
  ]);
  // 평균 매너 온도 하트 state
  const [isMannerHeart, setIsMannerHeart] = useState([
    false,
    false,
    false,
    false,
  ]);
  // 마감 임박순 하트 state
  const [isEndTimeHeart, setIsEndTimeHeart] = useState([
    false,
    false,
    false,
    false,
  ]);

  // 실시간 벙글 하트 클릭
  const HeartRealTimeClickHanlder = (realTimeIndex, postId) => {
    console.log(realTimeIndex, postId);
    setIsRealTimeHeart(
      isRealTimeHeart.map((item, Checkedindex) => {
        if (Checkedindex === realTimeIndex) {
          return (item = !item);
        } else {
          return item;
        }
      })
    );
    dispatch(likeBungleList(postId));
  };
  // 평균 매너 온도 하트 클릭
  const HeartMannerClickHandler = (mannerIndex, postId) => {
    setIsMannerHeart(
      isMannerHeart.map((item, Checkedindex) => {
        if (Checkedindex === mannerIndex) {
          return (item = !item);
        } else {
          return item;
        }
      })
    );
    dispatch(likeBungleList(postId));
  };
  // 마감 임박순 벙글 하트 클릭
  const HeartEndTimeClickHandler = (endTimeIndex, postId) => {
    setIsEndTimeHeart(
      isEndTimeHeart.map((item, Checkedindex) => {
        if (Checkedindex === endTimeIndex) {
          return (item = !item);
        } else {
          return item;
        }
      })
    );
    dispatch(likeBungleList(postId));
  };

  // 더보기 클릭
  const MoreBtnClickHandler = (status) => {
    if (status === "realTime") {
      console.log("More real time");
      dispatch(moreBungleList({ status, location, navigate }));
      // navigate("/tagsearch");
    } else if (status === "manner") {
      console.log("More manner");
      // navigate("/tagsearch");
    } else {
      console.log("More endTime");
      dispatch(moreBungleList({ status, location, navigate }));
      // navigate("/tagsearch");
    }
  };

  // 게시물 상세 조회
  const showDetailBungle = (postId) => {
    navigate(`/detailpost/${postId}`);
  };

  if (!location || ( !realTimeList && !endTimeList )) {
    // console.log(location);
    return <Loading></Loading>
  } else {
    console.log(location);
    return (
      <>
        {/* {!isLoad && ( */}
        <MainWrap>
          <MainHeaderWrap>
            <MainHeaderLogo src={IconMainLogo} />
            <MainHeaderIconsWrap>
              <IconMyLocation src={IconMyPoint} onClick={() => {
              getCurrentLocationBtnClick();
            }}/>
              {notificationState ? <span style={{ cursor:"pointer",color:"#FFC632"}} className="material-icons" onClick={()=>{navigate("/notification")}} >notifications</span> : <IconNotification src={Notification} />}
              
              <IconSetting src={Setting} />
            </MainHeaderIconsWrap>
          </MainHeaderWrap>
          <Tag />
          <Search
            location={location}
          />
          <Category location={location} />
          <ContentDivide />
          {/* 실시간 벙글 */}
          <MainContentWrap>
            <MainContentTitle>실시간 벙글</MainContentTitle>
            <MainContentItemWrap>
              {realTimeList.map((item, index) => {
                // console.log( item );
                return (
                  <MainContentItemFrame key={index}>
                    <MainContentItemImg
                      src={item.postUrl ? item.postUrl : defaultCardImg}
                      onClick={() => {
                        showDetailBungle(item.postId);
                      }}
                    />
                    <MainContentItemImgTemp
                      src={
                        item.avgTemp >= 50
                          ? IconHighTemp
                          : item.avgTemp >= 25
                          ? IconMiddleTemp
                          : IconLowTemp
                      }
                    />
                    <MainContentTextWrap>
                      <MainContentTitleWrap>
                        <MainContentItemTitle>
                          {item.title}
                        </MainContentItemTitle>
                        <MainContentItemLike
                          src={item.isLike ? IconLike : IconUnlike}
                          onClick={() =>
                            HeartRealTimeClickHanlder(index, item.postId)
                          }
                        />
                      </MainContentTitleWrap>
                      <MainContentItemTimePeople>
                        {item.time} ({item.joinCount}/{item.personnel})
                      </MainContentItemTimePeople>
                    </MainContentTextWrap>
                  </MainContentItemFrame>
                );
              })}
            </MainContentItemWrap>
            <MainContentButton onClick={() => MoreBtnClickHandler("realTime")}>
              더보기
            </MainContentButton>
          </MainContentWrap>
          {/* 평균 매너가 좋은 벙글 */}
          {/* <MainContentWrap>
        <MainContentTitle>평균 매너가 좋은 벙글</MainContentTitle>
        <MainContentItemWrap>
          {ContentArray.map((item, index) => {
            return (
              <MainContentItemFrame key={index}>
                <MainContentItemImg />
                <MainContentItemImgTemp src={IconTemp} />
                <MainContentTextWrap>
                  <MainContentTitleWrap>
                    <MainContentItemTitle>{item}</MainContentItemTitle>
                    <MainContentItemLike src={ isMannerHeart[ index ] ? IconLike : IconUnlike} onClick={ () => { HeartMannerClickHandler( index ) }}/>
                  </MainContentTitleWrap>
                  <MainContentItemTimePeople>
                    16시 시작 예정 (0/5)
                  </MainContentItemTimePeople>
                </MainContentTextWrap>
              </MainContentItemFrame>
            );
          })}
        </MainContentItemWrap>
        <MainContentButton onClick={ () => { MoreBtnClickHandler( "manner" ) } }>더보기</MainContentButton>
      </MainContentWrap> */}
          {/* 마감 임박순 벙글 */}
          <MainContentWrap>
            <MainContentTitle>마감 임박순 벙글</MainContentTitle>
            <MainContentItemWrap>
              {endTimeList.map((item, index) => {
                // console.log( item );
                return (
                  <MainContentItemFrame key={index}>
                    <MainContentItemImg
                      src={item.postUrl ? item.postUrl : defaultCardImg}
                      onClick={() => {
                        showDetailBungle(item.postId);
                      }}
                    />
                    <MainContentItemImgTemp
                      src={
                        item.avgTemp >= 50
                          ? IconHighTemp
                          : item.avgTemp >= 25
                          ? IconMiddleTemp
                          : IconLowTemp
                      }
                    />
                    <MainContentTextWrap>
                      <MainContentTitleWrap>
                        <MainContentItemTitle>
                          {item.title}
                        </MainContentItemTitle>
                        <MainContentItemLike
                          src={item.isLike ? IconLike : IconUnlike}
                          onClick={() => {
                            HeartEndTimeClickHandler(index, item.postId);
                          }}
                        />
                      </MainContentTitleWrap>
                      <MainContentItemTimePeople>
                        {item.time} ({item.joinCount}/{item.personnel})
                      </MainContentItemTimePeople>
                    </MainContentTextWrap>
                  </MainContentItemFrame>
                );
              })}
            </MainContentItemWrap>
            <MainContentButton
              onClick={() => {
                MoreBtnClickHandler("endTime");
              }}
            >
              더보기
            </MainContentButton>
          </MainContentWrap>
          <FooterWrap>
            <FooterIconWrap
              onClick={() => {
                navigate("/main");
              }}
            >
              <FooterIconImg src={IconHomeCurrent} />
              <FooterIconText style={{ color: "#FFC632" }}>홈</FooterIconText>
            </FooterIconWrap>
            <FooterIconWrap
              onClick={() => {
                navigate("/map");
              }}
            >
              <FooterIconImg src={IconLocation} />
              <FooterIconText>벙글지도</FooterIconText>
            </FooterIconWrap>
            {ownerCheck ? (
              <FooterAddBungae
                src={IconEdit}
                onClick={() => {
                  navigate("/editpost");
                }}
              />
            ) : (
              <FooterAddBungae
                src={IconCreate}
                onClick={() => {
                  navigate("/createpost");
                }}
              />
            )}
            <FooterIconWrap>
              <FooterIconImg
                src={IconChat}
                onClick={() => {
                  navigate("/chatlist");
                }}
              />
              <FooterIconText>채팅</FooterIconText>
            </FooterIconWrap>
            <FooterIconWrap
              onClick={() => {
                navigate("/mypage");
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => {
                  navigate("/mypage");
                }}
              >
                <FooterIconImg src={IconMyBungae} />
                <FooterIconText>나의 벙글</FooterIconText>
              </div>
            </FooterIconWrap>
          </FooterWrap>
        </MainWrap>
        {/* )} */}
      </>
    );
  }
}

export default Main;
