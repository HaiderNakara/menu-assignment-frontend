import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export type MenuItem = {
  id?: string;
  name: string;
  parentId?: string | null;
  depth?: number;
  children?: MenuItem[];
};

export const menuApi = createApi({
  tagTypes: ["MenuItems"],
  reducerPath: "menuApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  endpoints: (builder) => ({
    getMenuItems: builder.query<MenuItem[], void>({
      query: () => `menu-items/tree`,
      providesTags: ["MenuItems"],
    }),
    addMenuItem: builder.mutation<MenuItem, MenuItem>({
      query: (menuItem) => ({
        url: `menu-items`,
        method: "POST",
        body: menuItem,
      }),
      invalidatesTags: ["MenuItems"],
    }),
    updateMenuItem: builder.mutation<MenuItem, MenuItem>({
      query: (menuItem) => ({
        url: `menu-items/${menuItem.id}`,
        method: "PATCH",
        body: menuItem,
      }),
      invalidatesTags: ["MenuItems"],
    }),
    deleteMenuItem: builder.mutation<MenuItem, MenuItem>({
      query: (menuItem) => ({
        url: `menu-items`,
        method: "DELETE",
        body: menuItem,
      }),
      invalidatesTags: ["MenuItems"],
    }),
  }),
});

export const {
  useGetMenuItemsQuery,
  useAddMenuItemMutation,
  useUpdateMenuItemMutation,
  useDeleteMenuItemMutation,
} = menuApi;
