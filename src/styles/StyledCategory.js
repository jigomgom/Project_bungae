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

export const CategoryImgWrap = styled.div`
  width: 51px;
  height: 51px;
  /* background: #D9D9D9; */
  border-radius: 10px;
  background: ${(props) => (props.isChecked ? "#FFC632" : "#fff")};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CategorySelectedImgWrap = styled.div`
  width: 51px;
  height: 51px;
  border-radius: 10px;
  background: #ffc632;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CategoryImg = styled.img`
  width: 34px;
  height: 34px;
  /* background: #D9D9D9; */
  /* border-radius: 50%; */
  /* background: black; */
  /* box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25); */
`;

export const CatogoryName = styled.span`
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  text-align: center;
  margin-top: 2px;
`;
