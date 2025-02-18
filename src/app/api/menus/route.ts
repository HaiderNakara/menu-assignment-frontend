import { NextResponse } from "next/server"
import type { MenuItem } from "@/lib/store/menu-slice"

// In a real application, this would be a database
let menus: MenuItem[] = []

export async function GET() {
  return NextResponse.json(menus)
}

export async function POST(request: Request) {
  const menu = await request.json()
  menus.push(menu)
  return NextResponse.json(menu)
}

export async function PUT(request: Request) {
  const menu = await request.json()
  menus = menus.map((item) => (item.id === menu.id ? menu : item))
  return NextResponse.json(menu)
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  menus = menus.filter((item) => item.id !== id)
  return NextResponse.json({ id })
}

