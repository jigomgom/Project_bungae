import styled from "styled-components";

export const CreatePostWrap = styled.div`
    width: 100%; // 100% -> 375px
    display: flex;
    flex-direction: column;
`;

export const PostTilteDiv = styled.div`
    width: 89%;
    position: relative;
    margin: auto;
`;

export const PostTitle = styled.input`
    width: 100%;
    height: 27px;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    /* border를 밑줄만 만듦 */
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1.2px solid #D9D9D9;
    padding-right: 5px;
    margin-bottom: 15px;
    &::placeholder{
        /* placeholder 글씨 색 변경 */
        color: #D9D9D9;
    }
    &:focus{
        /* 클릭 시 ouline 지우기 */
        outline: none;
    }
`

export const DeleteButton = styled.img`
    position: absolute;
    top: 5px;
    right: 0px;
    cursor: pointer;
`;

export const PostBody = styled.textarea`
    width: 89%;
    height: 384px;
    margin: auto;
    font-family: 'Noto Sans KR', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
    /* 크기 조절 방지 */
    resize: none;
    border: none;
    &::placeholder{
        /* placeholder 글씨 색 변경 */
        color: #D9D9D9;
    }
    &:focus{
        /* 클릭 시 ouline 지우기 */
        outline: none;
    }
`;

export const PostUploadPictureWrap = styled.div`
    width: 89%;
    height: 187px; // 187 / 780 * 100 = 23.9%
    margin: auto;
    margin-top: 25px;
    display: flex;
    flex-direction: column;
`;

export const UploadPictureWrap = styled.div`
    width: 100%;
    display: flex;
`;

export const UploadTitle = styled.h3`
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 15px;
`;
export const FileUploadWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* margin-left: 15px; */
    /* margin: auto; */
`;
export const FileInputLabel = styled.label`
    width: 107px;
    height: 107px;
    cursor: pointer;
    position: relative;
`;

export const FileClearIcon = styled.img`
    position: absolute;
    width: 16px;
    height: 16px;
    right: 5px;
    top:5px;
`;

export const FileInputImg = styled.img`
    width: 107px;
    height: 107px;
    object-fit: cover;
    border-radius: 10px;
    /* object-fit: fill; */
    /* object-fit: contain; */
    /* object-fit: scale-down; */
`;

export const FileInput = styled.input`
    display: none;
`;


export const DividerStyle = styled.div`
  height: 1px;
  background: #d9d9d9;
`;
// 카테고리 시작
export const PostCategoriesWrap = styled.div`
    width: 89%;
    height: 138px; 
    display: flex;
    flex-direction: column;
    margin: auto;
`;

export const PostCategoriesItemWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 11px;
  column-gap: 5px;
`;

export const PostCategoriesItem = styled.div`
  width: 62px;
  height: 26px;
  background-color: ${( props ) => props.isChecked ? "#FFC632" : "#d9d9d9"};//#d9d9d9;//${( props ) => props.isChecked ? "#d9d9d9" : "black"};
  border-radius: 5px;
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;

  color: ${( props ) => props.isChecked ? "white" : "#8b8b8b"};
  text-align: center;
  cursor: pointer;
`;

// 채팅 선택

export const SelectChatWrap = styled.div`
    width: 100%;
    height: 125px;
    display: flex;
    flex-direction: column;
`;

export const SelectChatBox = styled.div`
    width: 89%;
    margin: auto;
`;

export const SelectChatBtnWrap = styled.div`
    width: 334px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
`;


export const SelectChatLetterBtn = styled.div`
  /* position: relative; */
  width: 160px;
  height: 48px;
  background-color: ${(props) => (props.CheckedState ? "#FFC634" : "#D9D9D9")};
  border-radius: 8px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  color: ${(props) => (props.CheckedState ? "#FFFFFF" : "#898989")};

  cursor: pointer;
`;

export const SelectChatVideoBtn = styled.div`
  /* position: relative; */
  width: 160px;
  height: 48px;
  background-color: ${(props) => (props.CheckedState ? "#FFC634" : "#D9D9D9")};
  border-radius: 8px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  color: ${(props) => (props.CheckedState ? "#FFFFFF" : "#898989")};

  cursor: not-allowed;
`;



export const SelectChatBtnName = styled.span`
    font-weight: 400;
    font-size: 12px;
    /* position: absolute; */
    /* left: 70px; */
`;

export const SelectChatBtnImg = styled.img`
    position: absolute;
    width: 20px;
    height: 20px;
    top: 14px;
    left: 44px;
`;

// 해쉬 태그 시작
export const HashTagWrap = styled.div`
    width: 89%;
    /* height: 155px; */
    height: 170px;
    display: flex;
    flex-direction: column;
    margin: auto;
`;

