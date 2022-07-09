import styled from "styled-components";

export const HeaderWrap = styled.div`
    width: 100%;
    /* max-width: 375px; */
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 22px;
    position: relative;
`;

export const Logo = styled.img`
    width: 78.95px;
    height: 22.19px;
    margin-top: 11px;
    margin-left: 6px;
    cursor: pointer;
    /* margin-top: 29px; */
`;

export const PageTitle = styled.h3`
    font-size: 24px;
    font-weight: 700;
    margin-left: 20px;
`;

export const BackKey = styled.img`
    position: absolute;
    width: 11.67px;
    height: 19.8px;
    left: 25px;
    top: 18px;
    cursor: pointer;
`;

export const HeadrIconsWrap = styled.div`
    display: flex;
    height: 50px;
    align-items: center;
    /* position: absolute; */
    /* right: 22px;
    top: 5px; */
    gap: 10px; 
    margin-right: 22px;
`;

export const IconMyLocation = styled.img`
    width: 22px;
    height: 22px;
    cursor: pointer;
`;

export const IconNotification = styled.img`
    width: 16px;
    height: 19.5px;
    cursor: pointer;
`;

export const IconSetting = styled.img`
    width: 19.5px;
    height: 19.5px;
    cursor: pointer;
`;