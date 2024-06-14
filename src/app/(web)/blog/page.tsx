import Link from "next/link";
import { slugify } from "@/utils";
import { db } from "@/database";

export const fetchPosts = async () => {
  return await db
    .selectFrom("posts")
    .select(["id", "title", "description"])
    .execute();
};

export default async function Blog() {
  const posts = await fetchPosts();
  return (
    <div className="max-w-3xl mx-auto w-full h-full bg-gray-50 p-6 rounded">
      <div className="grid grid-cols-2 gap-4">
        {posts.length > 0 &&
          posts.map((post) => (
            <Link
              key={post.id}
              href={`blog/${slugify({ text: post.title })}`}
              className="p-4 bg-gray-300 rounded-md block"
            >
              <h3 className="mb-2">{post.title}</h3>
              <p className="text-sm">{post.description}</p>
            </Link>
          ))}
      </div>
    </div>
  );
}
