import styled from "styled-components";

export const NotFoundWrap = styled.div`
  width: 100%; // 100% -> 375px
  /* max-height: 780px; */
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

export const NotFoundImg = styled.img`
  margin-top: 45%;
`;

export const NotFoundTitle = styled.div`
  margin-top: 20px;
  font-weight: 700;
  font-size: 30px;
  line-height: 23px;
  margin-bottom: 15px;
`;

export const NotFoundContent = styled.div``;

export const NotFoundMain = styled.div`
  background-color: #ffc632;
  width: 335px;
  height: 50px;
  font-weight: 700;
  font-size: 18px;
  line-height: 26px; /* identical to box height */
  text-align: center; /* Black */
  align-items: center;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  margin-top: 40px;
`;
