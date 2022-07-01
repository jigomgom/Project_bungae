import React from 'react'

import { TagWrap, TagTitle, TagItem } from "../styles/StyledTag";

const TagArray = ["산책", "서울", "맥주", "방탈출", "카페"];

function Tag() {
  return (
    <TagWrap>
      <TagTitle>인기 태그</TagTitle>
      {TagArray.map((item, index) => {
        return <TagItem>#{item}</TagItem>;
      })}
    </TagWrap>
  );
}

export default Tag