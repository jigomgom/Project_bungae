/*
  작성자 : 한지용
  작성 날짜 : 
  작성 내용 :
*/

import React from "react";
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
  MainContentItemTitle,
  MainContentItemTimePeople,
  MainContentButton,
} from "../styles/StyledMain.js";

import IconTemp from "../assets/icon-temp.svg";

const MainCategoryArray = ["실시간 번개", "시작 예정 번개", "운동 관련 번개"];

const ContentArray = [
  "Lorem ipsum1",
  "Lorem ipsum2",
  "Lorem ipsum3",
  "Lorem ipsum4",
];

function Main() {
  return (
    <MainWrap>
      <Tag />
      <Search />
      <Category />
      <ContentDivide />
      {MainCategoryArray.map((item, index) => {
        return (
          <MainContentWrap>
            <MainContentTitle>{item}</MainContentTitle>
            <MainContentItemWrap>
              {ContentArray.map((item, index) => {
                return (
                  <MainContentItemFrame>
                    <MainContentItemImg />
                    <MainContentItemImgTemp src={IconTemp} />
                    <MainContentTextWrap>
                      <MainContentItemTitle>{item}</MainContentItemTitle>
                      <MainContentItemTimePeople>
                        16시 시작 예정 (0/5)
                      </MainContentItemTimePeople>
                    </MainContentTextWrap>
                  </MainContentItemFrame>
                );
              })}
            </MainContentItemWrap>
            <MainContentButton>더보기</MainContentButton>
          </MainContentWrap>
        );
      })}
    </MainWrap>
  );
}

export default Main;
