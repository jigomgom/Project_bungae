import React, { useRef } from "react";
import { useSelector } from "react-redux/es/exports";

//Components
import SearchCard from "../components/SearchCard";

//CSS
import "../styles/BottomSheet.css";

function BottomSheet({ aroundLocation }) {
  // const searchList = useSelector((state) => state.Bungle.moreList);

  console.log(aroundLocation);

  const showBottomSheet = () => {
    let container = document.querySelector("#bottomSheetContainer");
    let bottomSheet = document.querySelector(
      "#bottomSheetContainer #bottomSheet"
    );
    container.classList.add("active");
    setTimeout(() => {
      bottomSheet.classList.add("active");
    }, 1);
  };

  const hideBottomSheet = () => {
    let container = document.querySelector("#bottomSheetContainer");
    let bottomSheet = document.querySelector(
      "#bottomSheetContainer #bottomSheet"
    );
    bottomSheet.classList.remove("active");
    setTimeout(() => {
      container.classList.remove("active");
    }, 400);
  };

  return (
    <>
      <div
        id="bottomSheetController"
        onClick={() => {
          showBottomSheet();
        }}
      >
        <div id="bottomSheetControllerHeader"></div>
      </div>
      <div
        id="bottomSheetContainer"
        onClick={() => {
          hideBottomSheet();
        }}
      >
        <div id="bottomSheet">
          <div id="bottomSheetHeader"></div>
          {/* <div className="search-card-wrap">
            <div className="search-card-img">
              <img
                className="search-card-img-thumbnail"
                src={moreList.postUrl ? moreList.postUrl : defaultCardImg}
                alt=""
                onClick={() => {
                  showDetailBungle(moreList.postId);
                }}
              />
              <img
                className="search-card-img-like"
                src={moreList.isLike ? likeImg : UnlikeImg}
                alt=""
                onClick={() => {
                  moreTagLikeOnClick(moreList.postId);
                }}
              />
            </div>
            <div className="search-card-desc">
              <div className="search-card-desc-title">{moreList.title}</div>
              <div className="search-card-desc-sub">
                {moreList.time} · ({moreList.joinCount}/{moreList.personnel}명)
              </div>
              <div className="search-card-desc-desc">
                <span>{moreList.content}</span>
              </div>
              <div className="search-card-desc-temp">
                <img
                  src={
                    moreList.avgTemp >= 50
                      ? IconHighTemp
                      : moreList.avgTemp >= 25
                      ? IconMiddleTemp
                      : IconLowTemp
                  }
                  alt=""
                />
                <span>{moreList.avgTemp}°C</span>
              </div>
              <div></div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default BottomSheet;
