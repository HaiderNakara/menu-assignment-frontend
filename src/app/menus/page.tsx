"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { MenuTree } from "@/components/menu-tree";
import { MenuForm } from "@/components/menu-form";
import { setMenuItems } from "@/lib/store/menu-slice";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { File, Folder } from "lucide-react";
// Sample data - replace with API call
const sampleData = [
  {
    id: "1",
    name: "System Management",
    parentId: null,
    depth: 0,
    children: [
      {
        id: "2",
        name: "Systems",
        parentId: "1",
        depth: 1,
      },
      {
        id: "3",
        name: "System Code",
        parentId: "1",
        depth: 1,
        children: [
          {
            id: "4",
            name: "Code Registration",
            parentId: "3",
            depth: 2,
          },
        ],
      },
    ],
  },
];

export default function MenusPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize with sample data
    dispatch(setMenuItems(sampleData));
  }, [dispatch]);

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
      <div className="grid grid-cols-[1fr,300px] h-[calc(100vh-5rem)]">
        <MenuTree />
        <div className="border-l">
          <MenuForm />
        </div>
      </div>
    </div>
  );
}
