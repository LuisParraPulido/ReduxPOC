import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0
}

export const totalRevenueSlice = createSlice({
  name: 'totalRevenue',
  initialState,
  reducers: {
    increment: (state, action) => {
      state.value += action.payload
    }
  }
})

export const { increment } = totalRevenueSlice.actions;

export default totalRevenueSlice.reducer