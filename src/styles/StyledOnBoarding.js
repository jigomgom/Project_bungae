import styled from "styled-components";

export const OnBoardWrapper = styled.div`
  width: 100%; // 100% -> 375px
  height: 100%;
  /* max-height: 722px; */
  display: flex;
  flex-direction: column;
  /* border: 1px solid red; */
`; 

export const OnBoardContentWrap = styled.div`
  width: 100%;
  /* height: 300px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  /* background-color: red; */
`;

export const OnBoardPageText = styled.img`
  /* margin-top: 16.5%; */
  margin-top: 8.5%;
  margin-bottom: 6.2%;
  /* margin-top: 61px; */
  /* margin-bottom: 14.2%; */
  /* margin-bottom: 52.45px; */
  width: 282px;
  height: 105px;
  /* background-color: white; */
`;

export const OnBoardPageImg = styled.img`
  width: 375px;
  height: 472.55px;
`;
export const OnBoardButton = styled.div`
  cursor: pointer;
  width: 375px;
  height: 78px;
  background-color: #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  /* identical to box height */
  text-align: center;
  /* Black */
  color: #000000;
`;

export const OnBoardFinalText = styled.img`
  width: 205px;
  height: 81px;
  margin-top: 57px;
  margin-bottom:95px;
`

export const OnBoardFinalImg = styled.img`
  width: 289px;
  height: 158.99px;
  margin-bottom: 71px;
`
export const OnBoardSubText = styled.img`
  width: 257px;
  height: 32px;
  margin-left: 30px;
  margin-top:10px;
`
export const CheckLabel = styled.label`
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  /* identical to box height, or 21px */

  text-align: center;

  /* Dark Gray */

  color: #434343;
`;

export const CheckBox = styled.input`
  cursor: pointer;
  appearance: none;
  border: 1px solid #c8cad2;
  border-radius: 2px;
  position: relative;
  width: 20px;
  height: 20px;
  background-color: #D9D9D9;
  top: -1px;
  margin-right: 8px;
  /* display: flex; */
  /* flex-direction: row; */
  align-items: center;
  justify-content: center;
  /* flex: 0 0 auto; */
  border-color: #D9D9D9;
  /* background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e"); */
  background-image: url("https://user-images.githubusercontent.com/107230384/181822139-ff0d2045-a462-40cc-b9e9-6d81598a10a2.svg");
  background-size: 100% 100%;
  background-position: 50%;
  background-repeat: no-repeat;
  background-color: #D9D9D9;

  &:checked {
    border-color: #FFC632;
    /* background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e"); */
    background-image: url("https://user-images.githubusercontent.com/107230384/181821214-542e96d9-86c1-45e4-9d8f-c321942a886c.svg");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #FFC632;
  }
`;

