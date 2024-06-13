import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface Database {
  users: UserTable;
  posts: PostTable;
}

export interface UserTable {
  id: Generated<number>;

  first_name: string;
  last_name: string | null;
  gender: "man" | "woman" | "other";

  created_at: ColumnType<Date, string | undefined, never>;

  plan_type: "free" | "premium";
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

export interface PostTable {
  id: Generated<number>;

  title: string;
  description: string | null;
}

export type Post = Selectable<PostTable>;
export type NewPost = Insertable<PostTable>;
export type PostUpdate = Updateable<PostTable>;
