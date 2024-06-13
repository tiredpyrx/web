import pool from "@/app/lib/server/db";
import Link from "next/link";
import { slugify } from "@/utils";


export const fetchPosts = async () => {
  const client = await pool.connect();
  const posts = await client.query("SELECT * FROM posts;");
  client.release();
  return posts.rows;
};

export default async function Blog() {
  const posts = await fetchPosts();
  return (
    <div className="max-w-3xl mx-auto w-full h-full bg-gray-50 p-6 rounded">
      <div className="grid grid-cols-2 gap-4">
        {posts.length > 0 &&
          posts.map(
            (post: { id: number; title: string; description?: string }) => (
              <Link
                key={post.id}
                href={`blog/${slugify(post.title)}`}
                className="p-4 bg-gray-300 rounded-md block"
              >
                <h3 className="mb-2">{post.title}</h3>
                <p className="text-sm">{post.description}</p>
              </Link>
            )
          )}
      </div>
    </div>
  );
}
