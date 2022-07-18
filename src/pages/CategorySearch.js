import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import CategorySearchCard from "../components/CategorySearchCard";


//CSS
import "../styles/TagCategorySearch.css";
//Components
import SearchCard from "../components/SearchCard";
import { HeaderWrap, Logo, BackKey, PageTitle, HeadrIconsWrap, IconMyLocation, IconNotification, IconSetting} from "../styles/StyledHeader";

import Notification from "../assets/icon-notification.svg";
import Setting from "../assets/icon-setting.svg";
import IconBackKey from "../assets/icon-left-arrow.svg";
import IconMyPoint from "../assets/icon-mylocation.svg";
import IconMainLogo from "../assets/icon-main-logo.svg";

function CategorySearch() {
  // isLoad
  const [ isLoad, setIsLaod ] = useState( true );
  //
  const categoryList = useSelector( state => state.Bungle.categoriesList );
  console.log( categoryList );

  const navigate = useNavigate();
  const { category } = useParams();

  // console.log( category );

  useEffect(()=>{
    // if( isLoad ){
      window.scrollTo(0,0);
    //   setTimeout(()=>{ setIsLaod( false )}, 200);
    // }
  },[]);
  //검색 정렬 드롭박스
  const [selected, setSelected] = React.useState("최신순");
  const handleSelect = (e) => {
    // console.log(e.target.value);
    setSelected(e.target.value);
  };
  // console.log(selected);
  const searchOptions = [
    { key: 1, value: "최신순" },
    { key: 2, value: "인기순" },
  ];
  return (
    <div>
      <HeaderWrap>
        <Logo style={{ visibility:"hidden"}} src={IconMainLogo} />
        <BackKey src={IconBackKey} onClick={()=>{ navigate("/main")}}/>
        <PageTitle style={{ visibility: "hidden" }}></PageTitle>

        <HeadrIconsWrap>
          <IconMyLocation style={{ visibility: "hidden" }} src={IconMyPoint} />
          <IconNotification src={Notification} />
          <IconSetting src={Setting} />
        </HeadrIconsWrap>
      </HeaderWrap>
      <div className="search-result-wrap">
        <div className="search-result-header">
          <p className="search-result-header-title">{category}</p>
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
          { categoryList && categoryList.map( ( item, index ) => {
            return  <CategorySearchCard categoryList={item}/>
          })}
          {/* <SearchCard />
          <SearchCard />
          <SearchCard />
          <SearchCard />
          <SearchCard />
          <SearchCard />
          <SearchCard /> */}
        </div>
      </div>
    </div>
  );
}

export default CategorySearch;
