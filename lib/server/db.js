"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewClient = void 0;
var pg_1 = require("pg");
var config_1 = require("./config");
function createNewClient() {
    var client = new pg_1.Client({
        connectionString: config_1.default.POSTGRES_URL,
    });
    return client;
}
function getNewClient() {
    return createNewClient();
}
exports.getNewClient = getNewClient;
var client = getNewClient();
client.prependListener("end", function () {
    client = getNewClient();
});
var pool = new pg_1.Pool({
    connectionString: config_1.default.POSTGRES_URL
});
exports.default = pool;
