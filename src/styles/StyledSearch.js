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
    background: #D9D9D9;
    border-radius: 17px;
    border: none;
    padding-left: 50px;
    &:focus{
        outline: none;
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