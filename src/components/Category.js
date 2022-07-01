import React from 'react'
import { CategoryWrap, CategoryItem, CategoryImg, CatogoryName } from "../styles/StyledCategory";

const CategoryArray = ["맛집", "카페", "노래방", "운동", "친목", "전시", "여행", "쇼핑", "스터디", "게임"];

function Category() {
  return (
    <CategoryWrap>
      {CategoryArray.map((item, index) => {
        return (
          <CategoryItem key={index}>
            <CategoryImg />
            <CatogoryName>{item}</CatogoryName>
          </CategoryItem>
        );
      })}
    </CategoryWrap>
  );
}

export default Category