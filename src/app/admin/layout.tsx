"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Plus, LogOut, ChevronLeft, Menu } from "lucide-react";

const navigation = [
  { name: "Projects", href: "/admin", icon: LayoutDashboard },
  { name: "Add Project", href: "/admin/projects/new", icon: Plus },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setChecking(false);
      return;
    }

    let isMounted = true;
    const verifyAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (isMounted) {
          if (data.authenticated) {
            setAuthed(true);
          } else {
            setAuthed(false);
            router.push("/admin/login");
          }
        }
      } catch {
        if (isMounted) {
          setAuthed(false);
          router.push("/admin/login");
        }
      } finally {
        if (isMounted) {
          setChecking(false);
        }
      }
    };

    verifyAuth();

    return () => {
      isMounted = false;
    };
  }, [isLoginPage, router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  // Login page — render with no chrome, no auth gate
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Auth check in progress
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  // Not authenticated — redirect effect will fire, render nothing
  if (!authed) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col lg:flex-row">
      {/* Mobile top bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800">
        <Link href="/admin" className="text-lg font-bold text-white">
          Admin
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-gray-400 hover:text-white"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-800 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-gray-800">
          <Link href="/admin" className="text-xl font-bold text-white">
            Admin
          </Link>
          <button
            className="lg:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === item.href
                  ? "bg-blue-600/20 text-blue-400"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-red-400 hover:bg-red-500/10"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </Button>
        </div>
      </aside>

      <main className="flex-1 lg:ml-64 min-h-screen">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
