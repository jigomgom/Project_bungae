import React from 'react'
import { SearchWrap, SearchDiv, SeachInput, IconSearch } from "../styles/StyledSearch";

import IconSearh from "../assets/icon-search.svg";

// input box 추가

function Search() {
  return (
    <SearchWrap>
        <SearchDiv>
          <SeachInput type="text" placeholder="검색할 단어를 입력해주세요."/>
          <IconSearch src={IconSearh} />
        </SearchDiv>
    </SearchWrap>
  )
}

export default Search