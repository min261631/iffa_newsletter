import { getPostsByCategory } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { items } = await getPostsByCategory(params.slug, 20);
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6 capitalize">{params.slug}</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((p) => <PostCard key={p.slug} post={p} />)}
      </div>
    </div>
  );
}
