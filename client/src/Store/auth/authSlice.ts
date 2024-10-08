// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  username: string;
  password: string;
  isAuthenticated: boolean;
  userRole: string; // Assuming roles could be 'admin', 'user', etc.
}

const initialState: AuthState = {
  username: '',
  password: '',
  isAuthenticated: false,
  userRole: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setAuthentication(state, action: PayloadAction<{ isAuthenticated: boolean; userRole: string }>) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userRole = action.payload.userRole;
    },
    clearAuth(state) {
      state.username = '';
      state.password = '';
      state.isAuthenticated = false;
      state.userRole = '';
    },
  },
});

export const { setUsername, setPassword, setAuthentication, clearAuth } = authSlice.actions;
export default authSlice.reducer;
