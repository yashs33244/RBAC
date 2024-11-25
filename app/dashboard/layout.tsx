"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { LayoutDashboard, Users, Shield, Settings, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserMenu } from "@/components/auth/AuthForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavItem = ({ href, icon, label, active }: NavItemProps) => (
  <Button
    asChild
    variant={active ? "default" : "ghost"}
    className="w-full justify-start"
  >
    <Link href={href} className="flex items-center space-x-3">
      {icon}
      <span>{label}</span>
    </Link>
  </Button>
);

const LoadingSkeleton = () => (
  <div className="p-8 space-y-4">
    <Skeleton className="h-8 w-[250px]" />
    <Skeleton className="h-[125px] w-full" />
    <Skeleton className="h-[125px] w-full" />
  </div>
);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (status === "loading") {
    return <LoadingSkeleton />;
  }

  if (status === "unauthenticated") {
    return (
      <Card className="max-w-md mx-auto mt-20">
        <CardHeader>
          <CardTitle>Access Denied</CardTitle>
          <CardDescription>
            Please sign in to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="/auth/signin">Sign In</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const isActive = (path: string) => pathname === path;

  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Overview";
    const segments = pathname.split("/");
    const lastSegment = segments[segments.length - 1];
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  };

  const Sidebar = () => (
    <div className="hidden lg:flex h-full w-64 flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold">
          Dashboard
          <span className="text-sm ml-2 text-muted-foreground">
            {session?.user?.role}
          </span>
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <NavItem
          href="/dashboard"
          icon={<LayoutDashboard className="h-5 w-5" />}
          label="Overview"
          active={isActive("/dashboard")}
        />

        {session?.user?.role === "ADMIN" && (
          <>
            <NavItem
              href="/admin/users"
              icon={<Users className="h-5 w-5" />}
              label="Users"
              active={isActive("/admin/users")}
            />
            <NavItem
              href="/admin/roles"
              icon={<Shield className="h-5 w-5" />}
              label="Roles"
              active={isActive("/admin/roles")}
            />
          </>
        )}

        {(session?.user?.role === "ADMIN" ||
          session?.user?.role === "MODERATOR") && (
          <NavItem
            href="/moderator"
            icon={<Shield className="h-5 w-5" />}
            label="Moderation"
            active={isActive("/moderator")}
          />
        )}

        <NavItem
          href="/dashboard/settings"
          icon={<Settings className="h-5 w-5" />}
          label="Settings"
          active={isActive("/dashboard/settings")}
        />
      </nav>

      <div className="p-4 border-t">
        <UserMenu />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block border-r bg-card">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="lg:hidden p-0 w-12 h-12 flex items-center justify-center"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1">
        <header className="h-16 border-b flex items-center justify-between px-6 bg-card">
          <h2 className="text-lg font-medium">{getPageTitle()}</h2>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
