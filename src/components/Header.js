import React from 'react'
import { HeaderWrap, BackKey, Logo, HeadrIconsWrap, IconNotification, IconSetting } from "../styles/StyledHeader.js";

import Notification from "../assets/icon-notification.svg";
import Setting from "../assets/icon-setting.svg";
import IconBackKey from "../assets/icon-left-arrow.svg"

function Header() {
  return (
    <HeaderWrap>
      { window.location.pathname === "/post" ? <BackKey src={IconBackKey}/> : <Logo>Logo</Logo> }
      <HeadrIconsWrap>
          <IconNotification src={Notification}/>
          <IconSetting src={Setting}/>
      </HeadrIconsWrap>
    </HeaderWrap>
  )
};

export default Header;