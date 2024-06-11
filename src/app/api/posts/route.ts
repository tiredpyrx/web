import { NextRequest, NextResponse } from "next/server";
import client from "@/app/lib/server/db";
import { validate } from "../validation";
import { POST_RULES } from "./posts.rules";

export async function POST(request: NextRequest) {
  const requestJSON = await request.json();
  const { title, description } = requestJSON;

  // const response = await client.query(
  //   `INSERT INTO posts (title, description) VALUES ('${title}', '${description}');`
  // );

  // client.end();

  const errorsMessages = await validate(requestJSON, POST_RULES);

  if (errorsMessages.length)
    return NextResponse.json({ errors: errorsMessages }, { status: 422 });

  return NextResponse.json({ message: "Post created successfully!" }, { status: 201 });
}
