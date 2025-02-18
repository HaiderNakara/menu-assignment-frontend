"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ChevronRight, ChevronDown, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type MenuItem, setSelectedItem, deleteMenuItem } from "@/lib/store/menu-slice"
import type { RootState } from "@/lib/providers"

interface MenuTreeItemProps {
  item: MenuItem
  level?: number
}

function MenuTreeItem({ item, level = 0 }: MenuTreeItemProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const dispatch = useDispatch()
  const selectedItem = useSelector((state: RootState) => state.menu.selectedItem)

  const handleSelect = () => {
    dispatch(setSelectedItem(item))
  }

  const handleDelete = () => {
    dispatch(deleteMenuItem(item.id))
  }

  return (
    <div className="ml-4">
      <div className="flex items-center gap-2 py-1">
        {item.children?.length ? (
          <button onClick={() => setIsExpanded(!isExpanded)} className="p-1 hover:bg-gray-100 rounded">
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        ) : (
          <span className="w-6" />
        )}
        <button
          onClick={handleSelect}
          className={`flex-1 text-left px-2 py-1 rounded ${
            selectedItem?.id === item.id ? "bg-blue-50" : "hover:bg-gray-50"
          }`}
        >
          {item.name}
        </button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleDelete}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      {isExpanded && item.children?.length && (
        <div className="ml-4">
          {item.children.map((child) => (
            <MenuTreeItem key={child.id} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export function MenuTree() {
  const items = useSelector((state: RootState) => state.menu.items)

  return (
    <div className="p-4">
      {items.map((item) => (
        <MenuTreeItem key={item.id} item={item} />
      ))}
    </div>
  )
}

