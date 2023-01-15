import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { getToken } from 'next-auth/react'


const Urls = "http://127.0.0.1:8000/users/me";



export const getUser_infos = createAsyncThunk(
  'userinfos/get_infos',
  
  async () => {

    const tkn=localStorage.getItem("sgn");
    const response =await axios.get(Urls, { headers: { Authorization: `Bearer ${tkn}` } }); 
    //console.log(response.data);
    return response.data;
  }

)


const initialState = {
  value: 0,
  Userinfos:null,
  username:'',
  first_name:'',
  second_name:'',
  role:''
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
  
      }
  

})


export const {add_infos} = userinfos.actions;
export default userinfos.reducer