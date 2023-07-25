import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOrders } from './../dataService';

const initialState = {
  loading: false,
  orders: [],
  error: undefined,

}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
  }, 
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state, action) => {
      state.error = undefined
      state.loading = true
    })
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.loading = false
      state.orders = action.payload
    })
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  },
})

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async () => {
    const response = await getOrders()
    return response
  }
)

export const { ordersLoading, ordersReceived } = ordersSlice.actions;
export default ordersSlice.reducer