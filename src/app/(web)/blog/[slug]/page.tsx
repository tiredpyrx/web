import pool from "@/app/lib/server/db";
import parse from "html-react-parser";
import React from "react";

import { createCodeBlock } from "@/utils";
import { slugify } from "@/utils";

const fetchPost = async (slug: string) => {
  console.log("here", slug);
  const client = await pool.connect();
  const posts = (await client.query(`SELECT * FROM posts`)).rows;
  const post =
    posts.filter((post: { title: string }) => {
      return slugify({ text: post.title }) == slugify({ text: slug });
    })[0] || {};
  client.release();
  return post;
};

export default async function Page({ params }: { params: { slug: string } }) {
  const post: {
    title: string;
    description: string;
  } = await fetchPost(params.slug);
  let content = await createCodeBlock({ text: post.description });

  content = content.map((e: any) => (typeof e === "string" ? parse(e) : e));

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="mb-2 text-center font-bold text-2xl">{post.title}</h1>
      <article>{content}</article>
    </div>
  );
}
