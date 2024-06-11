import { getClient } from "../src/app/lib/server/db";

async function seed(){
    const client = getClient();
    await client.connect();
    const res = await client.query("SELECT * FROM posts");
    console.log(res.rows);
    await client.end();
    console.log("here")
}

seed();