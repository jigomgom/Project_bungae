/* global kakao */
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//Icons
import MarkerLightening from "../assets/icon-map-lightening.svg";
import MarkerMyLocation from "../assets/icon-map-center.svg";
import IconMyPoint from "../assets/icon-mylocation.svg";
import IconMapSort from "../assets/icon-map-sort.svg";

//Components
import BottomSheet from "./BottomSheet";

//CSS
import "../styles/Map.css";

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
  //주변 위치 벙글 담는 배열
  const [aroundLocation, setAroundLocation] = useState([]);

  //현재 위치 state에 현재 위치 담기
  const handleSuccess = (pos) => {
    const { latitude, longitude } = pos.coords;

    setLocation({
      latitude,
      longitude,
    });
  };
  console.log(location);

  //지도 화면 axios
  const getMapLocation = () => {
    axios({
      method: "get",
      url: `${SERVER_URL}/map`,
      headers: {
        Authorization: token,
      },
      params: {
        latitude: location?.latitude,
        longitude: location?.longitude,
      },
    })
      .then((response) => {
        console.log(response.data.mapListDtos);
        setAroundLocation(response.data.mapListDtos);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (location) {
      getMapLocation();
    }
  }, [location]);

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
    timeout: 5000,
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
    if (!isLoad && aroundLocation) {
      const options = {
        //지도를 생성할 때 필요한 기본 옵션
        // center: new kakao.maps.LatLng(location.latitude, location.longitude), //지도의 중심좌표.
        // center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        center: new kakao.maps.LatLng(location.latitude, location.longitude), //지도의 중심좌표.
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
      aroundLocation.map((location, index) => {
        console.log(location);
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
  }, [isLoad]);

  return (
    <div className="map-wrapper">
      <div className="map-content-searchbar">
        <input placeholder="위치를 검색해주세요" />
      </div>
      <div className="map-content-button">
        <div className="map-content-button-1">
          <img src={IconMyPoint} alt="" />
        </div>
        <div className="map-content-button-2">
          <img src={IconMapSort} alt="" />
        </div>
      </div>
      <div
        id="map"
        ref={container}
        style={{ width: "100%", height: "84vh" }}
      ></div>
      <BottomSheet aroundLocation={aroundLocation} />
    </div>
  );
}

export default Map;
