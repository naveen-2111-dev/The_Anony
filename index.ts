import { configDotenv } from "dotenv";

configDotenv();

const PORT = process.env.PORT;

export { default } from "./src/app";