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

const baseUrl = "http://127.0.0.1:8000/addgroup";
export const AddGroup = createAsyncThunk(
  "groups/AddGroup",
  async (data) => {
    try {
      const response = await axios.post(baseUrl, data);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);



export const DeleteGroup = createAsyncThunk(
  "groups/Delete",
  async (data) => {
    try {


      const delurl="http://127.0.0.1:8000/Delete_group/"+data.Did;
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




const initialState = {
  value: 0,
  Userinfos: null,
  username: "",
  first_name: "",
  second_name: "",
  role: "",
  msg:null,
  groupstbl:[]
};

export const groups = createSlice({
  name: "groups",
  initialState,

  reducers: {
    change_msg: (state, action) => {
      state.msg = action.payload;
    },

    getgroups:(state, action)=>{
      state.groupstbl=action.payload.items;
    }

  },

  extraReducers: (builder) => {
    builder.addCase(AddGroup.pending, (state) => {});

    builder.addCase(AddGroup.fulfilled, (state, action) => {
      state.msg = action.payload.Message;
    });

    builder.addCase(DeleteGroup.fulfilled, (state, action) => {
      console.log(action.payload)
    });
  },






});

export const { change_msg, getgroups } = groups.actions;
export default groups.reducer;
