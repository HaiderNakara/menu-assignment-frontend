import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface MenuItem {
  id: string;
  name: string;
  parentId: string | null;
  depth: number;
  children?: MenuItem[];
  selected?: boolean;
}

interface MenuState {
  items: MenuItem[];
  selectedItem: MenuItem | null;
  loading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  items: [],
  selectedItem: null,
  loading: false,
  error: null,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenuItems: (state, action: PayloadAction<MenuItem[]>) => {
      state.items = action.payload;
    },
    setSelectedItem: (state, action: PayloadAction<MenuItem | null>) => {
      state.selectedItem = action.payload;
    },
    addMenuItem: (state, action: PayloadAction<MenuItem>) => {
      const findParentItem = (
        items: MenuItem[],
        parentId: string
      ): MenuItem | undefined => {
        for (const item of items) {
          if (item.id === parentId) return item;
          if (item.children) {
            const found = findParentItem(item.children, parentId);
            if (found) return found;
          }
        }
        return undefined;
      };

      if (action.payload.parentId) {
        // Find parent item recursively through the entire tree
        const parent = findParentItem(state.items, action.payload.parentId);
        if (parent) {
          if (!parent.children) {
            parent.children = [];
          }
          parent.children.push(action.payload);
        }
      } else {
        // Add to root level if no parent
        state.items.push(action.payload);
      }

      if (action.payload.selected) {
        state.selectedItem = action.payload;
      }
    },
    updateMenuItem: (state, action: PayloadAction<MenuItem>) => {
      const findItem = (
        items: MenuItem[],
        id: string
      ): MenuItem | undefined => {
        for (const item of items) {
          if (item.id === id) return item;
          if (item.children) {
            const found = findItem(item.children, id);
            if (found) return found;
          }
        }
        return undefined;
      };

      const value = findItem(state.items, action.payload.id);
      if (value) {
        value.name = action.payload.name;
        value.depth = action.payload.depth;
        value.parentId = action.payload.parentId;
      }
    },
    deleteMenuItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setMenuItems,
  setSelectedItem,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  setLoading,
  setError,
} = menuSlice.actions;

export default menuSlice.reducer;
