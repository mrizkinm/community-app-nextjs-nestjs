'use client'

import React from 'react'
import { LogOut } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const LogoutButton= () => {
  const { data: session } = useSession();
  const router = useRouter();

  const onLogout = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.token}`
        }
      });
      
      const responseData = await response.json();

      if (response.ok) {
        // Redirect to dashboard or other protected page on success
        await signOut({
          redirect: false
        });
        router.push("/login");
      } else {
        toast.error(responseData);
      }
    } catch (error) {
      console.log(error)
    } finally {
    }
  }

  return (
    <a
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer"
      onClick={onLogout}
    >
      <LogOut className="h-4 w-4" />
      Logout
    </a>
  )
}

export default LogoutButton