import styled from "styled-components";

export const OnBoardModalWrapper = styled.div`
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

export const OnBoardModalOverlay = styled.div`
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

export const OnBoardModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: 335px;
  /* max-width: 178px; */
  height: 335px;
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
  top: 229px;
  margin: 0 auto;
`

export const OnBoardModalContentWrap = styled.div`
  width: 300px;
  height: 300px;
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

export const OnBoardModalDivider = styled.div`
  width: 335px;
  border-bottom: 1px solid #898989;
`;

export const OnBoardModalButton = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  cursor: pointer;
`;

export const OnBoardModalButtonWrap = styled.div`
  width:100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const OnBoardModalCancelButton = styled.div`
  width: 50%;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #BEBEBE;;
  margin-top: 10px;
  cursor: pointer;
`;

export const OnBoardModalDeleteButton = styled.div`
  width: 50%;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  color:red;
  cursor: pointer;
`;

// 1페이지 이미지
export const OnboardImageWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const OnboardImgTitle = styled.img`
  font-weight: 700;
  font-size: 32px;
  line-height: 46px;
  width: 150px;
  height: 40px;

  color: #000000;

  margin-top:46px;
`;

export const OnboardImgLogo = styled.img`
  width: 200px;
  height: 100px;
  margin-top: 10px;
`;

export const OnboardTitle = styled.span`
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;
  margin-bottom: 15px;
`;

export const OnboardSubTitle = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 10px;
`;

export const OnboardButton = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 17px;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 40px;
  border-radius: 10px;
  margin-top: 15px;  
`;