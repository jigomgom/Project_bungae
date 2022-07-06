import styled from "styled-components";

export const MainWrap = styled.div`
    width: 100%; // 100% -> 375px
    /* height: 100%; */
    display: flex;
    flex-direction: column;
    margin-bottom: 90px;
`;

export const ContentDivide = styled.div`
    width: 100%;
    height: 8px;

    background: #d9d9d9;
    margin: 20px 0px;
`;

export const MainContentWrap = styled.div`
    width: 100%;
    /* padding: 20px; */
    display: flex;
    flex-direction: column;
    margin-top: 25px;
`;

export const MainContentTitle = styled.div`
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
    padding-left: 24px;
    padding-bottom: 17px;
`;

export const MainContentItemWrap = styled.div`
    margin: auto;
    width: 89%;
    height: 441px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 13px;
    row-gap: 15px;
    cursor: pointer;
`;

export const MainContentItemFrame = styled.div`
    width: 161px;
    height: 213px;
    position: relative;
    cursor: pointer;
`;

export const MainContentItemImg = styled.img`
    width: 161px;
    height: 168px;
    border-radius: 10px;
    background: #D9D9D9;
`;

export const MainContentItemImgTemp = styled.img`
    position: absolute;
    right: 11px;
    top: 14px;
`

export const MainContentTextWrap = styled.div`
    display: flex;
    flex-direction: column;
`;
export const MainContentTitleWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

export const MainContentItemTitle = styled.span`
    font-weight: 700;
    font-size: 16px;
    line-height: 23px;
`;

export const MainContentItemLike = styled.img`
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
    margin-top:5px;
`;

export const MainContentItemTimePeople = styled.span`
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
`;

export const MainContentButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    
    width: 89%;
    height: 50px;
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    background: #D9D9D9;
    border-radius: 10px;

    margin-left: 20px;
    margin-top: 25px;
`;