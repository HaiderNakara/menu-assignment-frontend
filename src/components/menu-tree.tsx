"use client";
import { Button } from "@/components/ui/button";
import type { RootState } from "@/lib/providers";
import {
  addMenuItem,
  type MenuItem,
  setSelectedItem,
} from "@/lib/store/menu-slice";
import { ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useAddMenuItemMutation } from "@/lib/service/menu";

interface MenuTreeItemProps {
  item: MenuItem;
  level?: number;
  isExpanded: boolean;
}

function MenuTreeItem({
  item,
  level = 0,
  isExpanded: initialIsExpanded,
}: MenuTreeItemProps) {
  const [isExpanded, setIsExpanded] = useState(initialIsExpanded);
  const dispatch = useDispatch();
  const selectedItem = useSelector(
    (state: RootState) => state.menu.selectedItem
  );
  const [addNewItemHook, { isLoading }] = useAddMenuItemMutation();
  useEffect(() => {
    setIsExpanded(initialIsExpanded);
  }, [initialIsExpanded]);

  const handleSelect = () => {
    dispatch(setSelectedItem(item));
  };

  const createNewItem = async () => {
    const newItem = await addNewItemHook({
      name: "New Item in " + item.name,
      parentId: item.id,
      depth: item.depth + 1,
      children: [],
    }).unwrap();
    dispatch(
      addMenuItem({
        id: newItem.id ?? "",
        name: "New Item in " + item.name,
        parentId: item.id,
        depth: item.depth + 1,
        selected: true,
      })
    );
  };

  return (
    <div className="ml-4">
      <div className="flex items-center gap-2 py-1">
        {item.children && item.children.length > 0 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        )}

        <button
          onClick={handleSelect}
          className={`flex-1 text-left px-2 py-1 rounded ${
            selectedItem?.id === item.id ? "bg-blue-50" : "hover:bg-gray-50"
          }`}
        >
          {item.name}
        </button>
        <Button
          variant="ghost"
          size="icon"
          className="h-14 w-14"
          onClick={createNewItem}
          disabled={isLoading}
        >
          <Image
            src="/menu/add-icon.svg"
            alt="add"
            width={24}
            height={24}
            className="text-white bg-[#253bff] rounded-full"
          />
        </Button>
      </div>
      {isExpanded && item.children && item.children.length > 0 && (
        <div className="ml-4">
          {item.children.map((child) => (
            <MenuTreeItem
              key={child.id}
              item={child}
              level={level + 1}
              isExpanded={isExpanded}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function MenuTree() {
  const [isExpanded, setIsExpanded] = useState(false);
  const items = useSelector((state: RootState) => state.menu.items);
  const dispatch = useDispatch();

  const menuItems = items.map((item) => item);
  return (
    <div className="p-4">
      <div>
        <Label htmlFor="menu-select" className="text-sm font-medium">
          Menu
        </Label>
        <Select
          onValueChange={(value) => {
            dispatch(
              setSelectedItem(
                menuItems.find((item) => item.id === value) ?? menuItems[0]
              )
            );
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a menu" />
          </SelectTrigger>
          <SelectContent>
            {menuItems.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center mt-4 mb-4">
        <Button
          variant="outline"
          className="mr-2 rounded-full bg-[#0F172A] text-white"
          onClick={() => setIsExpanded(true)}
        >
          Expand All
        </Button>
        <Button
          variant="outline"
          className="rounded-full"
          onClick={() => setIsExpanded(false)}
        >
          Collapse All
        </Button>
      </div>
      {items.map((item) => (
        <MenuTreeItem key={item.id} item={item} isExpanded={isExpanded} />
      ))}
    </div>
  );
}
