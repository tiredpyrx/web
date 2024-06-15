import { NextRequest, NextResponse } from "next/server";
import { validate } from "../validation";
import { POST_RULES } from "./posts.rules";
import { db } from "@/database";

export async function POST(request: NextRequest) {
  const requestJSON = await request.json();
  const { title, description } = requestJSON;

  const validation = await validate(requestJSON, POST_RULES);

  if (validation.failed)
    return NextResponse.json(
      { errors: validation.errorMessages },
      { status: 422 }
    );

  // const result = await db
  //   .insertInto("posts")
  //   .values({
  //     title,
  //     description,
  //   })
  //   .executeTakeFirst();
  let result = true;

  if (!result) {
    return NextResponse.json(
      { errors: ["Something went wrong!"] },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Post created successfully!", title, description },
    { status: 201 }
  );
}
