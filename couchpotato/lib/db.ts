import { neonDbUrl } from "@/constants/db";
import { neon } from "@neondatabase/serverless";

const config = neonDbUrl
// Create an instance of Neon's TS/JS driver
const sql = neon(config);

export default sql