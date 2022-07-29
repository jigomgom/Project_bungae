import styled from "styled-components";

export const PostWrap = styled.div`
  width: 100%; // 100% -> 375px
  position: relative;
  margin-bottom: 90px;
`;

export const PostContent = styled.div`
  position: relative;
  width: 100%;
`;

export const PostImg = styled.img`
  width: 100%;
  height: 207px;
  /* background: #D9D9D9; */
  object-fit: cover;
`;

export const PostIconShared = styled.img`
  position: absolute;
  width: 24px;
  height: 24px;
  right: 22.3px;
  top: 22.3px;
  z-index: 2;
  cursor: not-allowed;
`;

export const PostLike = styled.img`
  position: absolute;
  width: 20px;
  height: 20px;
  top: 58px;
  right: 24.3px;
  z-index: 2;
  cursor: pointer;
`;

export const PostContentBody = styled.div`
  width: 100%;
`;

export const PostUserBox = styled.div`
  width: 84%;
  height: 92px; // 112 - padding 20px
  background: white;
  border-radius: 10px;
  position: absolute;
  top: 170px;
  left: 20px;
  padding: 10px;
  z-index: 2;
  display: flex;
`;

export const PostUserBoxProfile = styled.img`
  width: 92px;
  height: 92px;
  background: #d9d9d9;
  border-radius: 10px;
  object-fit: cover;
`;

export const PostUserTexts = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

export const PostUserName = styled.div`
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
  margin-bottom: 6px;
`;

export const PostUserIntro = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;

  color: #a7a7a7;
  margin-bottom: 15px;
`;

export const PostUserIcon = styled.div`
  display: flex;
  width: 148px;
  height: 24px;
  align-items: center;
`;

export const PostUserIconImg = styled.img`
  margin-right: 6px;
`;

export const PostUserIconText = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  margin-right: 10px;
`;

export const PostBodyTextWrap = styled.div`
  width: 100%;
  height: 381px;
  display: flex;
  flex-direction: column;
`;

export const PostBodyTitle = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 29px;
  margin-left: 20px;
  margin-top: 100px;
  margin-bottom: 20px;
`;

export const PostBodyContent = styled.div`
  width: 310px;
  height: 113px;

  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  margin-left: 20px;
  margin-right: 45px;
  margin-bottom: 45px;
  /* margin-right: 20px; */
`;

export const PostInfoTextWrap = styled.h3`
  width: 240px;
  height: 17px;
  margin-left: 11px;
  margin-top: 24px;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  color: #9a9a9a;
  
  margin-bottom: 10px;
`;

export const PostCategoriesWrapper = styled.div`
  display: flex;
  margin-left: 20px;
  margin-bottom: 8px;

  font-weight: 400;
  font-size: 12px;
  line-height: 17px;

  color: #898989;
`;

export const PostCategoriesItem = styled.span``;

export const PostTagWrap = styled.div`
  width: 276px;
  height: 17px;
  margin-left: 20px;
  margin-bottom: 21px;
  gap: 5px;
  display: flex;
`;

export const PostTag = styled.div`
  /* width: 49px; */
  height: 17px;

  text-align: center;

  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  padding: 0px 10px;
  color: #ffffff;

  background-color: #ffc634;
  border-radius: 100px;
`;

export const PostMap = styled.div`
  width: 100%;
  height: 252px;
`;

export const PostMapTitle = styled.h3`
  margin-left: 20px;
  margin-bottom: 17px;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
`;

export const PostMapView = styled.div`
  width: 89%; // 335px
  height: 159px;
  border-radius: 10px;
  margin: auto;
`;

export const PostMemberWrap = styled.div`
  width: 100%;
  height: 206px;
  padding-top: 20px;
`;

export const PostMemberTitle = styled.div`
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
  margin-left: 20px;
  margin-bottom: 17px;
`;

export const PostMemberCard = styled.div`
  width: 92px;
  height: 113px;
  /* text-align: center; */
`;

export const PostMemberPicture = styled.img`
  width: 92px;
  height: 92px;

  background: #d9d9d9;
  border-radius: 10px;
`;

export const PostMemberVideo = styled.video`
  width: 92px;
  height: 92px;

  background: #d9d9d9;
  border-radius: 10px;
`;

export const PostMemberName = styled.div`
  font-weight: 700;
  font-size: 12px;
  line-height: 17px;
`;

export const PostJoinButtonWrapper = styled.div`
  position: relative;
`;

export const PostJoinIcon = styled.img`
  position: absolute;
  width: 20px;
  height: 20px;
  left: 145px;
  top: 17px;
  z-index: 50;
`;

export const PostJoinButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 89%;
  height: 50px;
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;
  border: 2px solid #434343;
  background-color: white;
  border-radius: 10px;
  margin-left: 20px;
  cursor: pointer;
  & > span{
    position: absolute;
    left: 149px;
  }
`;
