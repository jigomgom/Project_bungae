import React from "react";
//CSS
import "../styles/SearchCard.css";

//img
import defaultCardImg from "../assets/defaultImg.jpg";
import tempImg from "../assets/icon-temp.svg";

function SearchCard() {
  return (
    <div className="search-card-wrap">
      <div className="search-card-img">
        <img src={defaultCardImg} alt="" />
      </div>
      <div className="search-card-desc">
        <div className="search-card-desc-title">Lorem Ipsum</div>
        <div className="search-card-desc-sub">15분 경과 · (2/5명)</div>
        <div className="search-card-desc-desc">
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra
            pretium sit egestas urna, non ac, mus.
          </span>
        </div>
        <div className="search-card-desc-temp">
          <img src={tempImg} alt="" />
          <span>80°C</span>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default SearchCard;
