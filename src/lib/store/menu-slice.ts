import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface MenuItem {
  id: string
  name: string
  parentId: string | null
  depth: number
  children?: MenuItem[]
}

interface MenuState {
  items: MenuItem[]
  selectedItem: MenuItem | null
  loading: boolean
  error: string | null
}

const initialState: MenuState = {
  items: [],
  selectedItem: null,
  loading: false,
  error: null,
}

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenuItems: (state, action: PayloadAction<MenuItem[]>) => {
      state.items = action.payload
    },
    setSelectedItem: (state, action: PayloadAction<MenuItem | null>) => {
      state.selectedItem = action.payload
    },
    addMenuItem: (state, action: PayloadAction<MenuItem>) => {
      state.items.push(action.payload)
    },
    updateMenuItem: (state, action: PayloadAction<MenuItem>) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    deleteMenuItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { setMenuItems, setSelectedItem, addMenuItem, updateMenuItem, deleteMenuItem, setLoading, setError } =
  menuSlice.actions

export default menuSlice.reducer

