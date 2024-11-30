import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Backend_api } from '../constant';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${Backend_api}/login`, credentials);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed.');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${Backend_api}/register`, userData);
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed.');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.successMessage = null;
      state.error = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    resetAuthState: (state) => {
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {

    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
