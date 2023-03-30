import dotenv from 'dotenv'
dotenv.config()

import { Pool } from 'pg';

const PG_URI = process.env.POSTGRES_URI;
const PG_PASSWORD = process.env.POSTGRES_PASSWORD
// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
  password: PG_PASSWORD
});

export const db = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};
