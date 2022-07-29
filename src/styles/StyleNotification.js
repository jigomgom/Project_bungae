import styled from "styled-components";

export const NotificationWrap = styled.div`
    width: 100%; // 100% -> 375px
    display: flex;
    flex-direction: column;
    align-items: center;
    /* border: 1px solid red; */
`;

export const NotificationContent = styled.div`
    width: 90%;
    height: 121px;
    display: flex;
    /* position: relative; */
    flex-direction: column;
    border-bottom: 1.2px solid #D9D9D9;
`;

export const NotificationTitleWrap = styled.div`
    display: flex;
    padding: 15px;
    flex-direction: column;
    justify-content: center;
    /* align-items: center;/ */
`;

export const NotificationTitle = styled.div`
  /* 두줄 이상이면 처리 */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  margin-left: 12px;
  color: #000000;
`;

export const NotificationDisplay = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;

  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-wrap: break-word;

  color: #6a6a6a;
`;

export const NofiticationDate = styled.div`
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  margin-left: auto;
  margin-right:15px;
  color: #969696;
`;