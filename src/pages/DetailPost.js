/* global kakao */
import React, { useEffect, useRef, useState } from "react";

import {
  detailBungleList,
  detailLikeBungleList,
  getIntervalNotification
} from "../redux/modules/BungleSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import Divider from "../components/Divider";
import {
  PostWrap,
  PostContent,
  PostImg,
  PostIconShared,
  PostLike,
  PostUserBox,
  PostUserBoxProfile,
  PostUserTexts,
  PostUserName,
  PostUserIntro,
  PostUserIcon,
  PostUserIconImg,
  PostUserIconText,
  PostBodyTextWrap,
  PostBodyTitle,
  PostBodyContent,
  PostInfoTextWrap,
  PostTagWrap,
  PostTag,
  PostMap,
  PostMapTitle,
  PostMapView,
  PostMemberWrap,
  PostMemberTitle,
  PostMemberCard,
  PostMemberPicture,
  PostMemberName,
  PostJoinButton,
  PostCategoriesWrapper,
  PostCategoriesItem,
  PostJoinButtonWrapper,
  PostJoinIcon,
} from "../styles/StyledDetailPost";

import {
  PostHeaderWrap,
  ChattingBackKey,
  HeadrIconsWrap,
  IconNotification,
  IconSetting
} from "../styles/StyledHeader.js";

// icons
import IconShared from "../assets/icon-url-shared.svg";
import IconLightening from "../assets/icon-lightening.svg";
import IconLike from "../assets/icon-like.svg";
import IconUnlike from "../assets/icon-unlike.svg";
import IconChat from "../assets/icon-chat.svg";
import IconVideo from "../assets/icon-detail-camera.svg";

import IconHighTemp from "../assets/icon-manner-high.svg";
import IconMiddleTemp from "../assets/icon-manner-middle.svg";
import IconLowTemp from "../assets/icon-manner-low.svg";

import Notification from "../assets/icon-notification.svg";
import Setting from "../assets/icon-setting.svg";
import IconBackKey from "../assets/icon-left-arrow.svg";

import IconCurrentMarker from "../assets/icon-marker-current.svg";

import IconNoPost from "../assets/icon-detail-no-post.svg";

