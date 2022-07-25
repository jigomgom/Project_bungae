import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


//CSS
import "../styles/TagCategorySearch.css";
import {
  PostHeaderWrap,
  ChattingBackKey,
  HeadrIconsWrap,
  IconNotification,
  IconSetting
} from "../styles/StyledHeader.js";

// css
import {
  FooterWrap,
  FooterIconWrap,
  FooterIconImg,
  FooterIconText,
  FooterAddBungae,
} from "../styles/StyledFooter.js";

//Components
import SearchCard from "../components/SearchCard";
import Divider from "../components/Divider";
//Styled-Components
import Tag from "../components/Tag";
import Search from "../components/Search";

// Haeder icon
import Notification from "../assets/icon-notification.svg";
import Setting from "../assets/icon-setting.svg";
import IconBackKey from "../assets/icon-left-arrow.svg";

// Footer Icons
import IconHome from "../assets/icon-home.svg";
import IconLocation from "../assets/icon-location.svg";
import IconChat from "../assets/icon-chat.svg";
import IconMyBungae from "../assets/icon-account.svg";
import IconCreate from "../assets/icon-create-post.svg";
import IconEdit from "../assets/icon-edit-footer.svg";


function TagSearch() {
  const ownerCheck = useSelector((state) => state.Bungle.isOwner);
  //
  const navigate = useNavigate();
  // isLoad
  const [ isLoad, setIsLoad ] = useState( true );
  //검색 정렬 드롭박스
  const searchList = useSelector( state => state.Bungle.moreList );
  console.log( searchList );
  const [selected, setSelected] = React.useState("최신순");
  const handleSelect = (e) => {
    // console.log(e.target.value);
    setSelected(e.target.value);
  };
  useEffect(()=>{
    if( isLoad ){
      window.scrollTo(0,0);
      setTimeout(()=>{ setIsLoad( false )}, 200 );
    }
  },[])

  // console.log(selected);
  const searchOptions = [
    { key: 1, value: "최신순" },
    { key: 2, value: "인기순" },
  ];

  return (
    <div>
      <PostHeaderWrap>
        <ChattingBackKey
          src={IconBackKey}
          onClick={() => {
            navigate("/main");
          }}
        />

        <HeadrIconsWrap>
          <IconNotification src={Notification} />
          <IconSetting src={Setting} />
        </HeadrIconsWrap>
      </PostHeaderWrap>
      <Tag />
      <Search />
      <div className="search-result-wrap">
        <Divider />
        <div className="search-result-header">
          <p className="search-result-header-title">검색 결과</p>
          <select
            className="search-result-header-dropbox"
            onChange={handleSelect}
            value={selected}
          >
            {searchOptions.map((item, index) => (
              <option key={item.key} value={item.value}>
                {item.value}
              </option>
            ))}
          </select>
        </div>
        <div className="search-result-card-wrap">
          { searchList && searchList.map( ( item, index ) => {
            return <SearchCard key={index} moreList={item} />
          })}
          {/* <SearchCard />
          <SearchCard />
          <SearchCard />
          <SearchCard />
          <SearchCard /> */}
        </div>
      </div>
      <FooterWrap>
          <FooterIconWrap
            onClick={() => {
              navigate("/main");
            }}
          >
            <FooterIconImg src={IconHome} />
            <FooterIconText >홈</FooterIconText>
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
export default TagSearch;
