import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "next-auth/react";
const Urls = "http://127.0.0.1:8000/users/me";

export const getUser_infos = createAsyncThunk(
  "userinfos/get_infos",

  async () => {
    const tkn = localStorage.getItem("sgn");
    const response = await axios.get(Urls, {
      headers: { Authorization: `Bearer ${tkn}` },
    });

    //console.log(response.data);
    return response.data;
  }
);

const baseUrl = "http://127.0.0.1:8000/addcategory";
export const AddCategory = createAsyncThunk(
  "groups/AddStore",
  async (data) => {
    try {
      const response = await axios.post(baseUrl, data);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);
const updateUrl = "http://127.0.0.1:8000/stores_update";

export const UPDATEStore = createAsyncThunk(
  "groups/UpdateGroup",
  async (data) => {
   
    try {

      const response = await axios.put(updateUrl, data.infos,{
        headers: { Authorization: `Bearer ${data.tkn}` },
      } );

      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const DeleteStore = createAsyncThunk(
  "groups/Deletestore",
  async (data) => {
    try {
      const delurl="http://127.0.0.1:8000/Delete_stores/"+data.Did;
      const response = await axios.delete(delurl,{
        headers: { Authorization: `Bearer ${data.tkn}` },
      });
      console.log(response);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);



// export const CurrentGroupDetails = createAsyncThunk(
//   "groups/Detail",
//   async (data) => {
//     try {


//       const currentGroupUrl="http://127.0.0.1:8000/group/"+data.Did;
//       const response = await axios.get(currentGroupUrl,{
//         headers: { Authorization: `Bearer ${data.tkn}` },
//       });
//       console.log(response);
//       return response.data;
//     } catch (err) {
//       console.error(err);
//     }
//   }
// );




const initialState = {
  value: 0,
  Userinfos: null,
  role: "",
  msg:null,
  categorytbl:[],
  storedtl:[],
  descript: "",
  statu: "",
  groupnames: "",
};

export const groups = createSlice({
  name: "groups",
  initialState,

  reducers: {
    change_msg: (state, action) => {
      state.msg = action.payload;
    },

    getcategory:(state, action)=>{
      state.categorytbl=action.payload.items;
    },
    getinventorydetail:(state,action)=>{
      state.storedtl=action.payload;
    }
    // getdescription:(state,action)=>{
    //   state.descript=action.payload;
    // },
    // getstatus:(state,action)=>{
    //   state.statu=action.payload;
    // },
    // getgroupname:(state,action)=>{
    //   state.groupnames=action.payload;
    // },



   

  },

  extraReducers: (builder) => {
    builder.addCase(AddCategory.pending, (state) => {});

    builder.addCase(AddCategory.fulfilled, (state, action) => {
      state.msg = action.payload.Message;
    });

    builder.addCase(DeleteStore.fulfilled, (state, action) => {
      console.log(action.payload)
    });

    builder.addCase(UPDATEStore.fulfilled, (state, action) => {
      state.msg = action.payload.Message;
      console.log(action.payload);
    });

  },






});

export const { change_msg, getcategory, getinventorydetail} = groups.actions;
export default groups.reducer;
