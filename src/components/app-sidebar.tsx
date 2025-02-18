"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Code2,
  FileJson,
  LayoutGrid,
  Menu,
  Settings2,
  Trophy,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { name: "Systems", href: "/systems", icon: LayoutGrid },
  { name: "System Code", href: "/system-code", icon: Code2 },
  { name: "Properties", href: "/properties", icon: Settings2 },
  { name: "Menus", href: "/menus", icon: Menu },
  { name: "API List", href: "/api-list", icon: FileJson },
  { name: "Users & Group", href: "/users", icon: Users },
  { name: "Competition", href: "/competition", icon: Trophy },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col bg-[#0F172A] transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[72px]" : "w-72"
      )}
    >
      <div className="flex h-16 items-center justify-between px-6 border-b border-gray-800">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 transition-opacity duration-200",
            isCollapsed && "opacity-0"
          )}
        >
          {/* 70*21 */}
          <Image
            src="/menu/title.svg"
            alt="Title"
            width={70}
            height={21}
            className="w-20 h-10"
          />
        </Link>
        <Button
          variant="default"
          size="icon"
          className="h-8 w-8 text-gray-400 hover:text-gray-300"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {!isCollapsed && (
            <Image
              src="/menu/collapse.png"
              alt="Expand"
              width={24}
              height={24}
            />
          )}
        </Button>
      </div>
      <nav className="flex-1 space-y-0.5 px-3 py-3 overflow-hidden">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center rounded-lg transition-colors",
                isCollapsed ? "px-2 py-2.5" : "px-3 py-2.5",
                isActive
                  ? "bg-[#9ff443] text-[#0F172A]"
                  : "text-[#98a2b3] hover:bg-gray-800 hover:text-white"
              )}
              title={isCollapsed ? item.name : undefined}
            >
              <Icon
                className={cn(
                  "h-5 w-5 flex-shrink-0",
                  !isCollapsed && "mr-3",
                  isActive ? "text-[#0F172A]" : "text-[#667085]"
                )}
              />
              <span
                className={cn(
                  "text-sm font-medium whitespace-nowrap transition-opacity duration-200",
                  isCollapsed && "opacity-0 w-0"
                )}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
