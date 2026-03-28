"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="w-72 bg-white border-r border-slate-200 p-6 hidden lg:block">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-700">Admin Dashboard</h2>
            <p className="text-sm text-slate-500">Manage products from here</p>
          </div>
          <nav className="space-y-2">
            <Link href="/dashboard" className="block rounded-lg px-3 py-2 font-medium text-slate-800 bg-slate-100">Products</Link>
            <Link href="/products" className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100">Shop View</Link>
            <Link href="/" className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100">Home</Link>
          </nav>
        </aside>
        <main className="flex-1 p-4 lg:p-8">
          <header className="sticky top-0 z-10 mb-6 flex items-center justify-between bg-slate-100/80 p-4 rounded-lg shadow-sm backdrop-blur">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Products</h1>
              <p className="text-sm text-slate-500">Create, edit and remove products in your store</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-500">Admin</span>
              <div className="h-8 w-8 rounded-full bg-blue-500 text-white grid place-items-center">A</div>
            </div>
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}
