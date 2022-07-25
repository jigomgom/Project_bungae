import React, { useEffect, useState } from "react";
import UserModel from "./user-model";
import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import StreamComponent from "./StreamComponent";
import styled from "styled-components";

// css
import { VideoHeaderWrap, VideoChatBackKey } from "../../styles/StyledHeader";
import {
  VideoWrapper,
  VideoButtonWrap,
  ButtonImageWrap,
  ButtonImage,
} from "../../styles/StyledVideo";

// icon
import IconBackKey from "../../assets/icon-left-arrow.svg";
import IconCall from "../../assets/icon-calling.svg";
import IconCallNone from "../../assets/icon-calling-none.svg";
import IconSpeaker from "../../assets/icon-speaker.svg";
import IconSpeakerNone from "../../assets/icon-speaker-none.svg";

let localUser = new UserModel();
let newUser = new UserModel();
let newPublisher = null;
// 나중에 우리 서버가 되야할 URL
// const OPENVIDU_SERVER_URL = "https://localhost:4443";
const OPENVIDU_SERVER_URL = process.env.REACT_APP_OPENVIDU_SERVER_URL;
// const OPENVIDU_SERVER_URL = "https://real-minsu.shop";
// 서버와 같이 맞춰야할 시크릿 키로 보임
// const OPENVIDU_SERVER_SECRET = "MY_SECRET";
const OPENVIDU_SERVER_SECRET = process.env.REACT_APP_OPENVIDU_SECRET_KEY;

