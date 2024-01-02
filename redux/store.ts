import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import { authAPI } from "./api/authAPI";
import { userAPI } from "./api/userAPI";
import { bookingAPI } from "./api/bookingAPI";
import { roomAPI } from "./api/roomAPI";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [bookingAPI.reducerPath]: bookingAPI.reducer,
    [roomAPI.reducerPath]: roomAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authAPI.middleware,
      userAPI.middleware,
      bookingAPI.middleware,
      roomAPI.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
