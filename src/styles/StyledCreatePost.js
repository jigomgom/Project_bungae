import styled, { css } from "styled-components";

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
    margin-left: 15px;
    /* margin: auto; */
`;
export const FileInputLabel = styled.label`
    width: 92px;
    height: 92px;
    cursor: pointer;
`;

export const FileInputImg = styled.img`
    width: 92px;
    height: 92px;
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
  background-color: ${( props ) => props.isChecked ? "black" : "#d9d9d9"};//#d9d9d9;//${( props ) => props.isChecked ? "#d9d9d9" : "black"};
  border-radius: 5px;
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;

  color: #8b8b8b;
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
    position: relative;
    width: 160px;
    height: 48px;
    background-color: ${(props) => props.CheckedState ? "black" : "#D9D9D9" };
    border-radius: 8px;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

export const SelectChatVideoBtn = styled.div`
    position: relative;
    width: 160px;
    height: 48px;
    background-color: ${(props) => props.CheckedState ? "black" : "#D9D9D9" };
    border-radius: 8px;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

export const SelectChatBtnName = styled.span`
    font-weight: 400;
    font-size: 12px;
    position: absolute;
    left: 70px;
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
    height: 195px;
    display: flex;
    flex-direction: column;
    margin: auto;
`;

export const HashTageInput = styled.textarea`
    width: 94.5%;
    height: 120px; // 120 / 780 * 100 = 15.38%
    border: 1px solid #D9D9D9;
    border-radius: 10px;
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
    font-family: 'Noto Sans KR', sans-serif;
    font-style: normal;
    padding-top:15px;
    padding-left: 15px;
    margin-bottom: 25px;

    &::placeholder{
        font-weight: 400;
        font-size: 12px;
        line-height: 17px;
        color: #D9D9D9;
    }
    &:focus{
        outline: none;
    }
    resize: none;
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
  font-size: 12px;
  line-height: 17px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  width: 45px;
  height: 20px;
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
  background: #d9d9d9;
  border-radius: 10px;
  margin-left: 20px;
  cursor: pointer;
  margin-top: 27px;
  margin-bottom: 27px;
`;