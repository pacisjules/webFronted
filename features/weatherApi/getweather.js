import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  value: 0,
  country:'',
  city:'',
  myname:''
}


const Urls = "https://api.db-ip.com/v2/free/self";
/* const urls_currency="http://127.0.0.1:8000/addcurrency"; */

export const getCountry = createAsyncThunk(
  'getweatherslice/getCountry',
  
  async () => {
    const response =await axios.get(Urls); 
    return response.data
  }
)


/* export const AddCurrency = createAsyncThunk(
  "getweatherslice/AddCurrency",
  async (data) => {
    try {
      const response = await axios.post(urls_currency, data);
      return response.data;
    } catch (err) {
      console.error(err)
    }
  }
); */


export const getweatherslice = createSlice({
    name: 'getweatherslice',
    initialState,

    reducers: {
      increment: (state) => {
          state.value += 1
        },


        changeMyname:(state, action)=>{
          state.myname=action.payload
        },
  },
    
    
    extraReducers: (builder) => {
      builder.addCase(getCountry.pending, (state) => {

      });

      builder.addCase(getCountry.fulfilled, (state, action) => {
        state.country=action.payload.countryName;
        state.city=action.payload.stateProv;
        localStorage.setItem('city', action.payload.stateProv)
      });

     builder.addCase(getCountry.rejected, (state) => {

    });

    
    /* builder.addCase(AddCurrency.fulfilled, (state, action) => {
      state.isLoading='none';
      console.log(action.payload);
    }); */

    }

})


export const { changeMyname } = getweatherslice.actions;
export default getweatherslice.reducer