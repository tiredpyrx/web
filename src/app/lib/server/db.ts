import { Client } from "pg";
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

client.connect();

export default client;
