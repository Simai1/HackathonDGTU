import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    id: null,
    login: '',
    name: '',
    role: ''
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
});

export const { actions, reducer } = userSlice;
