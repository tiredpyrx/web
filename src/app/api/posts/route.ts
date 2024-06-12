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

  const validation = await validate(requestJSON, POST_RULES);

  if (validation.failed)
    {console.log(validation)
    return NextResponse.json({ errors: validation.errorMessages }, { status: 422 });}

  console.log(validation)
  return NextResponse.json({ message: "Post created successfully!" }, { status: 201 });
}
