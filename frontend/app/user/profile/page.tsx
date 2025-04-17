import NoData from "@/components/community/no-data";
import { PostCard } from "@/components/community/post-card";
import { Button } from "@/components/ui/button";
import { getPosts } from '@/lib/api';
import { Post } from "@/lib/types";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function ProfilePage() {
  const data: Post[] = await getPosts({ onlyMine: true});

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Posts</h1>
        <Link href="/user/create-post">
          <Button><Plus /> Create Post</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {
          data.length > 0
          ? 
          data.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
          : <NoData />
        }
      </div>
    </div>
  );
}