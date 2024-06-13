import pool from "@/app/lib/server/db";
import { bsxToJSX } from "../example";
import parse from "html-react-parser";
import slugify from "slugify"
import React from "react";

export const castToSlug = (text: string) => slugify(text, {
  lower: true,
  trim: true,
  locale: "en",
  strict: true
})

const fetchPost = async (slug: string) => {
  console.log("here", slug);
  const client = await pool.connect();
  const posts = (await client.query(`SELECT * FROM posts`)).rows;
  const post = posts.filter((post: { title: string }) => {
    
    return castToSlug(post.title) == castToSlug(slug);
  })[0];
  client.release();
  // return response.rows[0];
  return post
};

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await fetchPost(params.slug);
  // console.log(post.id)

  let description = await bsxToJSX(post.description);

  description = description.map((e) => (typeof e === "string" ? parse(e) : e));

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="mb-2 text-center font-bold text-2xl">{post.title}</h1>
      <article>{description}</article>
    </div>
  );
}
