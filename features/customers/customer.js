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

const baseUrl = "http://127.0.0.1:8000/addCustomer";
export const AddCustomer = createAsyncThunk(
  "groups/AddDistributor",
  async (data) => {
    try {
      const response = await axios.post(baseUrl, data);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);
const updateUrl = "http://127.0.0.1:8000/Customer_update";

export const UPDATECustomer = createAsyncThunk(
  "groups/UpdateDistributor",
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

export const DeleteCustomer = createAsyncThunk(
  "groups/Deletecategory",
  async (data) => {
    try {
      const delurl="http://127.0.0.1:8000/Delete_Customer/"+data.Did;
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
  storetbl:[],
  statu: [],
  groupnames: "",
};

export const groups = createSlice({
  name: "groups",
  initialState,

  reducers: {
    change_msg: (state, action) => {
      state.msg = action.payload;
    },

    getcustomer:(state, action)=>{
      state.categorytbl=action.payload.items;
    },
    getdistributordetail:(state,action)=>{
      state.storedtl=action.payload;
    },
    
    getdetailDis:(state,action)=>{
      state.statu=action.payload;
    },
    // getgroupname:(state,action)=>{
    //   state.groupnames=action.payload;
    // },



   

  },

  extraReducers: (builder) => {
    builder.addCase(AddCustomer.pending, (state) => {});

    builder.addCase(AddCustomer.fulfilled, (state, action) => {
      state.msg = action.payload.Message;
    });

    builder.addCase(DeleteCustomer.fulfilled, (state, action) => {
      console.log(action.payload)
    });

    builder.addCase(UPDATECustomer.fulfilled, (state, action) => {
      console.log(action.payload);
    });

  },
});

export const { change_msg, getcustomer, getdistributordetail, getdetailDis} = groups.actions;
export default groups.reducer;
