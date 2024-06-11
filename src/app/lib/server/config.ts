import { loadEnvConfig } from "@next/env";

const projectRootDir = process.cwd()
loadEnvConfig(projectRootDir);

console.log("current directory is %s", process.cwd());

const config = {
    POSTGRES_URL: process.env.PGURL
}

export default config;
