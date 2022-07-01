import React from 'react'
import { SearchWrap, SearchDiv, IconSearch } from "../styles/StyledSearch";

import IconSearh from "../assets/icon-search.svg";

function Search() {
  return (
    <SearchWrap>
        <SearchDiv>
          <IconSearch src={IconSearh} />
        </SearchDiv>
    </SearchWrap>
  )
}

export default Search