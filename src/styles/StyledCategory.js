import styled from "styled-components";

export const CategoryWrap = styled.div`
    width: 100%;
    height: 157px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
`;

export const CategoryItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
    width: 51px;
    cursor: pointer;
`;

export const CategoryImg = styled.img`
    width: 51px;
    height: 51px;
    background: #D9D9D9;
    border-radius: 10px;
`;

export const CatogoryName = styled.span`
    font-weight: 400;
    font-size: 10px;
    line-height: 14px;
    text-align: center;
    margin-top:2px;
`;