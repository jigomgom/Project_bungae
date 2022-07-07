import React from "react";
//CSS
import "../styles/TagCategorySearch.css";
//Components
import SearchCard from "../components/SearchCard";
function CategorySearch() {
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
      <div className="search-result-wrap">
        <div className="search-result-header">
          <p className="search-result-header-title">운동</p>
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
          <SearchCard />
          <SearchCard />
          <SearchCard />
          <SearchCard />
          <SearchCard />
          <SearchCard />
          <SearchCard />
          <SearchCard />
        </div>
      </div>
    </div>
  );
}

export default CategorySearch;
