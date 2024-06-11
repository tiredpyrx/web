import { Client } from "pg";
import config from "./config";

function createNewClient(name?:string): Client {
  const client = new Client({
    user: name,
    connectionString: config.POSTGRES_URL,
  });
  return client;
}

function getNewClient(name?: string): Client {
  return createNewClient(name);
}

let client = getNewClient();

client.prependListener("end", () => {
  client = getNewClient("postgres://testuser:dogakorkmaz@localhost:5432/test");
});

client.connect();

export default client;
