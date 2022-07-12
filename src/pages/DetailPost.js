/* global kakao */
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
  PostJoinIcon
} from "../styles/StyledDetailPost";


// icons
import IconShared from "../assets/icon-url-shared.svg";
import IconPostTemp from "../assets/icon-post-temp.svg";
import IconLightening from "../assets/icon-lightening.svg";
import IconUnlike from "../assets/icon-white-unlike.svg";
import IconChat from "../assets/icon-chat.svg";

const TagsArrray = ["산책", "친목", "노래방", "수다", "대화"];
const MembersArray = [
  "Lorem ipsum1",
  "Lorem ipsum2",
  "Lorem ipsum3",
  "Lorem ipsum4",
  "Lorem ipsum5",
];

const Post = () => {
  const container = useRef(null);
  useEffect(() => {
    // const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      // center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      center: new kakao.maps.LatLng(37.2703232, 127.0710272), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container.current, options); //지도 생성 및 객체 리턴
  }, []);

  return (
    <PostWrap>
      <PostContent>
        <PostImg />
        <PostIconShared src={IconShared} />
        <PostLike src={IconUnlike}/>
        <PostUserBox>
          <PostUserBoxProfile />
          <PostUserTexts>
            <PostUserName>닉네임</PostUserName>
            <PostUserIntro>자기 소개를 입력해주세요</PostUserIntro>
            <PostUserIcon>
              <PostUserIconImg src={IconLightening} />
              <PostUserIconText>25회 참여</PostUserIconText>
              <PostUserIconImg src={IconPostTemp} />
              <PostUserIconText>80°C</PostUserIconText>
            </PostUserIcon>
          </PostUserTexts>
        </PostUserBox>
        <PostBodyTextWrap>
          <PostBodyTitle>Lorem ipsum</PostBodyTitle>
          <PostBodyContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus nam
            amet netus faucibus dolor quam ut turpis. Lobortis vel, volutpat
            condimentum tristique pellentesque gravida feugiat mattis. Viverra
            varius ut velit sed. Ut lorem vulputate sit non vel at. Neque mauris
            tincidunt nisl donec ac, maecenas euismod.
          </PostBodyContent>
          <PostCategoriesWrapper>
            <PostCategoriesItem>친목</PostCategoriesItem>
            <PostCategoriesItem>운동</PostCategoriesItem>
            <PostCategoriesItem>게임</PostCategoriesItem>
          </PostCategoriesWrapper>          
          <PostTagWrap>
            {TagsArrray.map((item, index) => {
              return <PostTag>#{item}</PostTag>;
            })}
          </PostTagWrap>
        </PostBodyTextWrap>
      </PostContent>
      <Divider />
      <PostMap>
        <div style={{display:"flex"}}>
        <PostMapTitle>번개 위치</PostMapTitle>
        <PostInfoTextWrap>
            서초동 1번 출구 인근
          </PostInfoTextWrap>
          </div>
        <PostMapView className="map" id="map" ref={container} />
      </PostMap>
      <Divider />
      <PostMemberWrap>
        <PostMemberTitle>참여 인원 (4/5명)</PostMemberTitle>
        <Swiper
          style={{ marginLeft: "20px" }}
          spaceBetween={5}
          slidesPerView={3}
        >
          {MembersArray.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <PostMemberCard>
                  <PostMemberPicture />
                  <PostMemberName>{item}</PostMemberName>
                </PostMemberCard>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </PostMemberWrap>
      <PostJoinButtonWrapper>
        <PostJoinIcon src={IconChat}/>
        <PostJoinButton>참여하기</PostJoinButton>
      </PostJoinButtonWrapper>
    </PostWrap>
  );
};

export default Post;
