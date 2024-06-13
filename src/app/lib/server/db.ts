import { Client, Pool } from "pg";
import config from "./config";

function createNewClient(): Client {
  const client = new Client({
    connectionString: config.POSTGRES_URL,
  });
  return client;
}

export function getNewClient(): Client {
  return createNewClient();
}

let client = getNewClient();

client.prependListener("end", () => {
  client = getNewClient();
});

const pool = new Pool({
  connectionString: config.POSTGRES_URL
})

export default pool;
