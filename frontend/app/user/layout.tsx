import { MobileNav } from "@/components/layout/mobile-nav";
import { Sidebar } from "@/components/layout/sidebar";
import { redirect } from "next/navigation";
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth";

export const metadata = {
  title: 'User Page',
  description: 'User Dashboard Page',
};

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'user') {
    redirect('/unauthorized');
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-hidden pl-0 sm:pl-64">
        <div className="sticky top-0 z-40 flex h-16 items-center border-b bg-background px-4 sm:hidden">
          <MobileNav />
        </div>
        <div className="h-full p-6 max-w-4xl mx-auto">{children}</div>
      </main>
    </div>
  );
}