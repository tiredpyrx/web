import { loadEnvConfig } from "@next/env";

const projectRootDir = process.cwd()
loadEnvConfig(projectRootDir);

const config = {
    POSTGRES_URL: process.env.PGURL
}

export default config;
