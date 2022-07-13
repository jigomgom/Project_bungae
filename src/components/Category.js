import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { categoryBungleList } from "../redux/modules/BungleSlice";

import { CategoryWrap, CategoryItem, CategoryImg, CatogoryName } from "../styles/StyledCategory";

const CategoryArray = ["맛집", "카페", "노래방", "운동", "친목", "전시", "여행", "쇼핑", "스터디", "게임"];

function Category( props ) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { location } = props;
  console.log( location );
  const categoryClickHandler = ( category ) => {
  //  console.log( category );
    dispatch( categoryBungleList( { location, category } ) );
    navigate(`/categorysearch/${category}`);
  };

  return (
    <CategoryWrap>
      {CategoryArray.map((item, index) => {
        return (
          <CategoryItem key={index} onClick={()=>{categoryClickHandler(item)}}>
            <CategoryImg />
            <CatogoryName>{item}</CatogoryName>
          </CategoryItem>
        );
      })}
    </CategoryWrap>
  );
}

export default Category