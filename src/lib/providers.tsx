"use client"

import type React from "react"

import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import menuReducer from "./store/menu-slice"

const store = configureStore({
  reducer: {
    menu: menuReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}

