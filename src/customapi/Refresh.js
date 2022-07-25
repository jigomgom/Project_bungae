import axios from "axios";
import moment from "moment";

import { setCookie, getCookie } from "./CustomCookie";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const refresh = async ( config ) => {
  let refreshToken = getCookie("refresh_token");
  const expireAt = localStorage.getItem("expireAt");
  let token = localStorage.getItem("login-token");
  console.log( "[interceptors]", expireAt );
  // console.log("refresh ", refreshToken);
  // console.log("login-token ", token );
  if( moment( expireAt ).diff(moment()) < 0 && refreshToken ){
    console.log("만료시간 경과");

    const response = await axios.post(`${SERVER_URL}/user/refresh`, {}, {
        headers:{
            Authorization: token,
            RefreshToken: refreshToken  
        }
    } );
    console.log( response );
    if (response.data.response) {
      setCookie("refresh_token", response.headers.refreshtoken, {
        path: "/",
        secure: true,
      });
      localStorage.setItem("login-token", response.headers.authorization);
      localStorage.setItem(
        "expireAt",
        moment().add(30, "minute").format("yyyy-MM-DD HH:mm:ss")
      );

      config.headers.Authorization = `${localStorage.getItem("login-token")}`;
      console.log("갱신 끝 ", localStorage.getItem("login-token"), localStorage.getItem("expireAt"));
    }else{
      alert(response.data.response, response.data.message);
    }
  }else{
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("[interceptors] not token");
  }
  
//   config.headers.Authorization = `Bearer ${token}`
  return config;
};

const refreshError = ( error ) => {
  console.log( error );
}

export { refresh, refreshError }