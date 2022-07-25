/* global kakao */
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getMapBungle } from "../redux/modules/BungleSlice";
import { tagBungleList } from "../redux/modules/BungleSlice";
import { getDetailMap } from "../redux/modules/BungleSlice";

//Icons
import MarkerLightening from "../assets/icon-map-lightening.svg";
import MarkerMyLocation from "../assets/icon-map-center.svg";
import IconMyPoint from "../assets/icon-mylocation.svg";
import IconMapSort from "../assets/icon-map-sort.svg";
import Setting from "../assets/icon-setting.svg";
import Notification from "../assets/icon-notification.svg";
import IconHome from "../assets/icon-home.svg";
import IconLocation from "../assets/icon-location.svg";
import IconChat from "../assets/icon-chat.svg";
import IconMyBungae from "../assets/icon-account.svg";
import IconCreate from "../assets/icon-create-post.svg";
import IconEdit from "../assets/icon-edit-footer.svg";
import IconBackKey from "../assets/icon-left-arrow.svg";
import IconReset from "../assets/icon-reset.svg";
// category icons
import IconRestarunt from "../assets/icon-category-restaurant.svg";
import IconTravel from "../assets/icon-category-travel.svg";
import IconNorae from "../assets/icon-category-noraebang.svg";
import IconExercise from "../assets/icon-category-excercise.svg";
import IconCaffe from "../assets/icon-category-caffe.svg";
import IconFriendShip from "../assets/icon-category-friendship.svg";
import IconGame from "../assets/icon-category-game.svg";
import IconStudy from "../assets/icon-category-study.svg";
import IconShopping from "../assets/icon-category-shoppin.svg";
import IconExhibit from "../assets/icon-category-exhibit.svg";

//Components
import BottomSheet from "./BottomSheet";
import Divide from "../components/Divider";

//StyledComponents
import {
  MapHeaderWrap,
  MapPageTitle,
  HeadrIconsWrap,
  IconNotification,
  IconSetting,
  MapDetailHeaderWrap,
  ChattingBackKey,
} from "../styles/StyledHeader.js";
import {
  MapFooterWrap,
  FooterIconWrap,
  FooterIconImg,
  FooterIconText,
  FooterAddBungae,
} from "../styles/StyledFooter.js";
import {
  CategoryWrap,
  CategorySelectedImgWrap,
  CategoryItem,
  CatogoryName,
  CategoryImgWrap,
  CategoryImg,
} from "../styles/StyledCategory";
import {
  // 인원수 설정
  MapPostPeopleCount,
  PostPeopleCountTitleWrap,
  MapPostPeopleTitle,
  PostPeopleCountTitle,
} from "../styles/StyledCreatePost";

//CSS
import "../styles/Map.css";
// slider 추가
import Slider from "rc-slider";
import "../styles/rc-slider/index.css";

