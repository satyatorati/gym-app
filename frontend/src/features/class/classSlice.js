import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Async thunks
export const fetchFeaturedClasses = createAsyncThunk(
  'class/fetchFeaturedClasses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/classes/featured');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllClasses = createAsyncThunk(
  'class/fetchAllClasses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/classes');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchClassById = createAsyncThunk(
  'class/fetchClassById',
  async (classId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/classes/${classId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createClass = createAsyncThunk(
  'class/createClass',
  async (classData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await api.post('/classes', classData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateClass = createAsyncThunk(
  'class/updateClass',
  async ({ classId, classData }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await api.put(`/classes/${classId}`, classData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteClass = createAsyncThunk(
  'class/deleteClass',
  async (classId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      await api.delete(`/classes/${classId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return classId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  featuredClasses: [],
  allClasses: [],
  currentClass: null,
  loading: false,
  error: null,
};

const classSlice = createSlice({
  name: 'class',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentClass: (state) => {
      state.currentClass = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Featured Classes
      .addCase(fetchFeaturedClasses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredClasses = action.payload;
      })
      .addCase(fetchFeaturedClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch featured classes';
      })
      // Fetch All Classes
      .addCase(fetchAllClasses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.allClasses = action.payload;
      })
      .addCase(fetchAllClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch classes';
      })
      // Fetch Class by ID
      .addCase(fetchClassById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClassById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentClass = action.payload;
      })
      .addCase(fetchClassById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch class details';
      })
      // Create Class
      .addCase(createClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClass.fulfilled, (state, action) => {
        state.loading = false;
        state.allClasses.push(action.payload);
        state.featuredClasses.push(action.payload);
      })
      .addCase(createClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create class';
      })
      // Update Class
      .addCase(updateClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateClass.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.allClasses.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) {
          state.allClasses[index] = action.payload;
        }
        if (state.currentClass?._id === action.payload._id) {
          state.currentClass = action.payload;
        }
      })
      .addCase(updateClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update class';
      })
      // Delete Class
      .addCase(deleteClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteClass.fulfilled, (state, action) => {
        state.loading = false;
        state.allClasses = state.allClasses.filter((c) => c._id !== action.payload);
        state.featuredClasses = state.featuredClasses.filter((c) => c._id !== action.payload);
        if (state.currentClass?._id === action.payload) {
          state.currentClass = null;
        }
      })
      .addCase(deleteClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete class';
      });
  },
});

export const { clearError, clearCurrentClass } = classSlice.actions;
export default classSlice.reducer; 