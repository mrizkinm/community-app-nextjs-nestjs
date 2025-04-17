"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import { getSession, signIn } from "next-auth/react";
import { useState } from "react";
import { useErrorHandler } from "@/hooks/use-error-handler";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});


export function LoginForm() {
  const [loading, setLoading] = useState(false)
  const { handleError } = useErrorHandler();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        ...data,
        redirect: false, // Prevent automatic redirect
      });

      if (result?.error) {
        // Jika terjadi error, tampilkan error menggunakan error handler
        handleError(result);
        return;
      }
      
      // 🔥 Get latest session after login
      const session = await getSession();

      if (!session) {
        toast.error("Session not found");
        return;
      }

      const role = session.user.role;

      if (role === "admin") {
        toast.success("Welcome Admin");
        router.push("/admin/home");
      } else {
        toast.success("Welcome User");
        router.push("/user/posts");
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
               {loading ? 'Loading...' : 'Login'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}