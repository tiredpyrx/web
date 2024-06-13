import parse from "html-react-parser";
import React from "react";

import { createCodeBlock } from "@/utils";
import { slugify } from "@/utils";
import { db } from "@/database";

const fetchPost = async (slug: string) => {
  console.log("here", slug);
  const posts = await db.selectFrom("posts").selectAll().execute();
  const post = posts.filter(
    (post) => slugify({ text: post.title }) == slugify({ text: slug })
  )[0];
  return post;
};

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await fetchPost(params.slug);
  let content = await createCodeBlock({ text: post.description as string });

  content = content.map((e: any) => (typeof e === "string" ? parse(e) : e));

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="mb-2 text-center font-bold text-2xl">{post.title}</h1>
      <article>{content}</article>
    </div>
  );
}