export const HashTagInput = styled.input`
    width: 90%;
    height: 49px;
    border: 1px solid #FFC634;
    border-radius: 10px;
    text-align: left;
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 11px;
    &::placeholder{
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 17px;
        color: #D9D9D9;
    }
    &:focus{
        outline: none;
    }
`;
 export const HashTagItemWrap = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 11px;
    /* margin: auto auto 11px auto; */
 `;

export const HashTagItem = styled.div`
    height: 20px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    padding: 0px 10px;

    color: #FFFFFF;
    background-color: #FFC634;
    border-radius: 100px;
    cursor: pointer;
`;

// 시간 설정 시작
export const SetTimeWapper = styled.div`
    width: 89%;
    height: 155px;
    /* height: 170px; */
    display: flex;
    flex-direction: column;
    margin: auto;
`;

export const TimeItemWapper = styled.div`
    display: flex;
    width: 148px;
    height: 26px;
    column-gap: 12px;
`;

export const TimeSelectToday = styled.div`
  width: 68px;
  height: 26px;
  background-color: ${( props ) => props.isToday ? "#FFC632" : "#d9d9d9"};//#ffc632;
  border-radius: 5px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${( props ) => props.isToday ? "#FFFFFF" : "#898989"};;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const TimeSelectTommrow = styled.div`
  width: 68px;
  height: 26px;
  background-color: ${( props ) => props.isToday ? "#d9d9d9" : "#FFC632" };//#ffc632;
  border-radius: 5px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${( props ) => props.isToday ? "#898989" : "#FFFFFF"};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const TimeInputWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-top:25px;
`;

export const TimeInputHour = styled.input`
  width: 123px;
  height: 27px;
  border: 1px solid #898989;
  border-radius: 5px;
  text-align: right;
  padding-right:13px;

  &:focus {
    outline: none;
  }
`;

export const TimeInputMinute = styled.input`
  width: 123px;
  height: 27px;
  border: 1px solid #898989;
  border-radius: 5px;
  text-align: right;
  padding-right:13px;
  &:focus {
    outline: none;
  }
`;

// 주소 입력
export const SearchAddressWrap = styled.div`
    width: 89%;
    height: 140px;
    display: flex;
    flex-direction: column;
    margin: auto;
`;


export const SearchAddressItemWrap = styled.div`
    width: 100%;
    display: flex;
    position: relative;
    justify-content: space-around;
`
export const SearchAddressInput = styled.input`
    width: 72%;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1.2px solid #D9D9D9;

    font-weight: 400;
    font-size: 12px;
    line-height: 17px;

    &::placeholder{
       color: #D9D9D9;
    }
    &:focus{
        outline: none;
    }
`;
export const SearhAddressBtn = styled.div`
    width: 77px;
    height: 32px;
    background-color: #FFC634;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;

    color: #FFFFFF;
    cursor: pointer;
`;

export const SearhAddressCloseBtn = styled.img`
    height: 16px;
    width: 16px;
    /* background-color: black; */
    position:absolute;
    top: 1000px;
    left: 360px;
    z-index:3;
    cursor: pointer;
`;

export const SearchCurrentPositionItemWrap = styled.div`
    width: 100%;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    margin-top:22px;
    margin-left:5px;
    cursor: pointer;
`

export const SearchCurrentPositionIcon = styled.img`
    width: 13px;
    height: 13px;
    margin-right: 8px;    
`;

export const SearchCurrentPositionTitle = styled.span`
  width: 58px;
  height: 14px;
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;

  color: #9a9a9a;
`;

export const SearchCurrentPositionIconInput = styled.span`
    width: 150px;
    height: 14px;
    font-weight: 400;
    font-size: 10px;
    line-height: 14px;

    color: #D9D9D9;
`;

// 인원 수 설정

export const PostPeopleCount = styled.div`
    width: 89%;
    height: 101px;
    margin:auto;
    flex-direction: column;
    display: flex;
`;

export const PostPeopleCountTitleWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    text-align: center;
    align-items: center;
`;

export const PostPeopleTitle = styled.div`
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
`;

export const PostPeopleCountTitle = styled.input`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  border: 1px solid #898989;
  border-radius: 5px;
  width: 144px;
  height: 25px;
  margin-right:5px;
  color: #b3b3b3;
  &:focus {
    outline: none;
  }
`;

export const PostCreateButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 89%;
  height: 50px;
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;
  background-color: #FFC632;
  border-radius: 10px;
  margin-left: 20px;
  cursor: pointer;
  margin-top: 27px;
  margin-bottom: 27px;
`;