import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Menu Management System",
  description: "A hierarchical menu management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <SidebarProvider>
            <div className="flex h-screen bg-background">
              <AppSidebar />
              <main className="flex-1 overflow-auto transition-all duration-300">
                {children}
              </main>
            </div>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
