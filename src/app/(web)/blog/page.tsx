import pool from "@/app/lib/server/db";

export const fetchPosts = async () => {
  // const client = new Client({
  //   connectionString: config.POSTGRES_URL,
  // });

  const client = await pool.connect();
  const posts = await client.query("SELECT * FROM posts;")
  client.release();
  return [];
};

export default async function Blog() {
  const posts = await fetchPosts();
  return (
    <div className="max-w-3xl mx-auto w-full h-full bg-gray-50 p-6 rounded">
      <div className="grid grid-cols-2 gap-4">
        {posts.length &&
          posts.map(
            (post: { id: number; title: string; description?: string }) => (
              <div className="p-4 bg-gray-300 rounded-md">
                <h3 className="mb-2">{post.title}</h3>
                <p className="text-sm">{post.description}</p>
              </div>
            )
          )}
      </div>
    </div>
  );
}
