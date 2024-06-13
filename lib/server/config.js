"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env_1 = require("@next/env");
var projectRootDir = process.cwd();
(0, env_1.loadEnvConfig)(projectRootDir);
var config = {
    POSTGRES_URL: process.env.PGURL
};
exports.default = config;
