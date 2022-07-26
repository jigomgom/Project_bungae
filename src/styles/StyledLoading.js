import styled from "styled-components";

export const LoadingWrap = styled.div`
  width: 100%; // 100% -> 375px
  /* max-height: 780px; */
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

export const LoadingLogo = styled.img`
    margin-top: 65%;
    margin-bottom: 15px;
`;

export const LoadingText = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 46px;

  color: #000000;
`;