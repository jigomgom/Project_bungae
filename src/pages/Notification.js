import React from 'react'
import { NotificationWrap, NotificationContent, NotificationTitleWrap, NotificationTitle,  NotificationDisplay, NofiticationDate } from "../styles/StyleNotification";
import { useNavigate } from 'react-router-dom';

import { PostHeaderWrap, ChattingBackKey, HeadrIconsWrap, IconSetting} from "../styles/StyledHeader";
import Setting from "../assets/icon-setting.svg";
import IconBackKey from "../assets/icon-left-arrow.svg";

function Notification() {
    const navigate = useNavigate();
  return (
    <NotificationWrap>
      {/* 헤더 */}
      <PostHeaderWrap>
        <ChattingBackKey src={IconBackKey} onClick={() => {}} />
        <HeadrIconsWrap>
          {/* <IconNotification src={IconNotificationNonActive} /> */}
          <IconSetting src={Setting} />
        </HeadrIconsWrap>
      </PostHeaderWrap>
      {/* body */}
      <NotificationContent>
        <NotificationTitleWrap>
          <div style={{ display: "flex", marginTop: "10px" }}>
            <span style={{ color: "#FFC632" }} className="material-icons">
              notifications
            </span>
            <NotificationTitle>Lorem ipsum dolor sit amet</NotificationTitle>
          </div>
          <NotificationDisplay>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum
            dolor sit amet, consectetur adipiscing elit.
          </NotificationDisplay>
          <NofiticationDate>6월 20일, 19:00</NofiticationDate>
        </NotificationTitleWrap>
      </NotificationContent>
    </NotificationWrap>
  );
}

export default Notification