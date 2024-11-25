import { Client } from 'pg';
import { loadEnvConfig } from '@next/env';

const appDir = process.cwd();
loadEnvConfig(appDir);

export function getClient(): Client {
  if (process.env.POSTGRES_URL) {
    const client = new Client({
      connectionString: process.env.POSTGRES_URL
    });
    console.log('production client returned');
    return client;
  } else {
    const client = new Client({
      user: process.env.PG_USER,
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB
    });
    console.log('local client returned');
    return client;
  }
}
