import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Async thunks
export const createBooking = createAsyncThunk(
  'booking/createBooking',
  async (bookingData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.post(`${API_URL}/bookings`, bookingData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserBookings = createAsyncThunk(
  'booking/fetchUserBookings',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(`${API_URL}/bookings/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const cancelBooking = createAsyncThunk(
  'booking/cancelBooking',
  async (bookingId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.post(
        `${API_URL}/bookings/${bookingId}/cancel`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addReview = createAsyncThunk(
  'booking/addReview',
  async ({ bookingId, reviewData }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.post(
        `${API_URL}/bookings/${bookingId}/review`,
        reviewData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  userBookings: [],
  currentBooking: null,
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Booking
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBooking = action.payload;
        state.userBookings.push(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create booking';
      })
      // Fetch User Bookings
      .addCase(fetchUserBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.userBookings = action.payload;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch bookings';
      })
      // Cancel Booking
      .addCase(cancelBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.userBookings.findIndex(
          (b) => b._id === action.payload._id
        );
        if (index !== -1) {
          state.userBookings[index] = action.payload;
        }
        if (state.currentBooking?._id === action.payload._id) {
          state.currentBooking = action.payload;
        }
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to cancel booking';
      })
      // Add Review
      .addCase(addReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.userBookings.findIndex(
          (b) => b._id === action.payload._id
        );
        if (index !== -1) {
          state.userBookings[index] = action.payload;
        }
        if (state.currentBooking?._id === action.payload._id) {
          state.currentBooking = action.payload;
        }
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to add review';
      });
  },
});

export const { clearError, clearCurrentBooking } = bookingSlice.actions;
export default bookingSlice.reducer; 