import { getComments, getDetailPost } from '@/lib/api';
import { Comment, Post } from "@/lib/types";
import { PostCard } from "@/components/community/post-card";
import { CommentForm } from '@/components/community/comment-form';
import { CommentList } from '@/components/community/comment-list';
import NoData from '@/components/community/no-data';

interface DetailPostProps {
  params: Promise<{
    postId: string;
  }>
}

export default async function DetailPostPage({ params }: DetailPostProps) {
  const { postId } = await params;
  const post: Post = await getDetailPost(parseInt(postId));
  const comments: Comment[] = await getComments(parseInt(postId));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Detail Post</h1>
      </div>
      {
        post ?
        <div>
          <PostCard post={post} />
          <div className="mt-6 space-y-4">
            <h3 className="font-semibold">Comments ({comments.length})</h3>
            
            {/* Comment Form */}
            <CommentForm postId={postId} />
            
            {/* Comments List */}
           <CommentList data={comments}/>
          </div>
        </div>
        :
        <NoData />
      }
    </div>
  );
}