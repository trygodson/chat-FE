import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse, AuthState, LoginModel } from '../../models/redux';
import { LoginService } from '../../services/api/authService';
import { useLocalStorage } from '../../services/useLocalStorage';
import api from '../../shared/utils/api';
import { GET_STORAGE_ITEM, SET_STORAGE_ITEM } from '../../shared/utils/storage';

const initialState: AuthState = {
  user: GET_STORAGE_ITEM('user'),
  loading: false,
  errors: null,
};

// The Action for Loggin In
export const loginAction = createAsyncThunk<AuthResponse, LoginModel>(
  'login',
  async (data, thunkAPI) => {
    try {
      const response = await LoginService(data);

      SET_STORAGE_ITEM('user', response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// The Reducers for Loggin In
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setGames: (state, action: PayloadAction<AuthResponse>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });
  },
});

export default loginSlice.reducer;
export const { setGames } = loginSlice.actions;
