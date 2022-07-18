/* global kakao */
import React, { useEffect, useRef, useState } from "react";

import { detailBungleList, detailLikeBungleList } from "../redux/modules/BungleSlice";
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
  HeaderWrap,
  Logo,
  BackKey,
  PageTitle,
  HeadrIconsWrap,
  IconMyLocation,
  IconNotification,
  IconSetting,
} from "../styles/StyledHeader";

// icons
import IconShared from "../assets/icon-url-shared.svg";
import IconPostTemp from "../assets/icon-post-temp.svg";
import IconLightening from "../assets/icon-lightening.svg";
import IconLike from "../assets/icon-like.svg";
import IconUnlike from "../assets/icon-unlike.svg";
import IconChat from "../assets/icon-chat.svg";

import IconHighTemp from "../assets/icon-manner-high.svg";
import IconMiddleTemp from "../assets/icon-manner-middle.svg";
import IconLowTemp from "../assets/icon-manner-low.svg";

import Notification from "../assets/icon-notification.svg";
import Setting from "../assets/icon-setting.svg";
import IconBackKey from "../assets/icon-left-arrow.svg";

const MembersArray = [
  "Lorem ipsum1",
  "Lorem ipsum2",
  "Lorem ipsum3",
  "Lorem ipsum4",
  "Lorem ipsum5",
];
//채팅 입장 client
const Post = () => {
  const navigate = useNavigate();

  const detailBungleInfo = useSelector((state) => state.Bungle.detailBungle);
  // console.log( detailBungleInfo, detailBungleInfo.length );
  const { postId } = useParams();

  const dispatch = useDispatch();

  const container = useRef(null);
  // const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
  const [isLoaded, setIsLoaded] = useState(true);
  useEffect(() => {
    // postId가 있을 경우, dispatch 실행
      dispatch(detailBungleList(postId));
      console.log("Detail mount");
      window.scrollTo(0,0);
  }, [postId]);

  useEffect(() => {
      if( detailBungleInfo.latitude ){
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
    }
  }, [detailBungleInfo.latitude]);

  //참여하기 버튼 클릭 시 해당 채팅방으로 이동
  const goToChatRoom = () => {
    navigate(`/chat/${postId}`);
  };

  // 좋아요 클릭

  const isLikeClick = ( postId ) => {
    dispatch( detailLikeBungleList( postId ) );
    console.log("like ", postId);
  };

  return (
    <>
      {/* Urls가 있으면 렌더링 */}
      {detailBungleInfo.postUrls && (
        <>
          <HeaderWrap>
            <Logo style={{ visibility: "hidden" }} />
            <BackKey
              src={IconBackKey}
              onClick={() => {
                navigate("/main");
              }}
            />
            <PageTitle></PageTitle>

            <HeadrIconsWrap>
              <IconMyLocation style={{ visibility: "hidden" }} />
              <IconNotification src={Notification} />
              <IconSetting src={Setting} />
            </HeadrIconsWrap>
          </HeaderWrap>
          <PostWrap>
            <PostContent>
              <PostIconShared src={IconShared} />
              <PostLike src={detailBungleInfo.isLike ? IconLike : IconUnlike} onClick={()=>{ isLikeClick( detailBungleInfo.postId ) }}/>
              {detailBungleInfo.postUrls.length > 1 ? (
                <Swiper
                style={{ position: "relative", width: "100%", height:"207px"}}
                >
                  {detailBungleInfo.postUrls.map( ( item, index ) =>{
                    return(
                      <SwiperSlide key={index}>
                       <PostImg src={item} />
                     </SwiperSlide>
                    )
                  })}
                </Swiper>
              ) : (
                <PostImg src={detailBungleInfo.postUrls[0]} />
              )}
              {/* <PostImg src={detailBungleInfo.postUrls[0]} /> */}

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
                  <PostUserIntro>자기 소개를 입력해주세요</PostUserIntro>
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
                      <PostMemberCard >
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
            <PostJoinButtonWrapper>
              <PostJoinIcon src={IconChat} />
              <PostJoinButton onClick={goToChatRoom}>참여하기</PostJoinButton>
            </PostJoinButtonWrapper>
          </PostWrap>
        </>
      )}
    </>
  );
};

export default Post;
