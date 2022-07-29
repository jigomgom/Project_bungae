import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import CategorySearchCard from "../components/CategorySearchCard";
import { getIntervalNotification } from "../redux/modules/BungleSlice";


//CSS
import "../styles/TagCategorySearch.css";
//Components

import {
  PostHeaderWrap,
  ChattingBackKey,
  HeadrIconsWrap,
  IconNotification,
  IconSetting
} from "../styles/StyledHeader.js";

import {
  FooterWrap,
  FooterIconWrap,
  FooterIconImg,
  FooterIconText,
  FooterAddBungae,
} from "../styles/StyledFooter.js";

import { LoadingWrap, LoadingLogo, LoadingText } from "../styles/StyledLoading";

// icon
import IconLoadingLogo from "../assets/icon-splash-logo.svg";

import Notification from "../assets/icon-notification.svg";
import NotificationOn from "../assets/icon-notification-on.svg";
import Setting from "../assets/icon-setting.svg";
import IconBackKey from "../assets/icon-left-arrow.svg";
import IconMyPoint from "../assets/icon-mylocation.svg";
import IconMainLogo from "../assets/icon-main-logo.svg";

// Footer Icons
import IconHomeCurrent from "../assets/icon-home-current.svg";
import IconLocation from "../assets/icon-location.svg";
import IconChat from "../assets/icon-chat.svg";
import IconMyBungae from "../assets/icon-account.svg";
import IconCreate from "../assets/icon-create-post.svg";
import IconEdit from "../assets/icon-edit-footer.svg";

function CategorySearch() {
  const dispatch = useDispatch();
  const ownerCheck = useSelector((state) => state.Bungle.isOwner);
  // isLoad
  const [ isLoad, setIsLaod ] = useState( true );
  //
  const categoryList = useSelector( state => state.Bungle.categoriesList );
  // console.log( categoryList );

  const navigate = useNavigate();
  const { category } = useParams();

  // 알림 call
  const interval = useRef(null);
  // 알림 state
  const NotificationState = useSelector( state => state.Bungle.isReadNotification );
  const [ notificationState, setNotificationState ] = useState( NotificationState);
  useEffect(()=>{
    setNotificationState( NotificationState );
  },[NotificationState])

  // 알림 interval
  useEffect(()=>{
    interval.current = setInterval( async()=>{
      dispatch( getIntervalNotification() );
    }, 5000);
    return () => clearInterval( interval.current );
  },[])

  useEffect(()=>{
    // if( isLoad ){
      window.scrollTo(0,0);
    //   setTimeout(()=>{ setIsLaod( false )}, 200);
    // }
  },[]);
  //검색 정렬 드롭박스
  const [selected, setSelected] = React.useState("최신순");
  const handleSelect = (e) => {
    // console.log(e.target.value);
    setSelected(e.target.value);
  };
  // console.log(selected);
  const searchOptions = [
    { key: 1, value: "최신순" },
    { key: 2, value: "인기순" },
  ];
  return (
    <div className="top-category-search-wrap">
      <PostHeaderWrap>
        <ChattingBackKey
          src={IconBackKey}
          onClick={() => {
            navigate("/main");
          }}
        />

        <HeadrIconsWrap>
        {notificationState ? (
                <IconNotification src={NotificationOn} 
                onClick={() => {
                      navigate("/notification");
                    }}
                />
              ) : (
                <IconNotification src={Notification} />
              )}
          <IconSetting style={{ display:"none"}} src={Setting} />
        </HeadrIconsWrap>
      </PostHeaderWrap>
      <div className="search-result-wrap">
        <div className="search-result-header">
          <p className="search-result-header-title">{category}</p>
          {/* <select
            className="search-result-header-dropbox"
            onChange={handleSelect}
            value={selected}
          >
            {searchOptions.map((item, index) => (
              <option key={item.key} value={item.value}>
                {item.value}
              </option>
            ))}
          </select> */}
        </div>
        <div className="search-result-card-wrap">
          {categoryList ?
            categoryList.map((item, index) => {
              return <CategorySearchCard categoryList={item} />;
            }) : (<LoadingWrap >
              {/* <LoadingLogo src={IconLoadingLogo}/> */}
              <LoadingText style={{ marginTop:"60%", color:"#898989" }}>검색 결과 벙글이 없습니다.</LoadingText>
            </LoadingWrap>)}
        </div>
      </div>
      <FooterWrap>
          <FooterIconWrap
            onClick={() => {
              navigate("/main");
            }}
          >
            <FooterIconImg src={IconHomeCurrent} />
            <FooterIconText style={{ color:"#FFC632" }}>홈</FooterIconText>
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
    </div>
  );
}

export default CategorySearch;
