import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  fetching: false,
  errors: {},
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    //to handle the input login
    handleInput: (state, action) => {
      const { payload } = action;
      state[payload.name] = payload.value;
    },
    //login actions when press login button
    handleLogin: (state, action) => {
      const { payload } = action;

      switch (payload.type) {
        case "START":
          state.fetching = payload.payload;
          break;
        case "DONE":
          state.fetching = payload.payload;
          state.errors = payload.errors;
          break;
        case "FAIL":
          console.log(payload);
          state.fetching = payload.payload;
          //in error array from backend find the email and password and then put in that object to the front redux
          state.errors = {
            email: payload.errors.email ? payload.errors.email : null,
            password: payload.errors.password ? payload.errors.password : null,
          };
          break;
        default:
          return;
      }
    },
  },
});

export const { handleInput, handleLogin } = loginSlice.actions;

export default loginSlice.reducer;
