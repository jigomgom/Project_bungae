/*
  작성자 : 한지용
  작성 날짜 : 
  작성 내용 :
*/

import React, { useState } from "react";
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

//icons
import IconTemp from "../assets/icon-temp.svg";
import IconLike from "../assets/icon-like.svg";
import IconUnlike from "../assets/icon-unlike.svg";

const ContentArray = [
  "Lorem ipsum1",
  "Lorem ipsum2",
  "Lorem ipsum3",
  "Lorem ipsum4",
];

function Main() {
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
  const HeartRealTimeClickHanlder = (realTimeIndex) => {
    setIsRealTimeHeart(
      isRealTimeHeart.map((item, Checkedindex) => {
        if (Checkedindex === realTimeIndex) {
          return (item = !item);
        } else {
          return item;
        }
      })
    );
  };
  // 평균 매너 온도 하트 클릭
  const HeartMannerClickHandler = (mannerIndex) => {
    setIsMannerHeart(
      isMannerHeart.map((item, Checkedindex) => {
        if (Checkedindex === mannerIndex) {
          return (item = !item);
        } else {
          return item;
        }
      })
    );
  };
  // 마감 임박순 벙글 하트 클릭
  const HeartEndTimeClickHandler = (endTimeIndex) => {
    setIsEndTimeHeart(
      isEndTimeHeart.map((item, Checkedindex) => {
        if (Checkedindex === endTimeIndex) {
          return (item = !item);
        } else {
          return item;
        }
      })
    );
  };

  // 더보기 클릭
  const MoreBtnClickHandler = ( status ) => {
    if( status === "realTime" ){
      console.log("More real time")
    }else if( status === "manner" ){
      console.log("More manner");
    }else{
      console.log("More endTime");
    }
  };
  return (
    <MainWrap>
      <Tag />
      <Search />
      <Category />
      <ContentDivide />
      {/* 실시간 벙글 */}
      <MainContentWrap>
        <MainContentTitle>실시간 벙글</MainContentTitle>
        <MainContentItemWrap>
          {ContentArray.map((item, index) => {
            return (
              <MainContentItemFrame key={index}>
                <MainContentItemImg />
                <MainContentItemImgTemp src={IconTemp} />
                <MainContentTextWrap>
                  <MainContentTitleWrap>
                    <MainContentItemTitle>{item}</MainContentItemTitle>
                    <MainContentItemLike src={ isRealTimeHeart[ index ] ? IconLike :IconUnlike} onClick={ () => HeartRealTimeClickHanlder( index ) } />
                  </MainContentTitleWrap>
                  <MainContentItemTimePeople>
                    16시 시작 예정 (0/5)
                  </MainContentItemTimePeople>
                </MainContentTextWrap>
              </MainContentItemFrame>
            );
          })}
        </MainContentItemWrap>
        <MainContentButton onClick={() => MoreBtnClickHandler( "realTime" )}>더보기</MainContentButton>
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
          {ContentArray.map((item, index) => {
            return (
              <MainContentItemFrame key={index}>
                <MainContentItemImg />
                <MainContentItemImgTemp src={IconTemp} />
                <MainContentTextWrap>
                  <MainContentTitleWrap>
                    <MainContentItemTitle>{item}</MainContentItemTitle>
                    <MainContentItemLike src={ isEndTimeHeart[ index ] ? IconLike : IconUnlike } onClick={ () => { HeartEndTimeClickHandler( index ) } }/>
                  </MainContentTitleWrap>
                  <MainContentItemTimePeople>
                    16시 시작 예정 (0/5)
                  </MainContentItemTimePeople>
                </MainContentTextWrap>
              </MainContentItemFrame>
            );
          })}
        </MainContentItemWrap>
        <MainContentButton onClick={ () => { MoreBtnClickHandler( "endTime") }}>더보기</MainContentButton>
      </MainContentWrap>
    </MainWrap>
  );
}

export default Main;
