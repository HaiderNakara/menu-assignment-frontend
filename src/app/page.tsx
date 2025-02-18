"use client";

import { MenuForm } from "@/components/menu-form";
import { MenuTree } from "@/components/menu-tree";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useGetMenuItemsQuery } from "@/lib/service/menu";
import { setMenuItems } from "@/lib/store/menu-slice";
import { Folder } from "lucide-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";
import Title from "./menus/components/Title";
export default function MenusPage() {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetMenuItemsQuery();

  useEffect(() => {
    if (data) {
      dispatch(setMenuItems(data as any));
    }
  }, [dispatch, data]);

  if (isLoading) {
    return (
      <div className="h-full">
        <div className="border-b p-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <Folder className="h-4 w-4" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/menus">Menus</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="grid m-4">
          <div>
            <Title />
            <div className="grid grid-cols-2">
              <div>
                <Skeleton className="h-[500px] m-4" />
              </div>
              <div className="border-l">
                <Skeleton className="h-[500px] m-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-medium text-red-600">
          An error occurred while loading the menu data. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="border-b p-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                {/* file icon */}
                <Folder className="h-4 w-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/menus">Menus</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="grid  m-4 ">
        <div>
          <Title />
          <div className="grid grid-cols-2">
            <MenuTree />
            <div className="border-l">
              <MenuForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
