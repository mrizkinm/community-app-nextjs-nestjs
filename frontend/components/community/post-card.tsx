'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle } from "lucide-react";
import { Post, Tag } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatTimeAgo } from "@/lib/time-ago";
import { useErrorHandler } from "@/hooks/use-error-handler";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {

  const { handleError } = useErrorHandler();
  const { data: session } = useSession();
  const router = useRouter();

  const handlePostLike = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/likes/post/${post.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.token}`
        }
      });

      const responseData = await response.json();

      if (response.ok) {
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

      <Link href={`/user/posts/${post.id}`}>
        <h2 className="text-xl font-bold mb-2 hover:text-blue-600">
          {post.title}
        </h2>
        <p className="text-gray-700 mb-4 line-clamp-2">{post.content}</p>
      </Link>

      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag: Tag, index) => (
          <Link
            key={index}
            href={`/user/tags/${tag.name}`}
            className="text-sm px-2 py-1 bg-gray-100 rounded-full hover:bg-gray-200"
          >
            #{tag.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="gap-1" title="Like Post" onClick={handlePostLike}>
          { post.likeByMe ? <Heart className="w-4 h-4 fill-red-500 stroke-red-500" /> : <Heart className="w-4 h-4" /> } 
          <span>{post.likeCount}</span>
        </Button>
        <Link href={`/user/posts/${post.id}`} title="Comment Post">
          <Button variant="ghost" size="sm" className="gap-1">
            <MessageCircle className="w-4 h-4" />
            <span>{post.commentCount}</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}