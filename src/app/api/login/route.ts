import { getClient } from '@/db';
import { LoginUserSchema } from '@/models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // ENV_VALIDATION
    if (!process.env.JWT_SECRET) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

    // BODY_VALIDATION
    const reqJSON = await request.json();
    const body = LoginUserSchema.parse(reqJSON);
    const { username, password } = body;

    // PG_CLIENT_CONNECT
    const client = getClient();
    await client.connect();

    // USER_VERIFICATION
    const user = await client.query(
      'select id, password, is_admin from users where username ilike $1',
      [username]
    );

    if (!user.rowCount) {
      await client.end();
      return NextResponse.json({ error: 'User does not exist' }, { status: 404 });
    }

    // CLIENT_END
    await client.end();

    // PASSWORD_VERIFICATION
    const hash = user.rows[0].password;
    const match = await bcrypt.compare(password, hash);

    if (!match) {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 403 });
    }

    // JWT_TOKEN_SIGNATURE
    const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET);
    const jwtSubject = JSON.stringify({
      id: user.rows[0].id,
      is_admin: user.rows[0].is_admin
    });

    const token = await new SignJWT({})
      .setProtectedHeader({ alg: 'HS256' })
      .setSubject(jwtSubject)
      .setIssuedAt()
      .setExpirationTime('20h')
      .sign(jwtSecret);

    // RESPONSE_&_COOKIE_CREATION     
    const response = NextResponse.json({ msg: 'Login Success' }, { status: 200 });
    response.cookies.set('jwt-token', token, {
      sameSite: 'strict',
      httpOnly: true,
      secure: true
    });

    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}