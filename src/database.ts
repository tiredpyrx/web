import { Database } from "./types";
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.PG_URL
  }),
});

const db = new Kysely<Database>({
  dialect,
});

export { db };
