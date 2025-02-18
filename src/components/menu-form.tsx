"use client";

import type React from "react";

import { useSelector, useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { addMenuItem, updateMenuItem } from "@/lib/store/menu-slice";
import type { RootState } from "@/lib/providers";
import { useEffect, useState } from "react";
import {
  useAddMenuItemMutation,
  useUpdateMenuItemMutation,
} from "@/lib/service/menu";
// import { v4 as uuidv4 } from "uuid";
export function MenuForm() {
  const dispatch = useDispatch();
  const selectedItem = useSelector(
    (state: RootState) => state.menu.selectedItem
  );
  const [formData, setFormData] = useState({
    name: "",
    depth: 0,
    parentId: "",
  });
  useEffect(() => {
    setFormData({
      name: selectedItem?.name || "",
      depth: selectedItem?.depth || 0,
      parentId: selectedItem?.parentId || "",
    });
  }, [selectedItem]);

  const [updateMenuItemHook] = useUpdateMenuItemMutation();
  const [addMenuItemHook] = useAddMenuItemMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItem) {
      await updateMenuItemHook({
        id: selectedItem.id,
        name: formData.name,
      });
      dispatch(
        updateMenuItem({
          id: selectedItem.id,
          name: formData.name,
          depth: selectedItem.depth,
          parentId: selectedItem.parentId,
        })
      );
    } else {
      const newItem = await addMenuItemHook({
        name: formData.name,
        depth: formData.depth,
        parentId: formData.parentId,
        children: [],
      }).unwrap();
      dispatch(
        addMenuItem({
          id: newItem.id ?? "",
          name: formData.name,
          depth: formData.depth,
          parentId: formData.parentId,
        })
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        {selectedItem && (
          <>
            <Label>Menu ID</Label>
            <Input value={selectedItem.id} disabled />
          </>
        )}
      </div>
      <div>
        <Label>Depth</Label>
        <Input value={formData.depth} disabled />
      </div>
      <div>
        <Label>Parent Data</Label>
        <Input value={formData.parentId || "Root"} disabled />
      </div>
      <div>
        <Label>Name</Label>
        <Input name="name" value={formData.name} onChange={handleChange} />
      </div>
      <Button type="submit" className="w-full">
        Save
      </Button>
    </form>
  );
}
