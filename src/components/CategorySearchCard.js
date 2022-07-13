import React from "react";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { likeBungleList } from "../redux/modules/BungleSlice";
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
import tempImg from "../assets/icon-temp.svg";
import likeImg from "../assets/icon-like.svg";
import UnlikeImg from "../assets/icon-unlike.svg";
import IconHighTemp from "../assets/icon-manner-high.svg";
import IconMiddleTemp from "../assets/icon-manner-middle.svg";
import IconLowTemp from "../assets/icon-manner-low.svg";

function CategorySearchCard(props) {
  const { categoryList } = props;
  const dispatch = useDispatch();
  // console.log(moreList);
  console.log(categoryList);
  const navigate = useNavigate();

  const categoryListLikeClick = (postId) => {
    console.log(postId);
    dispatch(likeBungleList(postId));
  };

  // 게시물 상세 조회 
  const showDetailBungle = ( postId ) => {
    navigate(`/detailpost/${postId}`);
  };

  return (
    <>
      {categoryList && (
        <div className="search-card-wrap" >
          <div className="search-card-img">
            <img
              className="search-card-img-thumbnail"
              src={categoryList.postUrl ? categoryList.postUrl : defaultCardImg}
              alt=""
              onClick={() => { showDetailBungle( categoryList.id ) }}
            />
            <img
              className="search-card-img-like"
              src={categoryList.isLike ? likeImg : UnlikeImg}
              alt=""
              onClick={() => {
                categoryListLikeClick(categoryList.id);
              }}
            />
          </div>
          <div className="search-card-desc">
            <div className="search-card-desc-title">{categoryList.title}</div>
            <div className="search-card-desc-sub">
              {categoryList.time} · ({categoryList.joinCount}/
              {categoryList.personnel}명)
            </div>
            <div className="search-card-desc-desc">
              <span>{categoryList.content}</span>
            </div>
            <div className="search-card-desc-temp">
              <img
                src={
                  categoryList.avgTemp >= 50
                    ? IconHighTemp
                    : categoryList.avgTemp >= 25
                    ? IconMiddleTemp
                    : IconLowTemp
                }
                alt=""
              />
              <span>{categoryList.avgTemp}°C</span>
            </div>
            <div></div>
          </div>
        </div>
      )}
    </>
  );
}

export default CategorySearchCard;
