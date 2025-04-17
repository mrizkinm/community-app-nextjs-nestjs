import NoData from "@/components/community/no-data";
import { PostCard } from "@/components/community/post-card";
import { getPosts } from '@/lib/api';
import { Post } from "@/lib/types";

interface PostByTagPageProps {
  params: Promise<{
    tagName: string;
  }>
}

export default async function PostByTagPage({ params }: PostByTagPageProps) {
  const { tagName } = await params;
  const data: Post[] = await getPosts({ tag: tagName});

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Post by Tag #{tagName}</h1>
      </div>

      <div className="space-y-4">
        { data.length > 0
          ? data.map((post) => (
          <PostCard key={post.id} post={post} />
        ))
          : <NoData />
        }
      </div>
    </div>
  );
}