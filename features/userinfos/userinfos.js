import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { getToken } from 'next-auth/react'


const Urls = "http://127.0.0.1:8000/users/me";
const addingUrls ="http://127.0.0.1:8000/auth/register";


export const getUser_infos = createAsyncThunk(
  'userinfos/get_infos',
  async () => {

    const tkn=localStorage.getItem("sgn");
    const response =await axios.get(Urls, { headers: { Authorization: `Bearer ${tkn}` } }); 
    //console.log(response.data);
    return response.data;
  }
)


export const AddUser = createAsyncThunk(
  "user/Adduser",
  async (data) => {
    try {
      const response = await axios.post(addingUrls, data);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);



export const DeleteUser = createAsyncThunk(
  "user/Delete",
  async (data) => {
    try {
      const delurl="http://127.0.0.1:8000/users/"+data.Did;
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
  Userinfos:null,
  username:'',
  first_name:'',
  second_name:'',
  role:'',
  msg:''
}


export const userinfos = createSlice({
    name: 'userinfos',
    initialState,

    reducers: {
        add_infos: (state, action) => {


            state.information=action.payload;
            //console.log(action.payload.company)

            state.username=action.payload.username,
            state.first_name=action.payload.first_name,
            state.second_name=action.payload.last_name,
            state.role=action.payload.role
          },
    },


    extraReducers: (builder) => {

        builder.addCase(getUser_infos.pending, (state) => {
  
        });
  
        builder.addCase(getUser_infos.fulfilled, (state, action) => {
          state.Userinfos=action.payload;
        });
  
       builder.addCase(getUser_infos.rejected, (state) => {
  
      });


      builder.addCase(AddUser.fulfilled, (state, action) => {
        state.msg = action.payload.Message;
        console.log(action.payload);
      });

      builder.addCase(DeleteUser.fulfilled, (state, action) => {
        console.log(action.payload)
      });
  
      }
  

})


export const {add_infos} = userinfos.actions;
export default userinfos.reducer