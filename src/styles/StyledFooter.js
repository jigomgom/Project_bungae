import styled from "styled-components";

export const FooterWrap = styled.div`
    position: sticky;
    bottom: 0px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 60px;
    background-color: white;
    box-shadow: inset 0px 1px 0px rgba(0, 0, 0, 0.1);
`;

export const FooterIconWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 36px;
    cursor: pointer;
`;

export const FooterIconImg = styled.img`
    width: 20px;
    height: 20px;
`;

export const FooterIconText = styled.span`
    font-weight: 400;
    font-size: 8px;
    line-height: 12px;
`;

export const FooterAddBungae = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;

    background: #D9D9D9;
    border-radius: 100px;

    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    color: #787878;
    cursor: pointer;
`;