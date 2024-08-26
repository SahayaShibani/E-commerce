import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 0,
  }
  
  export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setUserDetails :(state,action)=>{
         state.user = action.payload
         console.log("Payload",action.payload);
      }
    },
  })

  export const { setUserDetails } = userSlice.actions;

  export default userSlice.reducers
