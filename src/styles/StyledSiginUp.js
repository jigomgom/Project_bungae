import styled from "styled-components";

export const SignUpWrapper = styled.div`
    width: 100%; // 100% -> 375px
    height: 780px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
    /* padding: 40px 20px; */
    
`;

export const SiginUpEmailWrapper = styled.div`
    width: 89%;
    position: relative;
    margin-bottom: 45px;
`;

export const SignUpTitle = styled.h3`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;

  color: #000000;
`;

export const SignUpEmailInput = styled.input`
  width: 100%;
  /* height: 22px; */
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 1.2px solid #434343;

  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  padding: 10px 0;
  margin-bottom: 10px;

  &:focus{
    outline: none;
  }

  &::placeholder{
    color: #434343;
  }
`;

export const SignUpPasswordWrapper = styled.div`
    width: 89%;
    position: relative;
`;

export const SignUpPasswordInput = styled.input`
  width: 100%;
  /* height: 22px; */
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 1.2px solid #434343;

  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  padding: 10px 0;
  margin-bottom: 10px;
  &:focus{
    outline: none;
  }
  &::placeholder{
    color: #434343;
  }
`;

export const SignUpInputClearBtn = styled.img`
    width: 16px;
    height: 16px;
    position: absolute;
    right: 5px;
    top: 55px;
`;

export const SignUpPasswordClearBtn = styled.img`
    width: 16px;
    height: 16px;
    position: absolute;
    right: 5px;
    top: 55px;
`;

export const SignUpPasswordConfirmClearBtn = styled.img`
    width: 16px;
    height: 16px;
    position: absolute;
    right: 5px;
    top: 110px;
`;

export const SiginUpButton = styled.div`
    display: flex;
    /* position: fixed; */
    /* bottom: 100px; */
    width: 335px;
    height: 53px;
    /* max-width: 335px; */
    background: #D9D9D9;
    border-radius: 10px;
    margin: 300px auto auto;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

export const ErrorMessage = styled.div`
  width: 164px;
  height: 17px;
  color: #898989;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
`;

// 회원가입 모달

export const ModalWrapper = styled.div`
  box-sizing: border-box;
  /* display: ${(props) => (props.visible ? 'block' : 'none')}; */
  display: block;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
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
  z-index: 999;
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

  & > span {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
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