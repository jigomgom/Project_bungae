import React from 'react'

import { useSelector, useDispatch } from 'react-redux';

import { NotificationWrap, NotificationContent, NotificationTitleWrap, NotificationTitle,  NotificationDisplay, NofiticationDate } from "../styles/StyleNotification";
import { useNavigate } from 'react-router-dom';

import { clearNotificationState } from "../redux/modules/BungleSlice";

import { PostHeaderWrap, ChattingBackKey, HeadrIconsWrap, IconSetting} from "../styles/StyledHeader";
import Setting from "../assets/icon-setting.svg";
import IconBackKey from "../assets/icon-left-arrow.svg";
import IconBell from "../assets/icon-bell.svg";

function Notification() {
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const NotificationList = useSelector( state => state.Bungle.NoitficationList );
    
    const changeDateFormat = ( date ) => {
      if (date) {
        const dateList = date?.split("T");
        const newDate =
          dateList[0].substring(5, dateList[0].length).replace("-", "월 ") +
          "일, " +
          dateList[1].substring(0, 5);

        return newDate;
      }
    };
    // Back key 클릭 동작
    const BackkeyClickHandler = () => {
      dispatch( clearNotificationState( ) );
      navigate(-1);
    };

    // 알림 list 클릭 동작
    const notificationListClickHandler = () => {
      dispatch( clearNotificationState());
      navigate("/chatlist");
    };

  return (
    <NotificationWrap>
      {/* 헤더 */}
      <PostHeaderWrap>
        <ChattingBackKey src={IconBackKey} onClick={() => { BackkeyClickHandler() }} />
        <HeadrIconsWrap>
          {/* <IconNotification src={IconNotificationNonActive} /> */}
          <IconSetting src={Setting} />
        </HeadrIconsWrap>
      </PostHeaderWrap>
      {/* body */}
      
        { NotificationList.map( ( item, index ) => {
          return (
            <NotificationContent key={index} onClick={()=>{notificationListClickHandler()}}>
              <NotificationTitleWrap>
                <div style={{ display: "flex", marginTop: "10px" }}>
                  {/* <span style={{ color: "#FFC632" }} className="material-icons">
                    notifications
                  </span> */}
                  <img style={{ width:"24px", height:"24px"}} src={IconBell} alt=""/>
                  <NotificationTitle>{item.nickname}</NotificationTitle>
                </div>
                <NotificationDisplay>{item.message}</NotificationDisplay>
                <NofiticationDate>{changeDateFormat( item.createdAt )}</NofiticationDate>
              </NotificationTitleWrap>
            </NotificationContent>
          );
        })}
      
    </NotificationWrap>
  );
}

export default Notification