import React from "react";
import { useNavigate } from "react-router-dom";

import {
  HeaderWrap,
  BackKey,
  Logo,
  PageTitle,
  HeadrIconsWrap,
  IconMyLocation,
  IconNotification,
  IconSetting,
} from "../styles/StyledHeader.js";

import Notification from "../assets/icon-notification.svg";
import Setting from "../assets/icon-setting.svg";
import IconBackKey from "../assets/icon-left-arrow.svg";
import IconMyPoint from "../assets/icon-mylocation.svg";
import IconMainLogo from "../assets/icon-main-logo.svg";

function Header() {
  const navigate = useNavigate();
  // root path, siginup, chat 일 때 렌더링 안되도록 방지
  if (
    window.location.pathname === "/" ||
    // window.location.pathname === "/signup" ||
    window.location.pathname === "/chat"
  ) {
    return null;
  }
  else if( window.location.pathname === "/signup" ){
    return(
      <HeaderWrap>
        <Logo style={{ visibility:"hidden"}} src={IconMainLogo}/>
        <BackKey src={IconBackKey} onClick={()=>{navigate("/")}}/>
        <PageTitle >회원가입</PageTitle>
        <HeadrIconsWrap>
          <IconMyLocation style={{ visibility:"hidden"}} src={IconMyPoint} />
          <IconNotification style={{ visibility:"hidden"}} src={Notification} />
          <IconSetting style={{ visibility:"hidden"}} src={Setting} />
        </HeadrIconsWrap>
      </HeaderWrap>
    )
  }

  // main 헤더
  else if (window.location.pathname === "/main") {
    return (
      <HeaderWrap>
        <Logo src={IconMainLogo}/>
        <BackKey style={{ visibility:"hidden"}}/>
        <PageTitle style={{ visibility:"hidden"}}></PageTitle>
        <HeadrIconsWrap>
          <IconMyLocation src={IconMyPoint} />
          <IconNotification src={Notification} />
          <IconSetting src={Setting} />
        </HeadrIconsWrap>
      </HeaderWrap>
    );
  }
  // 태그 검색, 카테고리 검색 결과 헤더
  else if (
    window.location.pathname === "/tagsearch" ||
    window.location.pathname === "/categorysearch" ||
    window.location.pathname === "/mylikebung"
  ) {
    return (
      <HeaderWrap>
        <Logo src={IconMainLogo}/>
        <BackKey src={IconBackKey} />
        <PageTitle style={{ visibility: "hidden" }}></PageTitle>

        <HeadrIconsWrap>
          <IconMyLocation style={{ visibility: "hidden" }} src={IconMyPoint} />
          <IconNotification src={Notification} />
          <IconSetting src={Setting} />
        </HeadrIconsWrap>
      </HeaderWrap>
    );
  }
  // 게시글 헤더
  else if (window.location.pathname === "/detailpost") {
    return (
      <HeaderWrap>
        <Logo style={{visibility:"hidden"}} src={IconMainLogo}/>
        <BackKey
          src={IconBackKey}
          onClick={() => {
            navigate("/main");
          }}
        />
        <PageTitle></PageTitle>

        <HeadrIconsWrap>
          <IconMyLocation style={{ visibility: "hidden" }} src={IconMyPoint} />
          <IconNotification src={Notification} />
          <IconSetting src={Setting} />
        </HeadrIconsWrap>
      </HeaderWrap>
    );
  }
  // 번개 생성
  else if (window.location.pathname === "/createpost") {
    return (
      <HeaderWrap>
        <Logo style={{visibility:"hidden"}} src={IconMainLogo}/>
        <BackKey
          src={IconBackKey}
          onClick={() => {
            navigate("/main");
          }}
        />
        <PageTitle>번개 생성</PageTitle>

        <HeadrIconsWrap>
          <IconMyLocation style={{ visibility: "hidden" }} src={IconMyPoint} />
          <IconNotification src={Notification} />
          <IconSetting src={Setting} />
        </HeadrIconsWrap>
      </HeaderWrap>
    );
  }
  // 번개 지도 헤더
  else if (window.location.pathname === "/map") {
    return (
      <HeaderWrap>
        <Logo style={{visibility:"hidden"}} src={IconMainLogo}/>
        <BackKey style={{ visibility: "hidden" }} src={IconBackKey} />
        <PageTitle>번개 지도</PageTitle>

        <HeadrIconsWrap>
          <IconMyLocation style={{ visibility: "hidden" }} src={IconMyPoint} />
          <IconNotification src={Notification} />
          <IconSetting src={Setting} />
        </HeadrIconsWrap>
      </HeaderWrap>
    );
  }

  // return (
  //   <HeaderWrap>
  //     <Logo>Logo</Logo>
  //     <BackKey src={IconBackKey} />
  //     <PageTitle>Title</PageTitle>

  //     <HeadrIconsWrap>
  //       <IconMyLocation src={IconMyPoint} />
  //       <IconNotification src={Notification} />
  //       <IconSetting src={Setting} />
  //     </HeadrIconsWrap>
  //   </HeaderWrap>
  // );
}

export default Header;
