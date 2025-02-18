"use client"

import type React from "react"

import { useSelector, useDispatch } from "react-redux"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { updateMenuItem } from "@/lib/store/menu-slice"
import type { RootState } from "@/lib/providers"

export function MenuForm() {
  const dispatch = useDispatch()
  const selectedItem = useSelector((state: RootState) => state.menu.selectedItem)

  if (!selectedItem) {
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const name = formData.get("name") as string

    dispatch(
      updateMenuItem({
        ...selectedItem,
        name,
      }),
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <Label>Menu ID</Label>
        <Input value={selectedItem.id} disabled />
      </div>
      <div>
        <Label>Depth</Label>
        <Input value={selectedItem.depth} disabled />
      </div>
      <div>
        <Label>Parent Data</Label>
        <Input value={selectedItem.parentId || "Root"} disabled />
      </div>
      <div>
        <Label>Name</Label>
        <Input name="name" defaultValue={selectedItem.name} />
      </div>
      <Button type="submit" className="w-full">
        Save
      </Button>
    </form>
  )
}

