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


const updateUrl= "http://127.0.0.1:8000/section_update"
export const UPDATEsection = createAsyncThunk(
  "groups/UpdateSection",
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



export const DeleteSection = createAsyncThunk(
  "sections/Delete",
  async (data) => {
    try {
      const delurl="http://127.0.0.1:8000/Delete_section/"+data.Did;
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
  sectionstbl:[],
  detailsection:[]
};

export const sections = createSlice({
  name: "sections",
  initialState,

  reducers: {
    change_msg: (state, action) => {
      state.msg = action.payload;
    },

    getsections:(state, action)=>{
      state.sectionstbl=action.payload.items;
    },
    getsectiondetail:(state, action)=>{
      state.detailsection= action.payload;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(AddSection.pending, (state) => {});

    builder.addCase(AddSection.fulfilled, (state, action) => {
      state.msg = action.payload.Message;
    });

    builder.addCase(DeleteSection.fulfilled, (state, action) => {
      console.log(action.payload)
    });

    builder.addCase(UPDATEsection.fulfilled, (state, action) => {
      state.msg = action.payload.Message;
      console.log(action.payload);
    });
  },






});

export const { change_msg, getsections, getsectiondetail } = sections.actions;
export default sections.reducer;
