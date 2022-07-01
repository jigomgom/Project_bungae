import React from 'react'
import { HeaderWrap, Logo, HeadrIconsWrap, IconNotification, IconSetting } from "../styles/StyledHeader.js";

import Notification from "../assets/icon-notification.svg";
import Setting from "../assets/icon-setting.svg";

function Header() {
  return (
    <HeaderWrap>
      <Logo>Logo</Logo>
      <HeadrIconsWrap>
          <IconNotification src={Notification}/>
          <IconSetting src={Setting}/>
      </HeadrIconsWrap>
    </HeaderWrap>
  )
};

export default Header;