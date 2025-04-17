'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, Heart, MessageCircle, Trash } from "lucide-react";
import { Post, Tag } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatTimeAgo } from "@/lib/time-ago";
import { Badge } from "../ui/badge";
import { useErrorHandler } from "@/hooks/use-error-handler";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"

interface PostCardProps {
  post: Post;
}

export function AllPostCard({ post }: PostCardProps) {
  const { handleError } = useErrorHandler();
  const { data: session } = useSession();
  const router = useRouter();

  const handleApprovePost = async (id: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/approve-post/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.token}`
        }
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success("Post approved!");
        router.refresh();
      } else {
        // Menampilkan error toast untuk setiap field yang gagal
        handleError(responseData);
      }
    } catch (error) {
      console.log(error)
    } finally {
    }
  }

  const handleDeletePost = async (id: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/delete-post/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.token}`
        }
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success("Post deleted!");
        router.refresh();
      } else {
        // Menampilkan error toast untuk setiap field yang gagal
        handleError(responseData);
      }
    } catch (error) {
      console.log(error)
    } finally {
    }
  }

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full">
          <Avatar>
            <AvatarImage />
            <AvatarFallback className="text-sm">
              {post?.author.name[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <span className="font-medium">{post.author.name}</span>
        <span className="text-sm text-gray-500">
         { formatTimeAgo(post.createdAt) }
        </span>
        {
          !post.status &&
          <Badge variant="destructive" className="gap-1">
            <span>Pending</span>
          </Badge>
        }
      </div>

      <Link href={`/admin/posts/${post.id}`}>
        <h2 className="text-xl font-bold mb-2 hover:text-blue-600">
          {post.title}
        </h2>
        <p className="text-gray-700 mb-4 line-clamp-2">{post.content}</p>
      </Link>

      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag: Tag, index) => (
          <div
            key={index}
            className="text-sm px-2 py-1 bg-gray-100 rounded-full hover:bg-gray-200"
          >
            #{tag.name}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between w-full">
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="gap-1">
            <Heart className="w-4 h-4" />
            <span>{post.likeCount}</span>
          </Button>
          <Link href={`/admin/posts/${post.id}`}>
            <Button variant="ghost" size="sm" className="gap-1">
              <MessageCircle className="w-4 h-4" />
              <span>{post.commentCount}</span>
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {
            !post.status && (
              <Button
                variant="default"
                size="sm"
                className="gap-1"
                onClick={() => handleApprovePost(post.id)}
                title="Approve Post"
              >
                <Check className="w-4 h-4" />
                <span>Approve</span>
              </Button>
            )
          }
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash className="h-4 w-4" /> Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Yakin ingin menghapus data ini?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDeletePost(post.id)}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
      </div>

    </div>
  );
}