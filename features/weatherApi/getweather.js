import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  value: 0,
  country:'',
  city:'',
  myname:'',
  
  day:'',
  month:'',
  year:'',
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


        SetDateTime:(state, action)=>{
          var date = new Date();
          var month = date.getMonth();
          var year = date.getFullYear();

          var setmonth = '';

          switch (month) {
            case 0:
              setmonth="January";
              break;
            case 1:
              setmonth="February";
              break;
            case 2:
              setmonth="March";
              break;
            case 3:
              setmonth="April";
              break;
            case 4:
              setmonth="May";
              break;
            case 5:
              setmonth="June";
              break;
            case 6:
              setmonth="July";
              break;
            case 7:
              setmonth="August";
              break;
            case 8:
              setmonth="September";
              break;
            case 9:
              setmonth="October";
              break;
            case 10:
              setmonth="November";
              break;
            case 11:
              setmonth="December";
              break;
          }

          state.myname=action.payload
          state.day=date.getDate(),
          state.month=setmonth,
          state.year=year
          
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


export const { changeMyname, SetDateTime } = getweatherslice.actions;
export default getweatherslice.reducer