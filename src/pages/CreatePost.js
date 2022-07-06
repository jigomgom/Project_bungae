import React, { useRef, useState } from "react";
import Divider from "../components/Divider";

// slider 추가
import Slider from "rc-slider";
import "../styles/rc-slider/index.css";

// css styled
import {
  CreatePostWrap,
  PostTilteDiv,
  PostTitle,
  DeleteButton,
  PostBody,
  PostUploadPictureWrap,
  UploadTitle,
  UploadPictureWrap,
  FileUploadWrap,
  FileInputLabel,
  FileInputImg,
  FileInput,
  DividerStyle,
  // 카테고리 설정
  PostCategoriesWrap,
  PostCategoriesItemWrap,
  PostCategoriesItem,
  // 채팅 설정
  SelectChatWrap,
  SelectChatBox,
  SelectChatBtnWrap,
  SelectChatLetterBtn,
  SelectChatVideoBtn,
  SelectChatBtnName,
  SelectChatBtnImg,
  // 해쉬태그
  HashTagWrap,
  HashTageInput,
  // 인원수 설정
  PostPeopleCount,
  PostPeopleCountTitleWrap,
  PostPeopleTitle,
  PostPeopleCountTitle,
  // 게시글 작성 버튼
  PostCreateButton,
} from "../styles/StyledCreatePost";
//icon
import IconClear from "../assets/icon-clear.svg";
import IconUpload from "../assets/icon-upload.svg";
import IconChatLetter from "../assets/icon-chat-gray.svg";
import IconChatVideo from "../assets/icon-chat-video.svg";

const CategoriesArray = [
  "맛집",
  "카페",
  "노래방",
  "운동",
  "친목",
  "전시",
  "여행",
  "쇼핑",
  "스터디",
  "게임",
];

