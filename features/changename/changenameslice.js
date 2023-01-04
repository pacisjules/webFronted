import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  value: 0,
  myname:'Ntwali',
  items:[],
  Myarray:[
    {
      id:1,
      names:'Gaga',
      age:12
    },
    {
      id:2,
      names:'Ganza',
      age:22
    },
    {
      id:3,
      names:'Gabiro',
      age:7
    },
    {
      id:4,
      names:'Gaju',
      age:14
    },

  ],

  isLoading:'none'
}


const Urls = "https://course-api.com/react-useReducer-cart-project";
const urls_currency="http://127.0.0.1:8000/addcurrency";

export const getCartItems = createAsyncThunk(
  'changenameslice/getCartItems',
  
  async () => {
    const response =await axios.get(Urls); 
    return response.data
  }
)


export const AddCurrency = createAsyncThunk(
  "changenameslice/AddCurrency",
  async (data) => {
    try {
      const response = await axios.post(urls_currency, data);
      return response.data;
    } catch (err) {
      console.error(err)
    }
  }
);




export const changenameslice = createSlice({
    name: 'changenameslice',
    initialState,

    reducers: {
      increment: (state) => {
          state.value += 1
        },

        decrement: (state) => {
          state.value -= 1
        },
        changeMyname:(state, action)=>{
          state.myname=action.payload
        },

        changeAbana:(state, action)=>{
          state.Myarray.push(action.payload)
        },
        setLoad:(state)=>{
          if(state.isLoading == 'none'){
            state.isLoading='block'
          }else if(state.isLoading == 'block'){
            state.isLoading='none'
          }
        }
  },
    
    
    extraReducers: (builder) => {
      builder.addCase(getCartItems.pending, (state) => {
        state.isLoading='block'
      });

      builder.addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading='none';
        state.items=action.payload;
      });

     builder.addCase(getCartItems.rejected, (state) => {
      state.isLoading='none'
    });

    
    builder.addCase(AddCurrency.fulfilled, (state, action) => {
      state.isLoading='none';
      console.log(action.payload);
    });

    }

})


export const { increment, decrement, changeMyname,changeAbana,setLoad } = changenameslice.actions;
export default changenameslice.reducer