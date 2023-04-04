import { PoolClient } from "pg";

export interface User {
    username: string;
    passwordhash: string;
    token?: string;
  }

export async function getUser(client: PoolClient, username: string): Promise<User> {
    const queryResult = await client.query(
      `SELECT * from users WHERE username='${username}'`
    );
    return queryResult.rows[0];
  }