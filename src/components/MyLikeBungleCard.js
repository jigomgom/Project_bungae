import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { likeBungleList } from "../redux/modules/BungleSlice";

import {
  PostHeaderWrap,
  ChattingBackKey,
  HeadrIconsWrap,
  IconNotification,
  IconSetting
} from "../styles/StyledHeader.js";

import {
  MapFooterWrap,
  FooterIconWrap,
  FooterIconImg,
  FooterIconText,
  FooterAddBungae,
} from "../styles/StyledFooter.js";

import { LoadingWrap, LoadingLogo, LoadingText } from "../styles/StyledLoading";
//swipe-list
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
//CSS
import "../styles/SearchCard.css";
import "react-swipeable-list/dist/styles.css";

//img
import defaultCardImg from "../assets/defaultImg.jpg";
import likeImg from "../assets/icon-like.svg";
import UnlikeImg from "../assets/icon-unlike.svg";
import IconHighTemp from "../assets/icon-manner-high.svg";
import IconMiddleTemp from "../assets/icon-manner-middle.svg";
import IconLowTemp from "../assets/icon-manner-low.svg";
import IconLoadingLogo from "../assets/icon-splash-logo.svg";


function MyLikeBungleCard(props) {

  const { myLikeList } = props;
  
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    if (isLoad) {
      setTimeout(() => {
        setIsLoad(false);
      }, 200);
    }
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const likeMyBugleList = (postId) => {
    console.log(postId);
    dispatch(likeBungleList(postId));
  };

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => { 
          console.log("찜 삭제");
          likeMyBugleList(myLikeList.postId)}}
      >
        삭제
      </SwipeAction>
    </TrailingActions>
  );

  // 게시물 상세 조회
  const showDetailBungle = (postId) => {
    navigate(`/detailpost/${postId}`);
  };

  if ( myLikeList === undefined ) {
    return (
      <LoadingWrap>
        <LoadingLogo src={IconLoadingLogo} />
        <LoadingText>진행 중인 채팅이 없습니다.</LoadingText>
      </LoadingWrap>
    );
  }

  return (
    <>
    <SwipeableList>
      <SwipeableListItem trailingActions={trailingActions()}>
        <div className="search-card-wrap">
          <div className="search-card-img" >
            <img
              className="search-card-img-thumbnail"
              src={myLikeList.postUrl ? myLikeList.postUrl : defaultCardImg}
              alt=""
              onClick={()=>{showDetailBungle(myLikeList.postId)}}
            />
            <img
              className="search-card-img-like"
              src={myLikeList.isLike ? likeImg : UnlikeImg}
              alt=""
              onClick={()=>{likeMyBugleList(myLikeList.postId)}}
            />
          </div>
          <div className="search-card-desc">
            <div className="search-card-desc-title">{myLikeList.title}</div>
            <div className="search-card-desc-sub">
              {myLikeList.time} · ({myLikeList.joinCount}/{myLikeList.personnel}
              명)
            </div>
            <div className="search-card-desc-desc">
              <span>{myLikeList.content}</span>
            </div>
            <div className="search-card-desc-temp">
              <img
                src={
                  myLikeList.avgTemp >= 50
                    ? IconHighTemp
                    : myLikeList.avgTemp >= 25
                    ? IconMiddleTemp
                    : IconLowTemp
                }
                alt=""
              />
              <span>{myLikeList.avgTemp}°C</span>
            </div>
            <div></div>
          </div>
        </div>
      </SwipeableListItem>
    </SwipeableList>
   
    </>
  );
}

export default MyLikeBungleCard;