function OpenViduSettings() {
  let OV = new OpenVidu();
  OV.setAdvancedConfiguration({
    publisherSpeakingEventsOptions: {
      interval: 5,
      threshold: -800,
    },
  });
  const [session, setSession] = useState();
  const [openViduToken, setOpenViduToken] = useState(null);
  const [initialState, setInitialState] = useState({});
  const [publisher, setPublisher] = useState();
  const [subscribers, setSubscribers] = useState([]);
  const [speakerId, setSpeakerId] = useState("");
  const [stopSpeakerId, setStopSpeakerId] = useState("");
  const [Speaking, setSpeaking] = useState(false);
  const [deviceID, setDeviceId] = useState(null);
  const [islocalUser, setIslocalUser] = useState(null);

  const [stateSpeaker, setStateSpeaker] = useState(false);
  const [stateCall, setStateCall] = useState(false);

  let all_Subscribers = [];
  let localUserPublish = null;
  useEffect(() => {
    //1. 처음 렌더링 시, 카메라, 마이크 권한을 요청한다.
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        console.log("허용 완료 ", stream);
        joinSession();
        // subscribeToStreamCreated();
        // 초기 값을 설정한다.
        setInitialState({
          mySessionId: "SessionA",
          myUserName: "Tester" + Math.floor(Math.random() * 100),
          session: undefined,
          localUser: undefined,
          currentVideoDevice: undefined,
        });
      })
      .catch((error) => {
        // console.log(error);
        if (
          error.name === "NotFoundError" ||
          error.name === "DevicesNotFoundError"
        ) {
          //required track is missing
          console.log(error.name);
        } else if (
          error.name === "NotReadableError" ||
          error.name === "TrackStartError"
        ) {
          //webcam or mic are already in use, 캠이나 마이크가 이미 다른 쪽에 사용중
          alert("다른 설정에서 마이크, 카메라 권한을 사용 중입니다.");
        } else if (
          error.name === "OverconstrainedError" ||
          error.name === "ConstraintNotSatisfiedError"
        ) {
          //constraints can not be satisfied by avb. devices
        } else if (
          error.name === "NotAllowedError" ||
          error.name === "PermissionDeniedError"
        ) {
          //permission denied in browser 사용자가 허용을 거부함
          alert("사이트 설정에서 마이크, 카메라 권한을 설정해주세요.");
        } else if (error.name === "TypeError" || error.name === "TypeError") {
          //empty constraints object
          // console.log( error.name )
        } else {
          //other errors
          console.log(error.name);
        }
      });
    return () => {
      leaveSession();
    };
  }, []);
  // 2. OV 객체를 만들고 초기화한다.
  const joinSession = () => {
    // let OV = new OpenVidu();
    console.log("1. joinSession ", OV);
    // OV log 가리기
    //Disable all logging except error level / Returns void
    OV.enableProdMode();
    setSession(OV.initSession());
  };
  useEffect(() => {
    if (session) {
      console.log("2. 세션에 연결한다.");
      connectToSession();
      subscribeStateComfirm(session);
    }
  }, [session]);

  useEffect(() => {
    if (session && openViduToken) {
      console.log("4. token과 session을 이용해 connect를 실행한다.");
      console.log(
        "connect 실행",
        openViduToken,
        session,
        initialState.myUserName
      );
      session
        .connect(openViduToken, { clientData: initialState.myUserName })
        .then(() => {
          console.log("4-1. connect가 성공적이라면 캠을 연결하러 간다.");
          connectWebCam();
        })
        .catch((error) => {
          console.log(error);
        });
      // connect(openViduToken, session);
      console.log("여기는 언제 들어와");
    }
  }, [openViduToken]);

  useEffect(() => {
    if (publisher) {
      session.publish(publisher).then(() => {
        // console.log("7. session publish를 성공하면 subscriber를 등록한다.");
        // setSubscribers( [...remotes] );
      });
    }
  }, [publisher]);

  // 3. 토큰을 획득하기 위해선 먼저 session을 만들고
  // 그 세션의 ID를 받아와서
  // token을 생성한다.
  // getToken -> createSession.then이면 -> createToken
  const connectToSession = () => {
    // console.log("3. token을 획득하러 간다")
    getToken();
  };

  const getToken = () => {
    // console.log("3-1. token 획득하려면 세션부터 만들어야 한다.")
    createSession(initialState.mySessionId);
  };

  const createSession = async (sessionId) => {
    // console.log("3-2. 세션을 만들기 위해 axios 통신을 한다..")
    try {
      const data = JSON.stringify({ customSessionId: sessionId });
      const response = await axios.post(
        `${OPENVIDU_SERVER_URL}/openvidu/api/sessions`,
        data,
        {
          headers: {
            Authorization:
              "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        // Session을 성공적으로 만들었다면 id를 전달한다.
        // console.log("3-3. 세션을 성공적으로 만들었다면 token을 만들러 간다..")
        createToken(response.data.id);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 409) createToken(sessionId);
    }
  };

  const createToken = async (sessionId) => {
    // console.log("3-4. 세션이 만들어지고 받은 id를 이용해서 token을 만든다.");
    try {
      const data = JSON.stringify({});
      const response = await axios.post(
        OPENVIDU_SERVER_URL +
          "/openvidu/api/sessions/" +
          sessionId +
          "/connection",
        data,
        {
          headers: {
            Authorization:
              "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        // console.log("3-5. 토큰을 정상적으로 받았다면 토큰을 세팅한다.");
        setOpenViduToken(response.data.token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connect = (token, session) => {
    // console.log("4. token과 session을 이용해 connect를 실행한다.")
    console.log("connect 실행", token, session, initialState.myUserName);
    session
      .connect(token, { clientData: initialState.myUserName })
      .then(() => {
        // console.log("4-1. connect가 성공적이라면 캠을 연결하러 간다.");
        connectWebCam();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const connectWebCam = async () => {
    // console.log("5. 캠을 연결한다");
    const devices = await OV.getDevices();

    const videoDevices = devices.filter(
      (device) => device.kind === "videoinput"
    );

    // console.log("6. 디바이스 설정을 가져오면 publisher를 setting한다");
    localUserPublish = OV.initPublisher(undefined, {
      audioSource: undefined, // The source of audio. If undefined default microphone
      videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
      publishAudio: localUser.isAudioActive(), // Whether you want to start publishing with your audio unmuted or not
      publishVideo: localUser.isVideoActive(), // Whether you want to start publishing with your video enabled or not
      resolution: "330x180", // The resolution of your video
      frameRate: 30, // The frame rate of your video
      insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
      mirror: false, // Whether to mirror your local video or not
    });

    // console.log( localUserPublish );
    setPublisher(localUserPublish);

    localUser.setStreamManager(localUserPublish);
    localUser.setConnectionId(session.connection.connectionId);
    setDeviceId(videoDevices[0]);
    setIslocalUser(localUser);
    // initialState({currentVideoDevice: videoDevices[0], localUser : localUser })
    // subscribeToUserChanged();
  };

  const subscribeStateComfirm = (session) => {
    session.on("streamCreated", (event) => {
      // console.log("5-1. streamCreate라면 여기");
      const subscriber = session.subscribe(event.stream, undefined);

      newUser.setStreamManager(subscriber);
      // console.log("newUser", event.stream.connection.connectionId);
      newUser.setConnectionId(event.stream.connection.connectionId);
      let tmp = [...all_Subscribers];
      tmp.push(subscriber);
      setSubscribers(tmp);
      all_Subscribers = tmp;

      // updateSubscribers( subscriber );
    });

    session.on("streamDestroyed", (event) => {
      // console.log("5-2. streamDestroyed라면 여기");
      const index = all_Subscribers.indexOf(event.stream.streamManager, 0);
      let tmp = [...all_Subscribers];
      if (index > -1) {
        tmp.splice(index, 1);
      }
      setSubscribers(tmp);
      all_Subscribers = tmp;
    });

    session.on("sessionDisconnected", (event) => {
      console.log(event);
    });

    session.on("connectionDestroyed", (event) => {
      console.log(event);
    });

    session.on("publisherStartSpeaking", (event) => {
      // console.log("Use speaking");
      setSpeakerId(event.connection.connectionId);
      setSpeaking(true);
      // console.log("User " + event.connection.connectionId + " start speaking");
    });

    session.on("publisherStopSpeaking", (event) => {
      setStopSpeakerId(event.connection.connectionId);
      setSpeaking(false);
      // console.log("User " + event.connection.connectionId + " stop speaking");
    });
  };
  // 캠 끄고 켜기
  const camStatusChanged = () => {
    // console.log("camStatusChanged");
    setStateCall(!stateCall);
    localUser.setVideoActive(!localUser.isVideoActive());
    console.log(localUser);
    localUser.getStreamManager().publishVideo(localUser.isVideoActive());
  };
  // 마이크 끄고 켜기
  const micStatusChanged = () => {
    // console.log("micStatusChanged");

    setStateSpeaker(!stateSpeaker);
    localUser.setAudioActive(!localUser.isAudioActive());
    localUser.getStreamManager().publishAudio(localUser.isAudioActive());
  };

  // 카메라 스위칭

  const leaveSession = () => {
    OV = null;
    console.log("leaveSession");
    if (session) {
      session.disconnect();
    }
    setSession(null);
    setInitialState({
      session: undefined,
      subscribers: [],
      mySessionId: "SeesionA",
      myUserName: "Tester2" + Math.floor(Math.random() * 100),
    });
    setPublisher(null);
    setSubscribers([]);
    all_Subscribers = [];
    localUserPublish = null;
    newUser = null;
  };
  return (
    <VideoWrapper>
      <VideoHeaderWrap>
        <VideoChatBackKey src={IconBackKey} onClick={() => {}} />
      </VideoHeaderWrap>
      <div>
        <TestDiv>
          <StreamComponent
            speaking={Speaking}
            speaker={speakerId}
            streamManager={publisher}
          />
          {Array.from({ length: 3 }, (_, index) => {
            return (
              <StreamComponent
                streamManager={subscribers[index]}
                speaking={Speaking}
                speaker={speakerId}
              />
            );
          })}
        </TestDiv>
        <VideoButtonWrap>
          <ButtonImageWrap onClick={() => micStatusChanged()}>
            <ButtonImage src={stateSpeaker ? IconSpeaker : IconSpeakerNone} />
          </ButtonImageWrap>
          <ButtonImageWrap onClick={() => camStatusChanged()}>
            <ButtonImage src={stateCall ? IconCall : IconCallNone} />
          </ButtonImageWrap>
          {/* { console.log( stateSpeaker, stateCall )} */}
        </VideoButtonWrap>
      </div>
    </VideoWrapper>
  );
}

const TestDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export default OpenViduSettings;