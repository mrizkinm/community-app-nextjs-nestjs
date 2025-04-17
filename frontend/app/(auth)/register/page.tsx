import { RegisterForm } from "@/components/auth/register-form";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full space-y-8">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold">New User Registration</h1>
          <p className="text-muted-foreground">
            Enter your details to get started
          </p>
        </div>
        <RegisterForm />
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}