function Map() {
  const SERVER_URL = "https://gutner.shop";
  // const SERVER_URL = "https://meeting-platform.shop";
  const token = localStorage.getItem("login-token");

  const dispatch = useDispatch();
  // navigate
  const navigate = useNavigate();
  // 지도 표시할 DOM 선택
  const container = useRef(null);
  //현재 위치 불러왔는지 boolean state
  const [isLoad, setIsLoad] = useState(true);
  //현재 위치 state
  const [location, setLocation] = useState();
  //에러 코드 담는 state
  const [error, setError] = useState();
  // 세부 설정 modal state
  const [isDetail, setIsDetail] = useState(false);
  // 서부 설정 카테고리 선택 state
  const [selectCategory, setSelectCategory] = useState([]);
  // 카테고리 클릭 판별용 state
  const [isCategoryClick, setIsCategoryClick] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  // 인원 설정 숫자만
  const [onlyNumber, setOnlyNumber] = useState(2);
  // 거리 설정 숫자만
  const [onlyDistance, setOnlyDistance] = useState(10);
  // redux getDetailMap 으로 보낼 data
  const [sendData, setSendData] = useState({
    location: {},
    onlyNumber: 2,
    onlyDistance: 10,
    selectCategory: "",
  });
  //주변 지도 리스트
  const getAroundBungle = useSelector((state) => state.Bungle.mapList);
  console.log(getAroundBungle);
  //상세 검색 후 리스트
  const getDetailMapBungle = useSelector(
    (state) => state.Bungle.detailMapBungle
  );
  console.log(
    "detailMapBungle: ",
    getDetailMapBungle,
    getDetailMapBungle.length
  );
  //Footer 작성, 삭제 구분
  const ownerCheck = useSelector((state) => state.Bungle.isOwner);

  //Detail Modal 밖 영역 클릭 시 닫기
  // const handleDetailModal = (e) => {
  //   const clicked = e.target.closest(".map-detail-modal-content-wrap");
  //   if (clicked) return;
  //   else {
  //     setIsDetail(false);
  //     setOnlyDistance(10);
  //     setOnlyNumber(2);
  //     setSelectCategory([]);
  //     setIsCategoryClick([
  //       false,
  //       false,
  //       false,
  //       false,
  //       false,
  //       false,
  //       false,
  //       false,
  //       false,
  //       false,
  //     ]);
  //   }
  // };

  //현재 위치 state에 현재 위치 담기
  const handleSuccess = (pos) => {
    const { latitude, longitude } = pos.coords;

    setLocation({
      latitude,
      longitude,
    });
  };
  console.log(location);

  useEffect(() => {
    if (location) {
      dispatch(getMapBungle(location));
      // getMapLocation();
    }
  }, [location]);

  //태그 검색
  const onKeyDown = (e) => {
    if (e.target.value.length !== 0 && e.code === "Enter") {
      dispatch(tagBungleList({ tag: e.target.value, location }));
    }
  };

  const CategoryImgArray = [
    IconRestarunt,
    IconCaffe,
    IconNorae,
    IconExercise,
    IconFriendShip,
    IconExhibit,
    IconTravel,
    IconShopping,
    IconStudy,
    IconGame,
  ];
  const CategoryArray = [
    "맛집",
    "카페",
    "노래방",
    "운동",
    "친목",
    "전시",
    "여행",
    "쇼핑",
    "스터디",
    "게임",
  ];

  // const getCategoryArray = () => {
  //   for (let i = 0; i <= selectCategory.length; i++) {
  //     if (CategoryArray.includes(selectCategory[i])) {
  //       setSelectCategory(
  //         selectCategory.filter((element) => element !== selectCategory[i])
  //       );
  //     } else {
  //       setSelectCategory([...selectCategory, CategoryArray[i]]);
  //     }
  //   }
  // };

  console.log("인원: ", onlyNumber);
  console.log("거리: ", onlyDistance);

  console.log(selectCategory);

  // 카테고리 중복 선택 가능 함수
  const CategoryClickHandler = (index) => {
    setIsCategoryClick(
      isCategoryClick.map((item, Checkedindex) => {
        if (Checkedindex === index) {
          return (item = !item);
        } else {
          return item;
        }
      })
    );
  };
  console.log("isCategoryCheck: ", isCategoryClick);

  useEffect(() => {
    if (location) {
      setSendData({
        location: location,
        onlyNumber: onlyNumber,
        onlyDistance: onlyDistance,
        selectCategory: selectCategory.join(","),
      });
    }
  }, [location, onlyNumber, onlyDistance, selectCategory]);
  // console.log("sendData: ", sendData);

  //세부 설정 적용 함수
  const mapSearch = () => {
    if (location && onlyNumber && onlyDistance && selectCategory) {
      dispatch(getDetailMap(sendData));
      setIsDetail(false);
    }
  };

  //지도 옵션
  const options = {
    /*
    maximumAge
    : 캐시에 저장한 위치정보를 대신 반환할 수 있는 최대 시간을 나타내는 양의 long 값입니다. 0을 지정한 경우 장치가 위치정보 캐시를 사용할 수 없으며 반드시 실시간으로 위치를 알아내려 시도해야 한다는 뜻입니다. Infinity를 지정한 경우 지난 시간에 상관없이 항상 캐시에 저장된 위치정보를 반환해야 함을 나타냅니다. 기본 값은 0입니다.
    timeout
    : 기기가 위치를 반환할 때 소모할 수 있는 최대 시간(밀리초)을 나타내는 양의 long 값입니다. 기본 값은 Infinity로, 위치를 알아내기 전에는 getCurrentPosition()이 반환하지 않을 것임을 나타냅니다.
    enableHighAccuracy
    : 위치정보를 가장 높은 정확도로 수신하고 싶음을 나타내는 불리언 값입니다. true를 지정했으면, 지원하는 경우 장치가 더 정확한 위치를 제공합니다. 그러나 응답 속도가 느려지며 전력 소모량이 증가하는 점에 주의해야 합니다. 반면 false를 지정한 경우 기기가 더 빠르게 반응하고 전력 소모도 줄일 수 있는 대신 정확도가 떨어집니다. 기본 값은 false입니다.
    */
    enableHighAccuracy: true,
    // timeout
    timeout: 10000,
    maximumAge: 0,
  };

  // Geolocation의 `getCurrentPosition` 메소드에 대한 실패 callback 핸들러
  const handleError = (error) => {
    setError(error.message);
    console.log(error);
  };
  //현재 위치 불러오기
  useEffect(() => {
    if (isLoad) {
      navigator.geolocation.getCurrentPosition(
        handleSuccess,
        handleError,
        options
      );
      setTimeout(() => {
        setIsLoad(false);
      }, 250);
    }
  }, []);

  //지도 생성
  useEffect(() => {
    // const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    // if (detailBungleInfo !== "") {
    if (
      !isLoad &&
      getAroundBungle &&
      getAroundBungle.length >= getDetailMapBungle.length
    ) {
      const options = {
        //지도를 생성할 때 필요한 기본 옵션
        // center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        center: new kakao.maps.LatLng(location.latitude, location.longitude),
        level: 9, //지도의 레벨(확대, 축소 정도)
      };

      const map = new kakao.maps.Map(container.current, options); //지도 생성 및 객체 리턴
      // 마커를 표시할 위치와 title 객체 배열입니다
      var nowPosition = [
        // {
        //   title: "카카오",
        //   latlng: new kakao.maps.LatLng(33.450705, 126.570677),
        // },
        {
          latlng: new kakao.maps.LatLng(location.latitude, location.longitude),
        },
      ];

      var positions = [
        // {
        //   // title: "생태연못",
        //   latlng: new kakao.maps.LatLng(33.450936, 126.569477),
        // },
        // {
        //   // title: "텃밭",
        //   latlng: new kakao.maps.LatLng(33.450879, 126.56994),
        // },
        // {
        //   // title: "근린공원",
        //   latlng: new kakao.maps.LatLng(33.451393, 126.570738),
        // },
      ];
      getAroundBungle.map((location, index) => {
        // console.log(location);
        positions = [
          ...positions,
          {
            latlng: new kakao.maps.LatLng(
              location.latitude,
              location.longitude
            ),
          },
        ];
      });

      // 마커 이미지의 이미지 주소입니다
      var imageSrc = MarkerLightening;
      var imageCenterSrc = MarkerMyLocation;

      //현재 위치 찍어주기
      for (var i = 0; i < nowPosition.length; i++) {
        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new kakao.maps.Size(10, 20);

        // 마커 이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(imageCenterSrc, imageSize);

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: nowPosition[i].latlng, // 마커를 표시할 위치
          title: nowPosition[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: markerImage, // 마커 이미지
        });
      }

      //주변 위치 찍어주기
      for (var i = 0; i < positions.length; i++) {
        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new kakao.maps.Size(24, 35);

        // 마커 이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: positions[i].latlng, // 마커를 표시할 위치
          title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: markerImage, // 마커 이미지
        });
      }
    }
    // 상세 검색 후 지도 표시
  }, [isLoad]);

  return (
    <>
      <MapHeaderWrap>
        <MapPageTitle>벙글 지도</MapPageTitle>
        <HeadrIconsWrap>
          <IconNotification src={Notification} />
          <IconSetting src={Setting} />
        </HeadrIconsWrap>
      </MapHeaderWrap>
      <div className="map-wrapper">
        {isDetail && (
          <div className="map-detail-modal-wrapper">
            <div
              className="map-detail-modal-overlay"
              // onClick={(e) => {
              //   handleDetailModal(e);
              // }}
            >
              <div className="map-detail-modal-inner">
                <div className="map-detail-modal-content-wrap">
                  <MapDetailHeaderWrap>
                    <ChattingBackKey
                      src={IconBackKey}
                      onClick={() => {
                        setIsDetail(false);
                        setOnlyDistance(10);
                        setOnlyNumber(2);
                        setSelectCategory([]);
                        setIsCategoryClick([
                          false,
                          false,
                          false,
                          false,
                          false,
                          false,
                          false,
                          false,
                          false,
                          false,
                        ]);
                      }}
                    />
                    <div
                      className="map-detail-modal-btn"
                      onClick={() => {
                        mapSearch();
                      }}
                    >
                      적용
                    </div>
                  </MapDetailHeaderWrap>
                  <div className="map-detail-modal-title-wrap">
                    <div className="map-detail-modal-title">세부 설정</div>
                    <img
                      src={IconReset}
                      alt=""
                      onClick={() => {
                        setOnlyDistance(10);
                        setOnlyNumber(2);
                        setSelectCategory([]);
                        setIsCategoryClick([
                          false,
                          false,
                          false,
                          false,
                          false,
                          false,
                          false,
                          false,
                          false,
                          false,
                        ]);
                      }}
                    />
                  </div>
                  <CategoryWrap>
                    {CategoryArray.map((item, index) => {
                      return (
                        <CategoryItem key={index}>
                          <CategoryImgWrap isChecked={isCategoryClick[index]}>
                            <CategoryImg
                              src={CategoryImgArray[index]}
                              onClick={() => {
                                if (selectCategory.includes(item)) {
                                  setSelectCategory(
                                    selectCategory.filter(
                                      (element) => element !== item
                                    )
                                  );
                                } else {
                                  setSelectCategory([...selectCategory, item]);
                                }
                                CategoryClickHandler(index);
                              }}
                            />
                          </CategoryImgWrap>

                          <CatogoryName>{item}</CatogoryName>
                        </CategoryItem>
                      );
                    })}
                  </CategoryWrap>
                  <div className="map-divider"></div>
                  <MapPostPeopleCount>
                    <PostPeopleCountTitleWrap>
                      <MapPostPeopleTitle>최대 거리</MapPostPeopleTitle>
                      <div
                        style={{
                          fontStyle: "normal",
                          fontWeight: "400",
                          fontSize: "12px",
                          lineHeight: "17px",
                        }}
                      >
                        {onlyDistance}km
                      </div>
                    </PostPeopleCountTitleWrap>
                    {/* rc slider   */}
                    <Slider
                      className="testName"
                      style={{ marginTop: "15px" }}
                      min={10}
                      max={50}
                      value={onlyDistance}
                      trackStyle={{
                        backgroundColor: "#FFC634",
                        border: "1px solid #898989",
                        height: 11,
                      }}
                      inverted={false}
                      handleStyle={{
                        border: "3px solid #FFC634",
                        height: 17,
                        width: 17,
                        marginLeft: 0,
                        marginTop: -2.5,
                        backgroundColor: "white",
                        cursor: "pointer",
                        opacity: 1,
                        boxShadow: "none !imporatnt",
                      }}
                      handle={{ boxShadow: "none" }}
                      onChange={setOnlyDistance}
                      railStyle={{
                        backgroundColor: "white",
                        border: "1px solid #898989",
                        height: 11,
                      }}
                    />
                  </MapPostPeopleCount>
                  <div className="map-detail-divider"></div>
                  {/*  */}
                  <MapPostPeopleCount>
                    <PostPeopleCountTitleWrap>
                      <MapPostPeopleTitle>최대 인원 수</MapPostPeopleTitle>
                      <div
                        style={{
                          fontStyle: "normal",
                          fontWeight: "400",
                          fontSize: "12px",
                          lineHeight: "17px",
                        }}
                      >
                        {onlyNumber}명
                      </div>
                    </PostPeopleCountTitleWrap>
                    {/* rc slider   */}
                    <Slider
                      className="testName"
                      style={{ marginTop: "15px" }}
                      min={2}
                      max={50}
                      value={onlyNumber}
                      trackStyle={{
                        backgroundColor: "#FFC634",
                        border: "1px solid #898989",
                        height: 11,
                      }}
                      inverted={false}
                      handleStyle={{
                        border: "3px solid #FFC634",
                        height: 17,
                        width: 17,
                        marginLeft: 0,
                        marginTop: -2.5,
                        backgroundColor: "white",
                        cursor: "pointer",
                        opacity: 1,
                        boxShadow: "none !imporatnt",
                      }}
                      handle={{ boxShadow: "none" }}
                      onChange={setOnlyNumber}
                      railStyle={{
                        backgroundColor: "white",
                        border: "1px solid #898989",
                        height: 11,
                      }}
                    />
                  </MapPostPeopleCount>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="map-content-searchbar">
          <input placeholder="태그를 검색해주세요" onKeyDown={onKeyDown} />
        </div>
        <div className="map-content-button">
          <div className="map-content-buttons">
            <div className="map-content-button-1">
              <img src={IconMyPoint} alt="" />
            </div>
            <div className="map-content-button-2">
              <img
                src={IconMapSort}
                alt=""
                onClick={() => {
                  setIsDetail(true);
                }}
              />
            </div>
          </div>
        </div>
        <div
          id="map"
          ref={container}
          style={{ width: "100%", height: "100%" }}
        ></div>
        <BottomSheet aroundLocation={getAroundBungle} />
      </div>
      {!isLoad && (
        <MapFooterWrap>
          <FooterIconWrap
            onClick={() => {
              navigate("/main");
            }}
          >
            <FooterIconImg src={IconHome} />
            <FooterIconText>홈</FooterIconText>
          </FooterIconWrap>
          <FooterIconWrap
            onClick={() => {
              navigate("/map");
            }}
          >
            <FooterIconImg src={IconLocation} />
            <FooterIconText>벙글지도</FooterIconText>
          </FooterIconWrap>
          {ownerCheck ? (
            <FooterAddBungae
              src={IconEdit}
              onClick={() => {
                navigate("/editpost");
              }}
            />
          ) : (
            <FooterAddBungae
              src={IconCreate}
              onClick={() => {
                navigate("/createpost");
              }}
            />
          )}
          <FooterIconWrap>
            <FooterIconImg
              src={IconChat}
              onClick={() => {
                navigate("/chatlist");
              }}
            />
            <FooterIconText>채팅</FooterIconText>
          </FooterIconWrap>
          <FooterIconWrap
            onClick={() => {
              navigate("/mypage");
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                navigate("/mypage");
              }}
            >
              <FooterIconImg src={IconMyBungae} />
              <FooterIconText>나의 벙글</FooterIconText>
            </div>
          </FooterIconWrap>
        </MapFooterWrap>
      )}
    </>
  );
}

export default Map;
