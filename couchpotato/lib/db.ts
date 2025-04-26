// import { neonDbUrl } from "@/constants/db";
import { DATABASE } from "@/env.config";
import { neon } from "@neondatabase/serverless";

const config = DATABASE.url;
// Create an instance of Neon's TS/JS driver
const sql = neon(config);

export default sql