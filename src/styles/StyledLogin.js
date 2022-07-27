import styled from "styled-components";

export const LoginWrap = styled.div`
    width: 100%; // 100% -> 375px
    /* max-height: 780px; */
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* border: 1px solid black; */
`;

export const LoginInquiry = styled.div`
  width: 70px;
  height: 17px;
  font-weight: 700;
  font-size: 12px;
  line-height: 17px;

  color: #d9d9d9;

  margin-top: 26px;
  margin-right:20px;
  align-self: flex-end;
`;

export const LoginImageWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const LoginTitle = styled.img`
  font-weight: 700;
  font-size: 32px;
  line-height: 46px;

  color: #000000;

  margin-top:46px;
`;

export const LoginExplain = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;

  color: #545454;
`;

export const LoginLogo = styled.img`
  width: 298px;
  height: 164px;
  margin-top: 64px;
  margin-bottom: 50px;
`;

export const LoginContentWrap = styled.div`
    width: 89%;
    height: 114px;

    row-gap: 8px;
    display: flex;
    flex-direction: column;
    position: relative;
`;


export const LoginEmailText = styled.span`
  font-weight: 700;
  font-size: 12px;
  line-height: 17px;
  text-align: center;
  position: absolute;
  color: #595959;

  left: 34px;
  top:17px;
`;

export const LoginEmailInput = styled.input`
  width: 72.7%;
  height: 53px;

  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  border: none;
  padding-left: 89px;
  /* margin-bottom: 8px; */

  &::placeholder {
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;

    color: #808080;
  }
  &:focus{
    outline: none;
  }
`;

export const LoginPasswordInput = styled.input`
  width: 72.7%;
  height: 53px;

  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  border: none;
  padding-left: 89px;

  &::placeholder {
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;

    color: #808080;
  }
  &:focus{
    outline: none;
  }
`;

export const LoginEmailClearBtn = styled.img`
    width: 16px;
    height: 16px;
    position: absolute;
    right: 20px;
    top: 19px;
`;

export const LoginPasswordText = styled.span`
  font-weight: 700;
  font-size: 12px;
  line-height: 17px;
  text-align: center;
  position: absolute;
  color: #595959;

  left: 34px;
  top: 78px;
`;

export const LoginPasswordClearBtn = styled.img`
    width: 16px;
    height: 16px;
    position: absolute;
    right: 20px;
    top: 78px;
`;

export const LoginSns = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;

  font-weight: 400;
  font-size: 10px;
  line-height: 14px;

  color: #d9d9d9;
  margin-top: 16px;
  & > p {
    font-weight: 400;
    /* font-size: 13px; */
    /* line-height: 18px; */
    /* color: rgb(122, 127, 134); */
    text-align: center;
    padding: 0px 18.5px;

    font-weight: 400;
    font-size: 10px;
    line-height: 14px;

    /* Dark Gray */

    color: #434343;
  }

  & > span {
    display: block;
    width: 105.5px;
    height: 1px;
    background: #d9d9d9;
  }
`;

export const LoginSnsIconWarp = styled.div`
  display: flex;
  width: 56%;
  justify-content: space-between;

  margin-top: 10px;
  margin-bottom: 20px;

  & > img {
    cursor:pointer
  }
`;

export const SignupFindPasswordWarp = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  column-gap: 7px;
  margin-bottom : 40px;
`;

export const LoginBottomText = styled.span`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;

  /* Gray */

  color: #898989;
`;

// 로그인 모달

export const ModalWrapper = styled.div`
  box-sizing: border-box;
  /* display: ${(props) => (props.visible ? 'block' : 'none')}; */
  display: block;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10000;
  overflow: auto;
  outline: 0;
`; 

export const ModalOverlay = styled.div`
  box-sizing: border-box;
  /* display: ${(props) => (props.visible ? "block" : "none")}; */
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9999;
`;

export const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: 335px;
  /* max-width: 178px; */
  height: 178px;
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
  top: 229px;
  margin: 0 auto;
`

export const ModalContentWrap = styled.div`
  width: 220px;
  height: 128px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;

  & > h3 {
    font-weight: 700;
    font-size: 16px;
    line-height: 23px;
    margin-bottom: 6px;
  }

  & > div {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
  }
`;

export const ModalDivider = styled.div`
  width: 335px;
  border-bottom: 1px solid #898989;
`;

export const ModalButton = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  cursor: pointer;
`;

export const ModalButtonWrap = styled.div`
  width:100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ModalCancelButton = styled.div`
  width: 50%;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #BEBEBE;;
  margin-top: 10px;
  cursor: pointer;
`;

export const ModalDeleteButton = styled.div`
  width: 50%;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  color:red;
  cursor: pointer;
`;