"use client";

import type React from "react";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./store/menu-slice";
import { menuApi } from "./service/menu";

const store = configureStore({
  reducer: {
    menu: menuReducer,
    [menuApi.reducerPath]: menuApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(menuApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
