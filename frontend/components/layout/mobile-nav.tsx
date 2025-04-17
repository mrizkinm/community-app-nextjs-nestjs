'use client';

import { useState } from "react";
import Link from "next/link";
import { Home, PlusSquare, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LogoutButton from "../community/logout-button";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="sm:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-background">
            <div className="flex h-full flex-col gap-4">
              <div className="flex h-16 items-center border-b px-6">
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="flex-1 overflow-auto py-4">
                <nav className="flex flex-col gap-1 px-4">
                  <MobileNavLink href="/user/posts" icon={<Home className="h-4 w-4" />} label="Home" onClick={() => setIsOpen(false)} />
                  <MobileNavLink href="/user/create-post" icon={<PlusSquare className="h-4 w-4" />} label="Create Post" onClick={() => setIsOpen(false)} />
                  <MobileNavLink href="/user/profile" icon={<User className="h-4 w-4" />} label="Profile" onClick={() => setIsOpen(false)} />
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
          </div>
        </div>
      )}
    </>
  );
}

function MobileNavLink({
  href,
  icon,
  label,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      onClick={onClick}
    >
      {icon}
      {label}
    </Link>
  );
}