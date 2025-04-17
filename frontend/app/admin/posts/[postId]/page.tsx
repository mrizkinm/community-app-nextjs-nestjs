import { getAdminComments, getAdminDetailPost } from '@/lib/api';
import { Comment, Post } from "@/lib/types";
import NoData from '@/components/community/no-data';
import { AllPostCard } from '@/components/community/all-post-card';
import { CustomCommentList } from '@/components/community/custom-comment-list';

interface DetailPostProps {
  params: Promise<{
    postId: string;
  }>
}

export default async function DetailPostPage({ params }: DetailPostProps) {
  const { postId } = await params;
  const post: Post = await getAdminDetailPost(parseInt(postId));
  const comments: Comment[] = await getAdminComments(parseInt(postId));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Detail Post</h1>
      </div>
      {
        post ?
        <div>
          <AllPostCard post={post} />
          <div className="mt-6 space-y-4">
            <h3 className="font-semibold">Comments ({comments.length})</h3>

            {/* Comments List */}
           <CustomCommentList data={comments}/>
          </div>
        </div>
        :
        <NoData />
      }
    </div>
  );
}