//채팅 입장 client
const Post = () => {
  const navigate = useNavigate();
   // 알림 interval
   const interval = useRef(null);
   // 알람 추가
   const NotificationState = useSelector( state => state.Bungle.isReadNotification );
   const [ notificationState, setNotificationState ] = useState( NotificationState);
   useEffect(()=>{
     setNotificationState( NotificationState );
   },[NotificationState])

  const detailBungleInfo = useSelector((state) => state.Bungle.detailBungle);
  // console.log( detailBungleInfo, detailBungleInfo.length );
  const { postId } = useParams();

  const dispatch = useDispatch();

  const container = useRef(null);
  // const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
  const [isLoaded, setIsLoaded] = useState(true);

  // 알림 setInterval
  useEffect(()=>{
    interval.current = setInterval( async()=>{
      dispatch( getIntervalNotification() );
    }, 5000);
    return () => clearInterval( interval.current );
  },[])

  useEffect(() => {
    // postId가 있을 경우, dispatch 실행
    dispatch(detailBungleList(postId));
    console.log("Detail mount");
    window.scrollTo(0, 0);
  }, [postId]);

  useEffect(() => {
    if (detailBungleInfo.latitude) {
      // latitude 값이 들어왔을 경우 실행
      const options = {
        //지도를 생성할 때 필요한 기본 옵션
        // center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        center: new kakao.maps.LatLng(
          detailBungleInfo.latitude,
          detailBungleInfo.longitude
        ), //지도의 중심좌표.
        level: 3, //지도의 레벨(확대, 축소 정도)
      };

      const map = new kakao.maps.Map(container.current, options); //지도 생성 및 객체 리턴
      // 마커 생성
      const imageSrc = IconCurrentMarker;
      const imageSize = new kakao.maps.Size(10, 10);
      const imageOption = "";
      const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );
      const markerPosition = new kakao.maps.LatLng(
        detailBungleInfo.latitude,
        detailBungleInfo.longitude
      );
      const marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });

      marker.setMap(map);
    }
  }, [detailBungleInfo.latitude]);

  //참여하기 버튼 클릭 시 해당 채팅방으로 이동
  const goToChatRoom = () => {
    navigate(`/chat/${postId}`);
  };

  const goToVideoRoom = () => {
    navigate(`/videochat/${postId}`);
  }

  // 좋아요 클릭

  const isLikeClick = (postId) => {
    dispatch(detailLikeBungleList(postId));
    console.log("like ", postId);
  };

  return (
    <>
      {/* Urls가 있으면 렌더링 */}
      {detailBungleInfo.postUrls && (
        <>
          <PostWrap>
            <PostHeaderWrap>
              <ChattingBackKey
                src={IconBackKey}
                onClick={() => {
                  navigate("/main");
                }}
              />

              <HeadrIconsWrap>
                {notificationState ? (
                  <span
                    style={{ cursor: "pointer", color: "#FFC632" }}
                    className="material-icons"
                    onClick={() => {
                      navigate("/notification");
                    }}
                  >
                    notifications
                  </span>
                ) : (
                  <IconNotification src={Notification} />
                )}
                <IconSetting src={Setting} />
              </HeadrIconsWrap>
            </PostHeaderWrap>
            <PostContent>
              <PostIconShared src={IconShared} />
              <PostLike
                src={detailBungleInfo.isLike ? IconLike : IconUnlike}
                onClick={() => {
                  isLikeClick(detailBungleInfo.postId);
                }}
              />
              { console.log( detailBungleInfo.postUrls.length)}
              {/* { detailBungleInfo.postUrls.length === 1 && detailBungleInfo.postUrls[0] === filterPostURL ?
              (
                <PostImg src={IconNoPost} />
              ) : (<Swiper
                style={{
                  position: "relative",
                  width: "100%",
                  height: "207px",
                }}
              >
                {detailBungleInfo.postUrls.map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <PostImg src={item} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>)} */}
              {detailBungleInfo.postUrls[0] !== null ? (
                <Swiper
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "207px",
                  }}
                >
                  {detailBungleInfo.postUrls.map((item, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <PostImg src={item} />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              ) : (
                <PostImg src={IconNoPost} />
              )}

              <PostUserBox>
                <PostUserBoxProfile
                  src={
                    detailBungleInfo.joinPeopleUrl[0]
                      ? detailBungleInfo.joinPeopleUrl[0]
                      : ""
                  }
                />
                <PostUserTexts>
                  <PostUserName>
                    {detailBungleInfo.joinPeopleNickname[0]}
                  </PostUserName>
                  <PostUserIntro>
                    {detailBungleInfo.joinPeopleIntro[0]}
                  </PostUserIntro>
                  <PostUserIcon>
                    <PostUserIconImg src={IconLightening} />
                    <PostUserIconText>
                      {detailBungleInfo.bungCount}회 참여
                    </PostUserIconText>
                    <PostUserIconImg
                      src={
                        detailBungleInfo.mannerTemp >= 50
                          ? IconHighTemp
                          : detailBungleInfo.mannerTemp >= 25
                          ? IconMiddleTemp
                          : IconLowTemp
                      }
                    />
                    <PostUserIconText>
                      {detailBungleInfo.mannerTemp}°C
                    </PostUserIconText>
                  </PostUserIcon>
                </PostUserTexts>
              </PostUserBox>
              <PostBodyTextWrap>
                <PostBodyTitle>{detailBungleInfo.title}</PostBodyTitle>
                <PostBodyContent>{detailBungleInfo.content}</PostBodyContent>
                <PostCategoriesWrapper>
                  <PostCategoriesItem>
                    {detailBungleInfo.categories.join(" · ")}
                  </PostCategoriesItem>
                </PostCategoriesWrapper>
                <PostTagWrap>
                  {detailBungleInfo.tags.map((item, index) => {
                    return <PostTag key={item}>#{item}</PostTag>;
                  })}
                </PostTagWrap>
              </PostBodyTextWrap>
            </PostContent>
            <Divider />
            <PostMap>
              <div style={{ display: "flex" }}>
                <PostMapTitle>번개 위치</PostMapTitle>
                <PostInfoTextWrap>{detailBungleInfo.place}</PostInfoTextWrap>
              </div>
              <PostMapView className="map" id="map" ref={container} />
            </PostMap>
            <Divider />
            <PostMemberWrap>
              <PostMemberTitle>
                참여 인원 ({detailBungleInfo.joinCount}/
                {detailBungleInfo.personnel}명)
              </PostMemberTitle>
              <Swiper
                style={{ marginLeft: "20px" }}
                spaceBetween={5}
                slidesPerView={3}
              >
                {detailBungleInfo.joinPeopleUrl.map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <PostMemberCard>
                        <PostMemberPicture src={item} />
                        <PostMemberName>
                          {detailBungleInfo.joinPeopleNickname[index]}
                        </PostMemberName>
                      </PostMemberCard>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </PostMemberWrap>
            {detailBungleInfo.isLetter ? (
              <PostJoinButtonWrapper>
                <PostJoinIcon src={IconChat} />
                {detailBungleInfo.joinCount === detailBungleInfo.personnel ? (
                  <>
                    <PostJoinButton
                      // onClick={goToChatRoom}
                      style={{
                        pointerEvents: "none",
                        backgroundColor: "#D9D9D9",
                        color: "#898989",
                      }}
                    >
                      참여하기
                    </PostJoinButton>
                  </>
                ) : (
                  <>
                    <PostJoinButton onClick={goToChatRoom}>
                      참여하기
                    </PostJoinButton>
                  </>
                )}
              </PostJoinButtonWrapper>
            ) : (
              <PostJoinButtonWrapper>
                <span
                  className="material-icons-outlined"
                  style={{
                    position: "absolute",
                    width: "20px",
                    height: "20px",
                    left: "128px",
                    top: "16px",
                  }}
                >
                  video_camera_front
                </span>
                {detailBungleInfo.joinCount === detailBungleInfo.personnel ? (
                  <>
                    <PostJoinButton
                      // onClick={goToChatRoom}
                      style={{
                        pointerEvents: "none",
                        backgroundColor: "#D9D9D9",
                        color: "#898989",
                      }}
                    >
                      참여하기
                    </PostJoinButton>
                  </>
                ) : (
                  <>
                    <PostJoinButton>참여하기</PostJoinButton>
                  </>
                )}
              </PostJoinButtonWrapper>
            )}
          </PostWrap>
        </>
      )}
    </>
  );
};

export default Post;
