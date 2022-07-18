import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//CSS
import "../styles/TagCategorySearch.css";
//Components
import SearchCard from "../components/SearchCard";
import Divider from "../components/Divider";
//Styled-Components
import Tag from "../components/Tag";
import Search from "../components/Search";

function TagSearch() {
  // isLoad
  const [ isLoad, setIsLoad ] = useState( true );
  //검색 정렬 드롭박스
  const searchList = useSelector( state => state.Bungle.moreList );
  console.log( searchList );
  const [selected, setSelected] = React.useState("최신순");
  const handleSelect = (e) => {
    // console.log(e.target.value);
    setSelected(e.target.value);
  };
  useEffect(()=>{
    if( isLoad ){
      window.scrollTo(0,0);
      setTimeout(()=>{ setIsLoad( false )}, 200 );
    }
  },[])

  // console.log(selected);
  const searchOptions = [
    { key: 1, value: "최신순" },
    { key: 2, value: "인기순" },
  ];

  return (
    <div>
      <Tag />
      <Search />
      <div className="search-result-wrap">
        <Divider />
        <div className="search-result-header">
          <p className="search-result-header-title">검색 결과</p>
          <select
            className="search-result-header-dropbox"
            onChange={handleSelect}
            value={selected}
          >
            {searchOptions.map((item, index) => (
              <option key={item.key} value={item.value}>
                {item.value}
              </option>
            ))}
          </select>
        </div>
        <div className="search-result-card-wrap">
          { searchList && searchList.map( ( item, index ) => {
            return <SearchCard key={index} moreList={item} />
          })}
          {/* <SearchCard />
          <SearchCard />
          <SearchCard />
          <SearchCard />
          <SearchCard /> */}
        </div>
      </div>
    </div>
  );
}
export default TagSearch;