function CreatePost() {
  // 카테고리 클릭 판별용 state
  const [isCategoryClick, setIsCategoryClick] = useState([
    false,false,false,false,false,false,false,false,false,false,
  ]);
  // 인원 설정 숫자만
  const [onlyNumber, setOnlyNumber] = useState("2");
  // 문자, 화상 여부 판별
  const [isLetter, setIsLetter] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  // 채팅 버튼 클릭 여부 판별
  const [chatBtnState, setChatBtnState] = useState(false);
  // 번개 이름 타이틀 용 ref
  const InputTitle_Ref = useRef();
  // x 버튼 클릭 시, input 클리어
  const clearBtnOnClickHandler = () => {
    InputTitle_Ref.current.value = "";
  };
  // ChatButton 클릭 함수
  const ChatButtonClickHandler = (text) => {
    console.log("Chat : ", text);
    setChatBtnState(true);
    setOnlyNumber("2");
    if (text === "letter") {
      setIsLetter(true);
      setIsVideo( false );
    } else {
      setIsLetter(false);
      setIsVideo( true );
    }
  };

  // 카테고리 중복 선택 가능 함수
  const CategoryClickHandler = (index) => {
    setIsCategoryClick(
      isCategoryClick.map((item, Checkedindex) => {
        if (Checkedindex === index) {
          return (item = !item);
        } else {
          return item;
        }
      })
    );
  };

  // 해쉬 태그 반별용 함수
  const HashTagChangeHandler = (event) => {
    console.log(event.target.value);
  };
  // 인원 수 설정 숫자만 들어가도록 하는 함수
  const InputTextOnChangeNumberHandler = (event) => {
    let onlyNumber = event.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
    if (Number(onlyNumber) >= 50) {
      onlyNumber = "50";
    }
    if (onlyNumber !== "") {
      if (Number(onlyNumber) < 3) {
        onlyNumber = "2";
      }
    }
    setOnlyNumber(onlyNumber);
  };

  // 등록하기 버튼 클릭
  const CreateBunggleOnClickHandler = () => {
    const SeelectedCategories = CategoriesArray.filter((item, index) => {
      if (isCategoryClick[index]) {
        return item;
      }
    });

    const ReturnCategories = SeelectedCategories.join(",");
    console.log(ReturnCategories);
  };

  return (
    <CreatePostWrap>
      {/* Title 부분 */}
      <PostTilteDiv>
        <PostTitle
          type="text"
          placeholder="번개 이름을 입력해주세요."
          maxLength={36}
          ref={InputTitle_Ref}
        />
        <DeleteButton src={IconClear} onClick={clearBtnOnClickHandler} />
      </PostTilteDiv>
      {/* Body 저렇게 안 닫아주면 placeholder 안생김*/}
      <PostBody placeholder="번개 소개글을 작성해주세요."></PostBody>
      <Divider />
      <PostUploadPictureWrap>
        <UploadTitle>사진</UploadTitle>
        <FileUploadWrap>
          {Array.from({ length: 3 }, (_, index) => {
            return (
              null
            // <UploadPictureWrap key={index}>
            //   <FileInputLabel htmlFor="file-input">
            //     <FileInputImg src={ IconUpload} />
            //   </FileInputLabel>
            //   <FileInput id="file-input" type="file" accept='image/jpg, image/jpeg, image/png' />
            // </UploadPictureWrap>
            )
          })}
        </FileUploadWrap>
      </PostUploadPictureWrap>
      <DividerStyle />
      {/* 카테고리 설정 */}
      <PostCategoriesWrap>
        <UploadTitle>카테고리 설정</UploadTitle>
        <PostCategoriesItemWrap>
          {CategoriesArray.map((item, index) => {
            return (
              <PostCategoriesItem
                isChecked={isCategoryClick[index]}
                key={index}
                onClick={() => {
                  CategoryClickHandler(index);
                }}
              >
                {item}
              </PostCategoriesItem>
            );
          })}
        </PostCategoriesItemWrap>
      </PostCategoriesWrap>
      <DividerStyle />
      {/* 채팅 설정 */}
      <SelectChatWrap>
        <SelectChatBox>
          <UploadTitle>채팅 설정</UploadTitle>
          <SelectChatBtnWrap>
            <SelectChatLetterBtn
              CheckedState={isLetter}
              onClick={() => {
                ChatButtonClickHandler("letter");
              }}
            >
              <SelectChatBtnImg src={IconChatLetter} />
              <SelectChatBtnName>일반채팅</SelectChatBtnName>
            </SelectChatLetterBtn>
            <SelectChatVideoBtn
            CheckedState={isVideo}
              onClick={() => {
                ChatButtonClickHandler("video");
              }}
            >
              <SelectChatBtnImg src={IconChatVideo} />
              <SelectChatBtnName>화상채팅</SelectChatBtnName>
            </SelectChatVideoBtn>
          </SelectChatBtnWrap>
        </SelectChatBox>
      </SelectChatWrap>
      {/* 태그 설정 */}
      <HashTagWrap>
        <UploadTitle>태그 입력</UploadTitle>
        <HashTageInput
          placeholder="#태그 입력( 최대 3개 )"
          onChange={HashTagChangeHandler}
        ></HashTageInput>
      </HashTagWrap>
      <DividerStyle />
      {/* 인원 수 설정 */}
      {/* 
      { chatBtnState && (<PostPeopleCount>
        <PostPeopleCountTitleWrap>
          <PostPeopleTitle>인원 수 설정</PostPeopleTitle>
          <div style={{ display: "flex" }}>
            <PostPeopleCountTitle
              style={{ textAlign: "right", paddingRight: "5px" }}
              type="text"
              value={onlyNumber}
              onChange={InputTextOnChangeNumberHandler}
              maxLength={2}
            />
            명
          </div>
        </PostPeopleCountTitleWrap>
        // rc slider 
        <Slider
          className="testName"
          style={{ marginTop: "15px" }}
          min={2}
          max={50}
          value={onlyNumber}
          trackStyle={{ backgroundColor: "#B3B3B3", border:"1px solid #B3B3B3", height: 9 }}
          inverted={false}
          handleStyle={{
            border: "3px solid #B3B3B3",
            height: 14,
            width: 14,
            marginLeft: 0,
            marginTop: -2.5,
            backgroundColor: "white",
            cursor: "pointer",
            opacity: 1,
            boxShadow: "none !imporatnt"
          }}
          handle={{boxShadow:"none"}}
          onChange={setOnlyNumber}
          railStyle={{ backgroundColor: "white", border:"1px solid #B3B3B3", height: 9 }}
        />
      </PostPeopleCount>)}
      */}
      <PostPeopleCount>
        <PostPeopleCountTitleWrap>
          <PostPeopleTitle>인원 수 설정</PostPeopleTitle>
          <div style={{ display: "flex" }}>
            <PostPeopleCountTitle
              style={{ textAlign: "right", paddingRight: "5px" }}
              type="text"
              value={onlyNumber}
              onChange={InputTextOnChangeNumberHandler}
              maxLength={2}
            />
            명
          </div>
        </PostPeopleCountTitleWrap>
        {/* rc slider   */}
        <Slider
          className="testName"
          style={{ marginTop: "15px" }}
          min={2}
          max={isLetter ? 50 : 4}
          value={onlyNumber}
          trackStyle={{
            backgroundColor: "#B3B3B3",
            border: "1px solid #B3B3B3",
            height: 9,
          }}
          inverted={false}
          handleStyle={{
            border: "3px solid #B3B3B3",
            height: 14,
            width: 14,
            marginLeft: 0,
            marginTop: -2.5,
            backgroundColor: "white",
            cursor: "pointer",
            opacity: 1,
            boxShadow: "none !imporatnt",
          }}
          handle={{ boxShadow: "none" }}
          onChange={setOnlyNumber}
          railStyle={{
            backgroundColor: "white",
            border: "1px solid #B3B3B3",
            height: 9,
          }}
        />
      </PostPeopleCount>
      <DividerStyle />
      <PostCreateButton onClick={CreateBunggleOnClickHandler}>
        등록하기
      </PostCreateButton>
    </CreatePostWrap>
  );
}

export default CreatePost;
