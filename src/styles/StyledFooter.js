import styled from "styled-components";

export const FooterWrap = styled.div`
  // sticky로 하니 아이템이 다 안 차있을 경우 상단으로 붙어버림
  // fixed로 하니 해결
  position: fixed;
  bottom: 0px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  max-width: 375px;
  height: 8vh;
  background-color: white;
  box-shadow: inset 0px 1px 0px rgba(0, 0, 0, 0.1);
  z-index: 1000; // 안해주면 다른 아이템에 덮히는 경우가 발생
`;

// Main

export const MainFooterWrap = styled.div`
  position: fixed;
  bottom: 0px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  max-width: 375px;
  height: 8vh;
  background-color: white;
  box-shadow: inset 0px 1px 0px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

export const MapFooterWrap = styled.div`
  position: fixed;
  bottom: 0px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  max-width: 375px;
  height: 8vh;
  background-color: white;
  box-shadow: inset 0px 1px 0px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

export const FooterIconWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 36px;
  cursor: pointer;
`;

export const FooterIconImg = styled.img`
  width: 20px;
  height: 20px;
`;

export const FooterIconText = styled.span`
  font-weight: 400;
  font-size: 8px;
  line-height: 12px;
`;

export const FooterAddBungae = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  cursor: pointer;
`;
