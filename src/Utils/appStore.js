import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const app = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default app;
