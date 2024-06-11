import { Client } from "pg";

declare global {
    var client: Client;
}