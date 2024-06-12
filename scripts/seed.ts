import client from "@/app/lib/server/db";

async function seed(){
    // seed db
    await client.end();
}

seed();