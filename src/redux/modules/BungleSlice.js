import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import AxiosAPI from "../../customapi/CustomAxios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

// 벙글 생성하기
export const createBungleList = createAsyncThunk(
  "CREATE/createBungleList",
  async (data) => {
    try {
      const response = await AxiosAPI.post(`/posts`, data.formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Authorization: localStorage.getItem("login-token"),
        },
      });
      console.log(response);
      if (response.status === 200 && response.data.response) {
        console.log(data);
        if (data.isLetter) {
          data.navigate("/chat");
          return response.data.postId;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
);
// 벙글 수정페이지 이동 시 데이터 전달받기
export const getMyBungleList = createAsyncThunk(
  "GET/getMyBungleList",
  async () => {
    // console.log("!!");
    // console.log( token );
    try {
      // const response = await axios.get(`${SERVER_URL}/posts/posts/mypost`, {
      const response = await AxiosAPI.get(
        `/posts/mypost`
        // {
        //   headers: {
        //     Authorization: localStorage.getItem("login-token"),
        //   },
        // }
      );
      // console.log(response);
      if (response.data.response) {
        return response.data.postResponseDto;
      }
    } catch (error) {
      console.log(error);
    }
  }
);
// 벙글 수정하기
export const editMyBungleList = createAsyncThunk(
  "EDIT/editMyBungleList",
  async (data) => {
    // console.log( data );
    try {
      const response = await AxiosAPI.put(
        `/posts/${data.postId}`,
        data.formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // Authorization: localStorage.getItem("login-token"),
          },
        }
      );
      if (response.data.response) {
        window.location.href = "/main";
      }
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }
);

// 벙글 삭제하기
export const deleteMyBungleList = createAsyncThunk(
  "DELETE/deleteMyBungleList",
  async (rev) => {
    try {
      //axios.delete(URL, {params: payload}, header);
      const response = await AxiosAPI.delete(
        `/posts/${rev.postId}`
        // {
        //   headers: {
        //     Authorization: localStorage.getItem("login-token"),
        //   },
        // }
      );
      console.log(response);
      if (response.data.response) {
        let data = {
          postId: rev.postId,
          isOwner: response.data.isOwner,
        };
        rev.navigate("/main");
        // window.location.href = "/main";
        return data;
      }
    } catch (e) {
      console.log(e);
    }
  }
);
// main 게시글 전체 조회
export const getMainBungleList = createAsyncThunk(
  "GET/getMainBungleList",
  async (position) => {
    try {
      const response = await AxiosAPI.get(`/posts`, {
        // headers: {
        //   Authorization: localStorage.getItem("login-token"),
        // },
        params: {
          latitude: position?.latitude,
          longitude: position?.longitude,
        },
      });
      console.log(response);
      if (response.status === 200) {
        // console.log("왜?");
        return response.data;
      }
    } catch (e) {
      console.log(e);
    }
  }
);
// Main 더보기 클릭
export const moreBungleList = createAsyncThunk(
  "MORE/moreBungleList",
  async (data) => {
    console.log(data);
    // const navigate = useNavigate();
    try {
      const response = await AxiosAPI.get(`/posts/more`, {
        // headers: {
        //   Authorization: localStorage.getItem("login-token"),
        // },
        params: {
          latitude: data.location.latitude,
          longitude: data.location.longitude,
          status: data.status,
        },
      });
      console.log(response);
      if (response.data.response) {
        data.navigate("/tagsearch"); // window.location.href = "/tagsearch";
        return response.data.list;
      } else {
        data.navigate("/tagsearch");
        // alert(response.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  }
);

// 지도 주변 벙글
export const getMapBungle = createAsyncThunk(
  "GET/getMapBungle",
  async (data) => {
    console.log(data);
    // const navigate = useNavigate();
    try {
      const response = await AxiosAPI.get(`/map`, {
        // headers: {
        //   Authorization: localStorage.getItem("login-token"),
        // },
        params: {
          latitude: data.latitude,
          longitude: data.longitude,
        },
      });
      console.log(response);
      if (response.data.response) {
        return response.data;
      } else {
        // alert(response.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  }
);

// 지도 상세 적용
export const getDetailMap = createAsyncThunk(
  "GET/getDetailMap",
  async (data) => {
    console.log(data);
    // if (data.selectCategory.length === 0) {
    //   data.selectCategory = "null";
    // }
    try {
      const response = await AxiosAPI.get(`/map/details`, {
        params: {
          categories: data.selectCategory,
          personnel: data.onlyNumber,
          distance: data.onlyDistance,
          latitude: data.location.latitude,
          longitude: data.location.longitude,
        },
      });
      console.log(response);
      if (response.data.response) {
        return response.data.mapListDtos;
      } else {
        // alert(response.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  }
);

// 게시글 찜하기
export const likeBungleList = createAsyncThunk(
  "LIKE/likeBungleList",
  async (postId) => {
    console.log(postId);
    try {
      const response = await AxiosAPI.post(
        `/posts/like/${postId}`,
        {}
        // {
        //   headers: {
        //     Authorization: localStorage.getItem("login-token"),
        //   },
        // }
      );
      console.log(response);
      if (response.data.response) {
        return postId;
      }
    } catch (e) {
      console.log(e);
    }
  }
);

// 게시글 상세 조회
export const detailBungleList = createAsyncThunk(
  "DETAIL/detailBungleList",
  async (postId) => {
    console.log(postId);
    try {
      const response = await AxiosAPI.get(
        `/posts/${postId}`
        // {
        //   headers: {
        //     Authorization: localStorage.getItem("login-token"),
        //   },
        // }
      );
      console.log(response);
      if (response.data.response) {
        return response.data.postDetailsResponseDto;
      }
    } catch (e) {
      console.log(e);
    }
  }
);

// 게시글 상세 조회 like 클릭
export const detailLikeBungleList = createAsyncThunk(
  "LIKE/detailLikeBungleList",
  async (postId) => {
    console.log(postId);
    try {
      const response = await AxiosAPI.post(
        `${SERVER_URL}/posts/like/${postId}`,
        {}
        // {
        //   headers: {
        //     Authorization: localStorage.getItem("login-token"),
        //   },
        // }
      );
      console.log(response);
      if (response.data.response) {
        return postId;
      }
    } catch (e) {
      console.log(e);
    }
  }
);

// 게시글 단일 카테고리 조회
export const categoryBungleList = createAsyncThunk(
  "GET/categoryBungleList",
  async (item) => {
    console.log(item);
    try {
      const response = await AxiosAPI.get(`/posts/categories`, {
        // headers: {
        //   Authorization: localStorage.getItem("login-token"),
        // },
        params: {
          latitude: item.location.latitude,
          longitude: item.location.longitude,
          // if( item.c)
          categories: item.category,
        },
      });
      console.log(response);
      if (response.data.response) {
        item.navigate(`/categorysearch/${item.category}`);
        return response.data.list;
      } else {
        // alert(`${response.data.message}`);
        item.navigate(`/categorysearch/${item.category}`);
      }
    } catch (e) {
      console.log(e);
    }
  }
);

// 게시글 단일 태그 조회
export const tagBungleList = createAsyncThunk(
  "GET/tagBungleList",
  async (item) => {
    // console.log(item);
    try {
      const response = await AxiosAPI.get(`/posts/tags`, {
        // headers: {
        //   Authorization: localStorage.getItem("login-token"),
        // },
        params: {
          latitude: item.location.latitude,
          longitude: item.location.longitude,
          tags: item.tag,
        },
      });
      console.log(response);
      if (response.data.response) {
        console.log(response.data.list);
        return response.data.list;
      }
    } catch (e) {
      console.log(e);
    }
  }
);
// 유저 프로필 조회
export const getUserProfile = createAsyncThunk(
  "GET/getUserProfile",
  async () => {
    try {
      const response = await AxiosAPI.get(`/user/profile`, {
        // headers: {
        //   Authorization: localStorage.getItem("login-token"),
        // },
      });
      console.log(response);
      if (response.data.response) {
        return response.data.profileResponseDto;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

// 유저 프로필 수정
export const editUserProfile = createAsyncThunk(
  "EDIT/editUserProfile",
  async (data) => {
    try {
      const response = await AxiosAPI.post(`/user/profile`, data.formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Authorization: localStorage.getItem("login-token"),
        },
      });
      console.log(response);
      if (response.data.response) {
        data.navigate("/mypage");
        return response.data.profileResponseDto;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

// 나의 찜 벙글 리스트
export const myLikeBungleList = createAsyncThunk(
  "GET/myLikeBungleList",
  async () => {
    try {
      const response = await AxiosAPI.get(
        `/posts/like/`
        // {
        //   headers: {
        //     Authorization: localStorage.getItem("login-token"),
        //   },
        // }
      );
      console.log(response);
      if (response.data.response) {
        return response.data.list;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

// 채팅 목록 조회
export const myChattingList = createAsyncThunk(
  "GET/myChattingList",
  async () => {
    // console.log(1);
    try {
      const response = await AxiosAPI.get(
        `/chat/rooms`
        // {
        //   headers: {
        //     Authorization: localStorage.getItem("login-token"),
        //   },
        // }
      );
      console.log(response);
      if (response.data) {
        return response.data;
      }
    } catch (e) {
      console.log(e);
    }
  }
);

// 실시간 알림
export const getIntervalNotification = createAsyncThunk(
  "GET/getIntervalNotification",
  async () => {
    try {
      const response = await AxiosAPI.get(`/noti`);
      // console.log( response );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const BungleSlice = createSlice({
  name: "Bungle",
  isOwner: false,
  initialState: {
    isOwner: false,
    // 유저 프로필
    userProfile: {},
    // 게시물 생성 하자마자 채팅룸 아이디 전달
    OnwerPostId: 0,
    // 채팅 참여 postId
    GuestPostId: 0,
    // 상세 조회
    detailBungle: {},
    // 마감 임박
    endTime: [{}],
    // 실시간
    realTime: [{}],
    // 더보기 및 태그
    moreList: [{}],
    // 카테고리
    categoriesList: [{}],
    // 내 찜 목록
    myLikeList: [{}],
    // 내가 작성한 게시물 조회
    myBunglePost: {},
    list: [{}],
    // 내 채팅 목록
    myChatting: [],
    // 문자 채팅 client
    ChatClient: {
      client: null,
      guest: 0,
    },
    // nofitication state
    isReadNotification: false,
    NofiticationList: [{}],
    // 화상 채팅 info
    VideoInfo: {},
    //지도 화면 렌더링 되자마자 보여줄 리스트
    mapList: [{}],
    //지도 화면 상세 검색 후 보여줄 리스트
    detailMapBungle: [{}],
  },
  reducers: {
    // 클라이언트 값 가져오기
    getChatClient: (state, action) => {
      console.log("Chat client ", action.payload);
      state.ChatClient.client = action.payload.client;
      state.ChatClient.guest = action.payload.Guest;
    },
    setNotificationState: (state, action) => {},
  },
  extraReducers: {
    // 벙글 생성, post ID 전달
    [createBungleList.fulfilled]: (state, action) => {
      console.log("create fullfill");
      // console.log( action.payload );
      console.log(action.payload);
      state.OnwerPostId = action.payload;
    },
    [createBungleList.rejected]: (state, action) => {
      // console.log("create reject");
    },

    // Main 전체 게시글 조회
    [getMainBungleList.fulfilled]: (state, action) => {
      console.log("Main get");
      // console.log( action.payload )
      if (action.payload) {
        state.isOwner = action.payload?.isOwner;

        state.endTime = action.payload.postListEndTime;
        state.realTime = action.payload.postListRealTime;
        // console.log( current( state.endTime ), current( state.realTime ) );
      }
    },
    [getMainBungleList.rejected]: (state, action) => {
      console.log("Main reject");
    },

    // 게시글 찜하기
    [likeBungleList.fulfilled]: (state, action) => {
      console.log(action.payload);
      // realTime Update
      const realTimeUpdate = current(state.realTime).map((item) => {
        // console.log( item )
        if (item.postId === action.payload) {
          // console.log( item.isLike );
          if (item.isLike) {
            return { ...item, isLike: false };
          } else {
            return { ...item, isLike: true };
          }
        } else {
          return item;
        }
      });
      state.realTime = realTimeUpdate;
      // endTimeUpdate
      const endTimeUpdate = current(state.endTime).map((item) => {
        // console.log( item )
        if (item.postId === action.payload) {
          // console.log( item.isLike );
          if (item.isLike) {
            return { ...item, isLike: false };
          } else {
            return { ...item, isLike: true };
          }
        } else {
          return item;
        }
      });
      state.endTime = endTimeUpdate;

      // more or Tag search Update
      const moreTempUpdate = current(state.moreList).map((item) => {
        console.log(item);
        if (item.postId === action.payload) {
          // console.log( item.isLike );
          if (item.isLike) {
            return { ...item, isLike: false };
          } else {
            return { ...item, isLike: true };
          }
        } else {
          return item;
        }
      });

      state.moreList = moreTempUpdate;

      // 카테고리 update
      const CategoryUpdate = current(state.categoriesList).map((item) => {
        // console.log( item )
        if (item.postId === action.payload) {
          // console.log( item.isLike );
          if (item.isLike) {
            return { ...item, isLike: false };
          } else {
            return { ...item, isLike: true };
          }
        } else {
          return item;
        }
      });

      state.categoriesList = CategoryUpdate;

      // 지도 벙글 update
      const MapBungleUpdate = current(state.mapList).map((item) => {
        // console.log(item);
        if (item.postId === action.payload) {
          if (item.isLike) {
            return { ...item, isLike: false };
          } else {
            return { ...item, isLike: true };
          }
        } else {
          return item;
        }
      });
      state.mapList = MapBungleUpdate;

      // 지도 상세 검색 벙글 update
      const MapDetailBungleUpdate = current(state.detailMapBungle).map(
        (item) => {
          // console.log(item);
          if (item.postId === action.payload) {
            if (item.isLike) {
              return { ...item, isLike: false };
            } else {
              return { ...item, isLike: true };
            }
          } else {
            return item;
          }
        }
      );
      console.log(MapDetailBungleUpdate);
      state.detailMapBungle = MapDetailBungleUpdate;

      const MyLikeBungleUpdate = current(state.myLikeList).map((item) => {
        console.log(item, action.payload);
        if (item.postId === action.payload) {
          if (item.isLike) {
            return { ...item, isLike: false };
          } else {
            return { ...item, isLike: true };
          }
        } else {
          return item;
        }
      });

      state.myLikeList = MyLikeBungleUpdate;
    },
    [likeBungleList.rejected]: (state, action) => {
      console.log("Like reject");
    },
    // 더보기, 태그 검색 결과
    [moreBungleList.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.moreList = action.payload;
    },
    [moreBungleList.rejected]: (state, action) => {},

    // 지도 리스트
    [getMapBungle.fulfilled]: (state, action) => {
      // console.log(action.payload);
      state.mapList = action.payload.mapListDtos;
      state.isOwner = action.payload.owner;
    },
    [getMapBungle.rejected]: (state, action) => {},

    // 지도 상세 검색 후리스트
    [getDetailMap.fulfilled]: (state, action) => {
      // console.log(action.payload);
      state.detailMapBungle = action.payload;
    },
    [getDetailMap.rejected]: (state, action) => {},

    // 상세 조회
    [detailBungleList.fulfilled]: (state, action) => {
      // console.log( action.payload );
      state.detailBungle = action.payload;
    },
    [detailBungleList.rejected]: (state, action) => {
      console.log("상세조회 실패");
    },
    // 상세 게시글 좋아요 클릭
    [detailLikeBungleList.fulfilled]: (state, action) => {
      if (state.detailBungle.isLike) {
        state.detailBungle.isLike = false;
      } else {
        state.detailBungle.isLike = true;
      }
    },
    // 카테고리 조회
    [categoryBungleList.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.categoriesList = action.payload;
    },
    [categoryBungleList.rejected]: (state, action) => {},

    // 태그 조회
    [tagBungleList.fulfilled]: (state, action) => {
      //console.log( action.payload );
      state.moreList = action.payload;
    },
    [tagBungleList.rejected]: (state, action) => {},

    // 유저 프로필 조회
    [getUserProfile.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.userProfile = action.payload;
    },
    [getUserProfile.rejected]: (state, action) => {},

    // 유저 프로필 수정
    [editUserProfile.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.userProfile = action.payload;
    },
    [editUserProfile.rejected]: (state, action) => {},
    [myLikeBungleList.fulfilled]: (state, action) => {
      state.myLikeList = action.payload;
    },
    // 채팅 목록 조회
    [myChattingList.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.myChatting = action.payload;
    },
    [myChattingList.rejected]: (state, action) => {
      console.log("상세조회 실패");
    },
    [getMyBungleList.fulfilled]: (state, action) => {
      // console.log( action.payload );
      state.myBunglePost = action.payload;
    },

    // 게시물 삭제
    [deleteMyBungleList.fulfilled]: (state, action) => {
      console.log(action.payload);
      const postId = action.payload.postId;
      const isOwner = action.payload.isOwner;

      state.isOwner = isOwner;
      // console.log( state.endTime, state.realTime );
    },
    [deleteMyBungleList.rejected]: (state, action) => {},
    // 알림
    [getIntervalNotification.fulfilled]: (state, action) => {
      console.log(action.payload);
    },
    [getIntervalNotification.rejected]: (state, action) => {},
  },
});

export const { getChatClient } = BungleSlice.actions;
export default BungleSlice.reducer;
