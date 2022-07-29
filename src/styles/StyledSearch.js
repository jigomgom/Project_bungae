import styled from "styled-components";

export const SearchWrap = styled.div`
    width: 100%;   
    height: 34px;
    margin-bottom: 20px;
`;

export const SearchDiv = styled.div`
    width: 89%;
    height: 34px;
    margin-left: 15px;
    /* background: #D9D9D9;
    border-radius: 17px; */
    position: relative;
`;

export const SeachInput = styled.input`
    width: 89%;
    height: 34px;
    /* background-color: #D9D9D9; */
    border-radius: 100px;
    border: 1px solid #898989;
    padding-left: 50px;
    &:focus{
        outline: none;
    }
    &::placeholder{
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 17px;
        color: #8B8B8B;
    }
`;

export const IconSearch = styled.img`
    position: absolute;
    top: 10px;
    left: 19px;
    width: 17.49px;
    height: 17.49px;
    cursor: pointer;
`;