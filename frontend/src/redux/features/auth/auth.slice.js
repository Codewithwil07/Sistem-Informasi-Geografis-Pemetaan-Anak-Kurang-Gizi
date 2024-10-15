import { createSlice } from '@reduxjs/toolkit';
import { checkAuthStatus, login } from './authApi';

const initialState = {
  user: null,
  status: 'idle',
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      (state.user = null),
        (state.status = 'idle'),
        (state.error = null),
        (state.isAuthenticated = false);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        (state.status = 'successed'),
          (state.user = action.payload),
          (state.isAuthenticated = true);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })
      .addCase(checkAuthStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        (state.status = 'successed'),
          (state.user = action.payload),
          (state.isAuthenticated = true);
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
