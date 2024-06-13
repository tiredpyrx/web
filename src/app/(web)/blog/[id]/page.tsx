import pool from "@/app/lib/server/db";
import { bsxToJSX } from "../example";
import parse from "html-react-parser"
import React from "react";

const fetchPost = async (id: string) => {
  const client = await pool.connect();
  const response = await client.query(`SELECT * FROM posts WHERE id = ${id};`);
  client.release();
  return response.rows[0];
};

export default async function Page({ params }: { params: { id: string } }) {
  const post = await fetchPost(params.id);
  console.log(post.id)

    let description = await bsxToJSX(post.description);

    description = description.map(e => typeof e === "string" ? parse(e) : e)

  return (
    <div className="max-w-4xl mx-auto">
        <h1 className="mb-2 text-center font-bold text-2xl">{post.title}</h1>
        <article>
            {description}
        </article>
    </div>
  );
}
