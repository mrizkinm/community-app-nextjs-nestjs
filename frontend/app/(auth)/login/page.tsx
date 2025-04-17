import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full space-y-8">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold">Login Page</h1>
          <p className="text-muted-foreground">Enter your credentials to login</p>
        </div>
        <LoginForm />
        <div className="text-center text-sm">
          Don&apos;t have an account? {" "}
          <Link href="/register" className="text-primary hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}