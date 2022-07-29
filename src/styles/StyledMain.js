import styled from "styled-components";

export const MainWrap = styled.div`
    width: 100%; // 100% -> 375px
    /* height: 100%; */
    display: flex;
    flex-direction: column;
    margin-bottom: 90px;
    /* position: relative; */
`;

// notification 말풍선 추가
export const NotificationDiv = styled.div`
  /* display: none; */
  position: absolute;
  width: 205px;
  height: 40px;
  left: 448px;
  bottom: 62px;
  background: #484848;
  color: white;
  border-radius: 5px;
  padding: 12px 12.8px;
  z-index: 10000;
  &:after {
    border-top: 10px solid #484848;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 0px solid transparent;
    content: "";
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 10000;
  }
`;

export const ContentDivide = styled.div`
    width: 100%;
    height: 8px;

    background: #F3F3F3;
    margin: 20px 0px 0px 0px;
`;

export const MainContentWrap = styled.div`
    width: 100%;
    /* padding: 20px; */
    display: flex;
    flex-direction: column;
    margin-top: 25px;
`;

export const MainContentTitle = styled.div`
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
    padding-left: 24px;
    padding-bottom: 17px;
`;

export const MainContentItemWrap = styled.div`
    margin: auto;
    width: 89%;
    height: 441px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 13px;
    row-gap: 15px;
    cursor: pointer;
`;

export const MainContentItemFrame = styled.div`
    width: 161px;
    height: 213px;
    position: relative;
`;

export const MainContentItemImg = styled.img`
    width: 161px;
    height: 168px;
    border-radius: 10px;
    background: #D9D9D9;
    object-fit: cover;
    cursor: pointer;
`;

export const MainContentItemDefalutWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 161px;
    height: 168px;
    border-radius: 10px;
    background: white;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    /* object-fit: cover; */
    cursor: pointer;
`;

export const MainContentItemImgDefault = styled.img`
    width: 85px;
    height: 85px;
    border-radius: 10px;
    /* background: #D9D9D9; */
    object-fit: cover;
    cursor: pointer;
`;

export const MainContentItemImgTemp = styled.img`
    position: absolute;
    right: 11px;
    top: 14px;
`

export const MainContentTextWrap = styled.div`
    display: flex;
    flex-direction: column;
    
`;
export const MainContentTitleWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

export const MainContentItemTitle = styled.span`
    font-weight: 700;
    font-size: 16px;
    line-height: 23px;
    cursor: pointer;

    /* 한줄 말줄임 속성 */
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

export const MainContentItemLike = styled.img`
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
    margin-top:5px;
    cursor: pointer;
`;

export const MainContentItemTimePeople = styled.span`
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
`;

export const MainContentButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    
    width: 89%;
    height: 50px;
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    background-color: white;
    border-radius: 10px;
    border: 1px solid #434343;

    margin-left: 20px;
    margin-top: 25px;
    margin-bottom: 15px;
    cursor: pointer;
`;