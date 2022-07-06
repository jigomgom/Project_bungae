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

export const PostImg = styled.div`
    width: 100%;
    height: 207px;
    background: #D9D9D9;
`;

export const PostIconShared = styled.img`
    position: absolute;
    width: 24px;
    height: 24px;
    right : 22.3px;
    top: 22.3px;
    cursor: not-allowed;
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
    display: flex;
`;

export const PostUserBoxProfile = styled.img`
    width: 92px;
    height: 92px;
    background: #D9D9D9;
    border-radius: 10px;
`

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

    color: #A7A7A7;
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
    margin-right:10px;
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
    margin-left:20px;
    margin-top:100px;
    margin-bottom: 20px;
`;

export const PostBodyContent = styled.div`
    width: 310px;
    height: 113px;

    font-weight: 400;
    font-size: 12px;
    line-height: 150%;
    margin-left: 20px;
    margin-right : 45px;
    margin-bottom: 45px;
    /* margin-right: 20px; */
`;

export const PostInfoTextWrap = styled.div`
    width: 187px;
    height: 17px;
    margin-left:20px;

    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
    color: #9A9A9A;

    margin-bottom: 10px;
`;

export const PostTagWrap = styled.div`
    width: 276px;
    height: 17px;
    margin-left: 20px;
    gap: 5px;
    display: flex;
`;

export const PostTag = styled.div`
  width: 49px;
  height: 17px;

  text-align: center;

  font-weight: 400;
  font-size: 12px;
  line-height: 17px;

  color: #8b8b8b;

  background: #d9d9d9;
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
    padding-top:20px;
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

    background: #D9D9D9;
    border-radius: 10px;
`;

export const PostMemberName = styled.div`
    font-weight: 700;
    font-size: 12px;
    line-height: 17px;
`;

export const PostJoinButton = styled.div`
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
`;