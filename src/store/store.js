import { configureStore  } from "@reduxjs/toolkit";
import totalRevenueReducer from './totalRevenueSlice'
import ordersReducer from './ordersSlice'

export const store = configureStore({
  reducer: {
    totalRevenue: totalRevenueReducer,
    orders: ordersReducer
  }
})