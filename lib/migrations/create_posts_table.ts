import pool from "../server/db";

async function migrate() {
  const client = await pool.connect();
  const isTableExists = (await client.query(
    `SELECT EXISTS 
    ( 
        SELECT 1 
        FROM pg_catalog.pg_class 
        WHERE relname = 'posts' 
        AND relkind = 'r' 
    ) AS is_table_exists;`
  )).rows[0].is_table_exists;
    if (isTableExists) return;
  await client.query(
    "CREATE TABLE testtable (id SERIAL PRIMARY KEY, title TEXT, description TEXT)"
  );
  client.release();
}

migrate();
