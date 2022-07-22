import React, { useRef } from "react";
import { useSelector } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";

//CSS
import "../styles/BottomSheet.css";
import "../styles/SearchCard.css";

//img
import defaultCardImg from "../assets/defaultImg.jpg";
import tempImg from "../assets/icon-temp.svg";
import likeImg from "../assets/icon-like.svg";
import UnlikeImg from "../assets/icon-unlike.svg";
import IconHighTemp from "../assets/icon-manner-high.svg";
import IconMiddleTemp from "../assets/icon-manner-middle.svg";
import IconLowTemp from "../assets/icon-manner-low.svg";
import { Navigate } from "react-router-dom";

function BottomSheet({ aroundLocation }) {
  // const searchList = useSelector((state) => state.Bungle.moreList);

  console.log(aroundLocation);

  const navigate = useNavigate();

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
          <div id="bottomSheetHeaderContainer">
            <div id="bottomSheetHeader"></div>
          </div>

          <div>
            <div className="search-result-card-wrap-map">
              {aroundLocation.map((item, index) => {
                return (
                  <div
                    className="search-card-wrap-map"
                    key={index}
                    onClick={() => {
                      navigate(`detailpost/${item.id}`);
                    }}
                  >
                    <div className="search-card-img">
                      <img
                        className="search-card-img-thumbnail"
                        src={item.postUrl ? item.postUrl : defaultCardImg}
                        alt=""
                      />
                      <img
                        className="search-card-img-like"
                        src={item.isLike ? likeImg : UnlikeImg}
                        alt=""
                        // onClick={() => {
                        //   moreTagLikeOnClick(moreList.postId);
                        // }}
                      />
                    </div>
                    <div className="search-card-desc">
                      <div className="search-card-desc-title">{item.title}</div>
                      <div className="search-card-desc-sub">
                        {item.time} · ({item.joinCount}/{item.personnel}명)
                      </div>
                      <div className="search-card-desc-desc">
                        <span>{item.content}</span>
                      </div>
                      <div className="search-card-desc-temp">
                        <img
                          src={
                            item.avgTemp >= 50
                              ? IconHighTemp
                              : item.avgTemp >= 25
                              ? IconMiddleTemp
                              : IconLowTemp
                          }
                          alt=""
                        />
                        <span>{item.avgTemp}°C</span>
                      </div>
                      <div></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BottomSheet;
