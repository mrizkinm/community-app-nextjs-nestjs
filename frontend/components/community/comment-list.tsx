'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { formatTimeAgo } from '@/lib/time-ago';
import { Comment } from '@/lib/types';
import { useErrorHandler } from '@/hooks/use-error-handler';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function CommentList ({ data }: { data: Comment[] }) {

  const { handleError } = useErrorHandler();
  const { data: session } = useSession();
  const router = useRouter();

  const handleCommentLike = async (id: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/likes/comment/${id}`, {
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
    <div className="space-y-4">
    {data.map((comment) => (
      <div
        key={comment.id}
        className="flex items-start gap-3 rounded-lg bg-muted/50 p-2"
      >
        <Avatar className="h-8 w-8">
          <AvatarImage />
          <AvatarFallback className="text-sm">
            {comment.author.name[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex justify-between items-center">
            <span className="font-medium">{comment.author.name}</span>
            <span className="text-sm text-muted-foreground">
              { formatTimeAgo(comment.createdAt) }
            </span>
          </div>

          <p className="mt-1 text-sm text-gray-800">{comment.content}</p>

          <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
            <Button variant="outline" size="icon" className="gap-1 h-6" onClick={ () => handleCommentLike(comment.id)} title="Like Comment">
              <Heart className="w-3 h-3" />
              <span className="text-xs">{comment.likeCount}</span>
            </Button>
          </div>
        </div>
      </div>
    ))}
  </div>
  )
}