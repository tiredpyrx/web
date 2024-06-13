import client from "../lib/server/db";

async function seed(){
    // seed db
    await client.connect()
    await client.end();
}

seed();
