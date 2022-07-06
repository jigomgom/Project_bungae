import React from "react";
//swipe-list
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
//CSS
import "../styles/SearchCard.css";
import "react-swipeable-list/dist/styles.css";

//img
import defaultCardImg from "../assets/defaultImg.jpg";
import tempImg from "../assets/icon-temp.svg";

function SearchCard() {
  // const leadingActions = () => (
  //   <LeadingActions>
  //     <SwipeAction onClick={() => console.info("swipe action triggered")}>
  //       Action name
  //     </SwipeAction>
  //   </LeadingActions>
  // );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => console.info("swipe action triggered")}
      >
        삭제
      </SwipeAction>
    </TrailingActions>
  );

  if (
    window.location.pathname === "/tagsearch" ||
    window.location.pathname === "/categorysearch"
  ) {
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
  } else if (window.location.pathname === "/mylikebung") {
    return (
      <SwipeableList>
        <SwipeableListItem
          // leadingActions={leadingActions()}
          trailingActions={trailingActions()}
        >
          <div className="search-card-wrap">
            <div className="search-card-img">
              <img src={defaultCardImg} alt="" />
            </div>
            <div className="search-card-desc">
              <div className="search-card-desc-title">Lorem Ipsum</div>
              <div className="search-card-desc-sub">15분 경과 · (2/5명)</div>
              <div className="search-card-desc-desc">
                <span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Viverra pretium sit egestas urna, non ac, mus.
                </span>
              </div>
              <div className="search-card-desc-temp">
                <img src={tempImg} alt="" />
                <span>80°C</span>
              </div>
              <div></div>
            </div>
          </div>
        </SwipeableListItem>
      </SwipeableList>
    );
  }
}

export default SearchCard;
