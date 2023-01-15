import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { webprotocol } from '../../utils/webprotocol'
import { useRouter } from 'next/router';

const initialState = {
    isLogged:false,
    userData:[],
    username:'',
    access:'',
    loading:false,
  }

const LoginUrl = "http://127.0.0.1:8000/auth/login";
console.log(LoginUrl);


export const LoginFuc = createAsyncThunk(
   "loginSlice/Login",
  
   async (data) => {

    var bodyFormData = new FormData();
    bodyFormData.append('username', data.username);
    bodyFormData.append('password', data.password);

    var logindata = bodyFormData;
    
    try {
      const response = await axios({
        method: "post",
        url: LoginUrl,
        data: logindata,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (res) {
          return {
                msg:"System find the user",
                statuscode:200,
                infos: res.data
          }
         
        })
        .catch(function (error) {
          console.log("DATA IS INCORENT "+ error);
          return {
            msg:"System can not find the user",
            statuscode:404
          }
        });

      return response;
    
    } catch (err) {
      
    }

  }
); 


export const makeLoginslice = createSlice({
    name: 'makeLoginslice',
    initialState,

    reducers: {

        setlogout: (state) => {
            state.isLogged = false,
            state.access=''
          },

          rememberme:()=>{
            state.isLogged = true
          }
        
    },


    extraReducers: (builder) => {
        
        builder.addCase(LoginFuc.pending, (state) => {
          state.loading = true;
        });


        builder.addCase(LoginFuc.fulfilled, (state, action) => {

          state.userData = action.payload
          state.loading = false;
          state.access = action.payload.infos.access_token;
          console.log(action.payload.infos.access_token);
        });


        builder.addCase(LoginFuc.rejected, (state) => {
          state.loading = false;
        });

    }


})




export const { setlogout, rememberme } = makeLoginslice.actions;
export default makeLoginslice.reducer




