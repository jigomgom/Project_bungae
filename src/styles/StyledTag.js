import styled from "styled-components";

export const TagWrap = styled.div`
    width: 100%;
    height: 25px;
    /* background-color: red; */
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 22px;
`;

export const TagTitle = styled.span`
    width: 55px;
    height: 20px;
    margin-right: 9px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #9F9F9F;
`;

export const TagItem = styled.div`
    text-align: center;
    width: 51px;
    height: 17px;
    background-color: #D9D9D9;
    border-radius: 11.5px;

    font-weight: 400;
    font-size: 12px;
    line-height: 17px;

    color: #8B8B8B;
    margin-right: 4px;
    cursor: pointer;
`;