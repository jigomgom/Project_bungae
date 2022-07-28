import React, { useEffect, useState } from 'react'
import { SearchWrap, SearchDiv, SeachInput, IconSearch } from "../styles/StyledSearch";
import { tagBungleList } from "../redux/modules/BungleSlice";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import IconSearh from "../assets/icon-search.svg";

// input box 추가

function Search( props ) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLocation = useSelector( state => state.Bungle.userLocation );
    
  const onKeyDown = ( e ) => {
    if( e.target.value.length !== 0 && e.key === "Enter" && userLocation ){
      dispatch( tagBungleList( { tag: e.target.value, location:userLocation, navigate } ) );
    }
  };

  return (
    <SearchWrap>
        <SearchDiv>
          <SeachInput type="text" placeholder="검색할 단어를 입력해주세요." onKeyDown={onKeyDown}/>
          <IconSearch src={IconSearh} />
        </SearchDiv>
    </SearchWrap>
  )
}

export default Search