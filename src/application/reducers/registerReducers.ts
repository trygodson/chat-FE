import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse, AuthState, LoginModel, RegisterModel } from '../../models/redux';
import { LoginService, RegisterService } from '../../services/api/authService';
import { useLocalStorage } from '../../services/useLocalStorage';
import api from '../../shared/utils/api';
import { GET_STORAGE_ITEM, SET_STORAGE_ITEM } from '../../shared/utils/storage';

const initialState: AuthState = {
  user: GET_STORAGE_ITEM('user'),
  loading: false,
  errors: null,
};

// The Action for Loggin In
export const registerAction = createAsyncThunk<AuthResponse, RegisterModel>(
  'register',
  async (data, thunkAPI) => {
    try {
      const response = await RegisterService(data);

      SET_STORAGE_ITEM('user', response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// The Reducers for Loggin In
export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setGames: (state, action: PayloadAction<AuthResponse>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(registerAction.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });
  },
});

export default registerSlice.reducer;
export const { setGames } = registerSlice.actions;
