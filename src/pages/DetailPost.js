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

import IconCurrentMarker from "../assets/icon-marker-current.svg";

const MembersArray = [
  "Lorem ipsum1",
  "Lorem ipsum2",
  "Lorem ipsum3",
  "Lorem ipsum4",
  "Lorem ipsum5",
];
//?????? ?????? client
const Post = () => {
  const navigate = useNavigate();

  const detailBungleInfo = useSelector((state) => state.Bungle.detailBungle);
  // console.log( detailBungleInfo, detailBungleInfo.length );
  const { postId } = useParams();

  const dispatch = useDispatch();

  const container = useRef(null);
  // const container = document.getElementById("map"); //????????? ?????? ????????? DOM ????????????
  const [isLoaded, setIsLoaded] = useState(true);
  useEffect(() => {
    // postId??? ?????? ??????, dispatch ??????
      dispatch(detailBungleList(postId));
      console.log("Detail mount");
      window.scrollTo(0,0);
  }, [postId]);

  useEffect(() => {
      if( detailBungleInfo.latitude ){
        // latitude ?????? ???????????? ?????? ??????
      const options = {
        //????????? ????????? ??? ????????? ?????? ??????
        // center: new kakao.maps.LatLng(33.450701, 126.570667), //????????? ????????????.
        center: new kakao.maps.LatLng(
          detailBungleInfo.latitude,
          detailBungleInfo.longitude
        ), //????????? ????????????.
        level: 3, //????????? ??????(??????, ?????? ??????)
      };
      
      const map = new kakao.maps.Map(container.current, options); //?????? ?????? ??? ?????? ??????
      // ?????? ??????
      const imageSrc = IconCurrentMarker;
      const imageSize = new kakao.maps.Size( 10, 10 );
      const imageOption = '';
      const markerImage = new kakao.maps.MarkerImage( imageSrc, imageSize, imageOption );
      const markerPosition = new kakao.maps.LatLng( detailBungleInfo.latitude,detailBungleInfo.longitude );
      const marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage
      });

      marker.setMap(map);
    }
  }, [detailBungleInfo.latitude]);

  //???????????? ?????? ?????? ??? ?????? ??????????????? ??????
  const goToChatRoom = () => {
    navigate(`/chat/${postId}`);
  };

  // ????????? ??????

  const isLikeClick = ( postId ) => {
    dispatch( detailLikeBungleList( postId ) );
    console.log("like ", postId);
  };

  return (
    <>
      {/* Urls??? ????????? ????????? */}
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
                  <PostUserIntro>{detailBungleInfo.joinPeopleIntro[0]}</PostUserIntro>
                  <PostUserIcon>
                    <PostUserIconImg src={IconLightening} />
                    <PostUserIconText>
                      {detailBungleInfo.bungCount}??? ??????
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
                      {detailBungleInfo.mannerTemp}??C
                    </PostUserIconText>
                  </PostUserIcon>
                </PostUserTexts>
              </PostUserBox>
              <PostBodyTextWrap>
                <PostBodyTitle>{detailBungleInfo.title}</PostBodyTitle>
                <PostBodyContent>{detailBungleInfo.content}</PostBodyContent>
                <PostCategoriesWrapper>
                  <PostCategoriesItem>
                    {detailBungleInfo.categories.join(" ?? ")}
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
                <PostMapTitle>?????? ??????</PostMapTitle>
                <PostInfoTextWrap>{detailBungleInfo.place}</PostInfoTextWrap>
              </div>
              <PostMapView className="map" id="map" ref={container} />
            </PostMap>
            <Divider />
            <PostMemberWrap>
              <PostMemberTitle>
                ?????? ?????? ({detailBungleInfo.joinCount}/
                {detailBungleInfo.personnel}???)
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
              {detailBungleInfo.joinCount === detailBungleInfo.personnel ? (
                <>
                  <PostJoinButton
                    onClick={goToChatRoom}
                    style={{
                      pointerEvents: "none",
                      backgroundColor: "#D9D9D9",
                      color: "red",
                    }}
                  >
                    ????????????
                  </PostJoinButton>
                </>
              ) : (
                <>
                  <PostJoinButton onClick={goToChatRoom}>
                    ????????????
                  </PostJoinButton>
                </>
              )}
            </PostJoinButtonWrapper>
          </PostWrap>
        </>
      )}
    </>
  );
};

export default Post;
