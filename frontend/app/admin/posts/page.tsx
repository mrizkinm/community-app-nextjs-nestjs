import { getAllPosts } from '@/lib/api';
import NoData from "@/components/community/no-data";
import { AllPostCard } from "@/components/community/all-post-card";
import { Post } from '@/lib/types';

export default async function PostsPage() {
  const data: Post[] = await getAllPosts();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">All Posts</h1>
      </div>

      <div className="space-y-4">
      {
        data.length > 0
        ? 
        data.map((post) => (
          <AllPostCard key={post.id} post={post} />
        ))
        : <NoData />
      }
      </div>
    </div>
  );
}