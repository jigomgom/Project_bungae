import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import AxiosAPI from "../../customapi/CustomAxios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

// 벙글 생성하기
export const createBungleList = createAsyncThunk(
  "CREATE/createBungleList",
  async (formData) => {
    try {
      const response = await AxiosAPI.post(`/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Authorization: localStorage.getItem("login-token"),
        },
      });
      console.log(response);
      if (response.data.response) {
        return response.data.postId;
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
      const response = await AxiosAPI.get(`/posts/mypost`, 
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
  async (postId) => {
    try {
      //axios.delete(URL, {params: payload}, header);
      const response = await AxiosAPI.delete(`/posts/${postId}`, 
      // {
      //   headers: {
      //     Authorization: localStorage.getItem("login-token"),
      //   },
      // }
      );
      console.log(response);
      if (response.data.response) {
        let data = {
          postId,
          isOwner: response.data.isOwner,
        };
        window.location.href = "/main";
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
        data.navigate("/tagsearch");// window.location.href = "/tagsearch";
        return response.data.list;
      }else{
        alert(response.data.message);
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
        {},
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
      const response = await AxiosAPI.get(`/posts/${postId}`, 
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
        {},
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
        window.location.herf = `/categorysearch/${item.category}`
        return response.data.list;
      } else {
        alert(`${response.data.message}`);
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
    // console.log( item );
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
      if (response.data.response) {
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
  async (formData) => {
    try {
      const response = await AxiosAPI.post(
        `/user/profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // Authorization: localStorage.getItem("login-token"),
          },
        }
      );
      console.log(response);
      if (response.data.response) {
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
      const response = await AxiosAPI.get(`/posts/like/`, 
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
      const response = await AxiosAPI.get(`/chat/rooms`, 
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
    ChatClient : {
      client : null,
      guest : 0,
    }
  },
  reducers: {
    // 클라이언트 값 가져오기
    getChatClient : ( state, action ) => {
      // console.log( "Chat client ", action.payload );
      state.ChatClient.client = action.payload.client;
      state.ChatClient.guest = action.payload.Guest;
    }
  },
  extraReducers: {
    // 벙글 생성, post ID 전달
    [createBungleList.fulfilled]: (state, action) => {
      console.log("create fullfill");
      // console.log( action.payload );
      console.log( action.payload );
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
    },
    [likeBungleList.rejected]: (state, action) => {
      console.log("Like reject");
    },
    // 더보기, 태그 검색 결과
    [moreBungleList.fulfilled]: (state, action) => {
      console.log( action.payload );
      state.moreList = action.payload;
    },
    [moreBungleList.rejected]: (state, action) => {},

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
      // let deleteSelector = "";
      //  // 마감 임박
      // const returnEndList = state.endTime.filter( ( item)=>{
      //   if( item.postId === postId ){
      //     deleteSelector = "real";
      //   }
      //   return item.postId !== postId;
      //   // if( item.postId !== postId ){
      //   //   // console.log( item );
      //   //   return item;
      //   // }
      // });
      // // 실시간
      // const returnRealList = state.realTime.filter( ( item ) => {
      //   if( item.postId === postId ){
      //     deleteSelector = "end";
      //   }
      //   return item.postId !== postId;
      // })

      // console.log(returnEndList );
      // console.log( returnRealList);
      // // state.endTime = [];
      // if( deleteSelector === "real" ){
      //   state.realTime = [];
      // }else if( deleteSelector === "end" ){
      //   state.endTime = [];
      // }

      // state.endTime = returnEndList;
      // state.realTime = returnRealList;
      state.isOwner = isOwner;
      // console.log( state.endTime, state.realTime );
    },
    [deleteMyBungleList.rejected]: (state, action) => {},
  },
});


export const { getChatClient } = BungleSlice.actions;
export default BungleSlice.reducer;
