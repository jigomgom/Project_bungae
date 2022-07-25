import styled from "styled-components";

export const VideoWrapper = styled.div`
  width: 100%;
  max-width: 375px;
  max-height: 780px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  position: relative;
  /* margin-top: -15vh; */
`;

export const NoneVideoChat = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 350px;
`;

export const NoneVideoChatImg = styled.img`
  width: 80px;
  height: 80px;
`;

export const VideoChatUserIcon = styled.img`
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-top: 10px;
  margin-left: 10px;
  background-color: gray;
`;

export const ButtonImageWrap = styled.div`
  width: 58.1px;
  height: 58.1px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #D9D9D9;
  background-color: white;
  cursor: pointer;
`;

export const ButtonImage = styled.img`
  width: 27px;
  height: 27px;
`;

export const VideoButtonWrap = styled.div`
  display: flex;
  justify-content: space-around;
  width: 50%;
  position: absolute;
  left: 95px;
  top: 700px;
`;