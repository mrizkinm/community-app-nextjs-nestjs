// /components/community/post-form.tsx
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { TagsInput } from "@/components/community/tags-input";

import { z } from "zod";
import { useState } from "react";
import { useErrorHandler } from "@/hooks/use-error-handler";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Send } from "lucide-react";

export const formSchema = z.object({
  title: z.string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),
  content: z.string()
    .min(3, "Content must be at least 3 characters")
    .max(5000, "Content cannot exceed 5000 characters"),
  tags: z.array(z.string()
    .min(2, "Tag must be at least 2 characters")
    .max(20, "Tag cannot exceed 20 characters")
    .regex(/^[a-zA-Z0-9]+$/, "Tag can only contain letters and numbers")
  )
  .min(1, "At least one tag is required")
  .max(5, "Cannot add more than 5 tags"),
});

export function PostForm() {
  const [loading, setLoading] = useState(false)
  const { handleError } = useErrorHandler();
  const router = useRouter();
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/posts`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.token}`
        }
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success('Waiting for admin to confirm');
        setTimeout(() => {
          router.push("/user/posts");
        }, 1000);
      } else {
        // Menampilkan error toast untuk setiap field yang gagal
        handleError(responseData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Post title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your post content..."
                  className="min-h-[200px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <TagsInput
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Add tags (press enter to add)"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading}>
          <Send /> {loading ? 'Loading...' : 'Publish Post'}
        </Button>
      </form>
    </Form>
  );
}