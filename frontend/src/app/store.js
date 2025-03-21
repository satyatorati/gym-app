import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import classReducer from '../features/class/classSlice';
import bookingReducer from '../features/booking/bookingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    class: classReducer,
    booking: bookingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
}); 