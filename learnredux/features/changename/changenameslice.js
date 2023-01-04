import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

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


export const getCartItems = createAsyncThunk(
  'changenameslice/getCartItems',
  
  async (thunkAPI) => {
    const response = await fetch(Urls)
    //console.log(response.json())
    return response.json()
  }
)




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
    }

})


export const { increment, decrement, changeMyname,changeAbana,setLoad } = changenameslice.actions;
export default changenameslice.reducer