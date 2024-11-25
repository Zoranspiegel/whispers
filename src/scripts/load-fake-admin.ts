import { getClient } from '@/db';
import bcrypt from 'bcrypt';

async function loadFakeAdmin(
  username: string,
  password: string
): Promise<void> {
  if (!username || !password) throw new Error('Missing fields');

  console.log(`🧞 Loading fake admin user:  USERNAME: ${username} PASSWORD=${password}`);

  const client = getClient();
  await client.connect();

  try {
    await client.query('begin');

    const userExistsRes = await client.query(
      'select id from users where username ilike $1',
      [username]
    );

    if (userExistsRes.rowCount) throw new Error('Username already taken');

    const saltOrRounds = 10;
    const hash = bcrypt.hashSync(password, saltOrRounds);

    await client.query(
      'insert into users (username, password, is_admin) values ($1, $2, $3)',
      [username, hash, true]
    );

    await client.query('commit');

    console.log('🧞 Fake admin user successfully loaded');
  } catch (error) {
    await client.query('rollback');
    throw error;
  } finally {
    await client.end();
  }
}

const username = process.argv[2];
const password = process.argv[3];

loadFakeAdmin(username, password).catch((error) => {
  if (error instanceof Error) {
    console.error(error.message);
  }
});
