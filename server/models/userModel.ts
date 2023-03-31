import dotenv from 'dotenv'
dotenv.config()
import pkg from 'pg'
const { Pool } = pkg;

const PG_URI = process.env.POSTGRES_URI;
const PG_PASSWORD = process.env.POSTGRES_PASSWORD
// create a new pool here using the connection string above
export const pool = new Pool({
  connectionString: PG_URI,
  password: PG_PASSWORD
});