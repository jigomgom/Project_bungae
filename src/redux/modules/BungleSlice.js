import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_URL = "http://3.37.61.25";
// const SERVER_URL = "http://52.79.214.48";
const token = localStorage.getItem("login-token");

// 벙글 생성하기
export const createBungleList = createAsyncThunk(
  "CREATE/createBungleList",
  async (formData) => {
    // console.log( JSON.stringify(formData));
    // console.log( token );
    try {
      const response = await axios.post(`${SERVER_URL}/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
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
    try {
      const response = await axios.get(`${SERVER_URL}/posts/mypost`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
);
// 벙글 수정하기
export const editMyBungleList = createAsyncThunk(
  "EDIT/editMyBungleList"
  // async( formData ) => {
  //   try {
  //     const response = await axios.put(`${SERVER_URL}/posts/${postID}`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: token,
  //       },
  //     });
  //     console.log( response );
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
);

// 벙글 삭제하기
export const deleteMyBungleList = createAsyncThunk(
  "DELETE/deleteMyBungleList"
  // async () => {
  //   try {
  //     //axios.delete(URL, {params: payload}, header);
  //     const response = await axios.delete(`${SERVER_URL}/posts/${postID}`, {
  //       headers: {
  //         Authorization: token,
  //       },
  //     });
  //     console.log(response);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
);
// main 게시글 전체 조회
export const getMainBungleList = createAsyncThunk(
  "GET/getMainBungleList",
  async (position) => {
    console.log(position);
    try {
      const response = await axios.get(`${SERVER_URL}/posts`, {
        headers: {
          Authorization: token,
        },
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
    try {
      const response = await axios.get(`${SERVER_URL}/posts/more`, {
        headers: {
          Authorization: token,
        },
        params: {
          latitude: data.location.latitude,
          longitude: data.location.longitude,
          status: data.status,
        },
      });
      console.log(response);
      if (response.data.response) {
        return response.data.list;
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
      const response = await axios.post(
        `${SERVER_URL}/posts/like/${postId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
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
      const response = await axios.get(`${SERVER_URL}/posts/${postId}`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response);
      if (response.data.response) {
        return response.data.postDetailsResponseDto;
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
      const response = await axios.get(`${SERVER_URL}/posts/categories`, {
        headers: {
          Authorization: token,
        },
        params: {
          latitude: item.location.latitude,
          longitude: item.location.longitude,
          // if( item.c)
          categories: item.category,
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

// 게시글 단일 태그 조회
export const tagBungleList = createAsyncThunk(
  "GET/tagBungleList",
  async (item) => {
    // console.log( item );
    try {
      const response = await axios.get(`${SERVER_URL}/posts/tags`, {
        headers: {
          Authorization: token,
        },
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
      const response = await axios.get(`${SERVER_URL}/user/profile`, {
        headers: {
          Authorization: token,
        },
      });
      // console.log( response );
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
      const response = await axios.post(
        `${SERVER_URL}/user/profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      console.log(response);
      // if( response.data.response ){
      //   return response.data.postId;
      // }
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
      const response = await axios.get(`${SERVER_URL}/posts/like/`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response);
      if (response.data.response) {
        return response.data.list;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const BungleSlice = createSlice({
  name: "Bungle",
  initialState: {
    isOwner: false,
    myBungleList: {
      title: "막걸리 한잔 하실 분",
      content: "비도 오는데 막걸리에 파전 어떠세요?",
      categories: ["맛집", "친목"],
      tags: ["비", "막걸리", "파전"],
      time: "2022-07-13 19:00:00",
      place: "수원시 영통구 매영대로 31",
      postUrls: [
        "https://meeting-project.s3.ap-northeast-2.amazonaws.com/0c7f4d22-8a40-423d-ba5b-341c6635dae9.jpg",
        "https://meeting-project.s3.ap-northeast-2.amazonaws.com/3c6926fc-5bc6-471d-93ce-1e0e4f22e092.jpg",
      ],
      personnel: 5,
      isLetter: true,
    },
    // 유저 프로필
    userProfile: {},
    // 게시물 생성 하자마자 채팅룸 아이디 전달
    postId: 0,
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
    list: [{}],
  },
  reducers: {},
  extraReducers: {
    // middlewares
    // 벙글 생성, post ID 전달
    [createBungleList.fulfilled]: (state, action) => {
      console.log("create fullfill");
      // console.log( action.payload );
      state.postId = action.payload;
    },
    [createBungleList.rejected]: (state, action) => {
      // console.log("create reject");
    },
    // Main 전체 게시글 조회
    [getMainBungleList.fulfilled]: (state, action) => {
      console.log("Main get");
      // console.log( action.payload );
      // console.log(action.payload.isOwner );
      state.isOwner = action.payload.isOwner;
      state.endTime = action.payload.postListEndTime;
      state.realTime = action.payload.postListRealTime;
      // console.log( current( state.endTime ), current( state.realTime ) );
    },
    [getMainBungleList.rejected]: (state, action) => {
      console.log("Main reject");
    },
    // 게시글 찜하기
    [likeBungleList.fulfilled]: (state, action) => {
      // console.log( action.payload );
      // realTime Update
      const realTimeUpdate = current(state.realTime).map((item) => {
        // console.log( item )
        if (item.id === action.payload) {
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
        if (item.id === action.payload) {
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
        if (item.id === action.payload) {
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
        if (item.id === action.payload) {
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
      state.moreList = action.payload;
    },
    [moreBungleList.rejected]: (state, action) => {},
    [detailBungleList.fulfilled]: (state, action) => {
      // console.log( action.payload );
      state.detailBungle = action.payload;
    },
    [detailBungleList.rejected]: (state, action) => {
      console.log("상세조회 실패");
    },
    // 카테고리 조회
    [categoryBungleList.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.categoriesList = action.payload;
    },
    [categoryBungleList.rejected]: (state, action) => {},
    [tagBungleList.fulfilled]: (state, action) => {
      //console.log( action.payload );
      state.moreList = action.payload;
    },
    [tagBungleList.rejected]: (state, action) => {},
    // 유저 프로필 조회
    [getUserProfile.fulfilled]: (state, action) => {
      state.userProfile = action.payload;
    },
    [getUserProfile.rejected]: (state, action) => {},
    [editUserProfile.fulfilled]: (state, action) => {
      console.log(action.payload);
    },
    [editUserProfile.rejected]: (state, action) => {},
    [myLikeBungleList.fulfilled]: (state, action) => {
      state.myLikeList = action.payload;
    },
  },
});

// export const { changeLoginState } = FeedSlice.actions;
export default BungleSlice.reducer;
