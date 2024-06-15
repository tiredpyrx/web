import parse from "html-react-parser";
import React from "react";

import { createCodeBlock } from "@/utils";
import { slugify } from "@/utils";
import { db } from "@/database";

export const fetchCache = 'force-no-store';

const fetchPost = async (slug: string) => {
  const posts = await db.selectFrom("posts").selectAll().execute();
  const post = posts.filter(
    (post) => slugify({ text: post.title }) == slugify({ text: slug })
  )[0];
  return post;
};

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await fetchPost(params.slug);
  console.log(post.description)
  let content = await createCodeBlock({ text: post.description as string });

  content = content.map((e: any) => (typeof e === "string" ? parse(e) : e));

  return (
    <div className="max-w-4xl mx-auto">
      <header className="my-8 text-center">
      <h1 className="font-bold text-5xl">{post.title}</h1>
      </header>
      <article className="web-content">{content}</article>
    </div>
  );
}
