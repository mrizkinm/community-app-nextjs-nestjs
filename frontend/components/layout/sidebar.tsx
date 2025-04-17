'use client';

import Link from "next/link";
import { Home, PlusSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import LogoutButton from "../community/logout-button";

export function Sidebar() {
  const { data: session } = useSession();

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
      <div className="flex h-full flex-col gap-4">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="text-lg">Community App</span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-auto py-4">
          <nav className="flex flex-col gap-1 px-4">
            <SidebarLink href="/user/posts" icon={<Home className="h-4 w-4" />} label="Home" />
            <SidebarLink href="/user/create-post" icon={<PlusSquare className="h-4 w-4" />} label="Create Post" />
            <SidebarLink href="/user/profile" icon={<User className="h-4 w-4" />} label="Profile" />
            <LogoutButton />
          </nav>
        </div>
        
        <div className="p-4 border-t">
          {session?.user ? (
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage />
                <AvatarFallback>
                  {session.user.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">{session.user.name} ({session.user.role})</span>
                <span className="text-sm text-muted-foreground">
                  {session.user.email}
                </span>
              </div>
            </div>
          ) : (
            <Button asChild className="w-full">
              <Link href="/login">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </aside>
  );
}

function SidebarLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
    >
      {icon}
      {label}
    </Link>
  );
}