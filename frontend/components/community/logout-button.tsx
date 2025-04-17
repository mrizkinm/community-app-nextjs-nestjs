'use client'

import React from 'react'
import { LogOut } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LogoutButton= () => {
  const { data: session } = useSession();
  const router = useRouter();

  const onLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.token}`
        }
      });

      await signOut({
        redirect: false
      });
      router.push("/login");
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  return (
    <div
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer"
      onClick={onLogout}
    >
      <LogOut className="h-4 w-4" />
      Logout
    </div>
  )
}

export default LogoutButton