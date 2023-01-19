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

const baseUrl = "http://127.0.0.1:8000/addsection";


export const AddSection = createAsyncThunk(
  "sections/AddSection",
  async (data) => {
    try {
      const response = await axios.post(baseUrl, data);
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
};

export const sections = createSlice({
  name: "sections",
  initialState,

  reducers: {
    change_msg: (state, action) => {
      state.msg = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(AddSection.pending, (state) => {});

    builder.addCase(AddSection.fulfilled, (state, action) => {
      state.msg = action.payload.Message;
      console.log(action.payload);
    });

    builder.addCase(AddSection.rejected, (state) => {});
  },
});

export const { change_msg } = sections.actions;
export default sections.reducer;
