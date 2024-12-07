import { getClient } from '@/db';
import { SignupUserSchema } from '@/models/User';
import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import bcrypt from 'bcrypt';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // ENV_VALIDATION
    if (!process.env.JWT_SECRET) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

    // BODY_VALIDATION
    const reqJSON = await request.json();
    const body = SignupUserSchema.parse(reqJSON);
    const { username, password } = body;

    // PG_CLIENT_CONNECT
    const client = getClient();
    await client.connect();

    // OLD_USER_VERIFICATION
    const oldUser = await client.query(
      'select id from users where username ilike $1',
      [username]
    );

    if (oldUser.rowCount) {
      await client.end();
      return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
    }

    // PASSWORD_ENCRYPTATION
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);

    // NEW_USER_CREATION
    const newUser = await client.query(
      'insert into users (username, password) values ($1, $2) returning id, is_admin',
      [username, hash]
    );

    //PG_CLIENT_END
    await client.end();
    
    // NEW_USER_VERIFICATION
    if (!newUser.rowCount) {
      await client.end();
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

    // JWT_TOKEN_SIGNATURE
    const jwtSub = JSON.stringify(newUser.rows[0]);
    const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({})
      .setProtectedHeader({ alg: 'HS256' })
      .setSubject(jwtSub)
      .setIssuedAt()
      .setExpirationTime('20h')
      .sign(jwtSecret);    

    // RESPONSE_&_COOKIE_CREATION
    const response = NextResponse.json({ msg: body }, { status: 201 });
    response.cookies.set('jwt-token', token, {
      sameSite: 'strict',
      httpOnly: true,
      secure: true
    });

    // RESPONSE
    return response;    
  } catch (error) {
    // ERROR_CATCHER
    if (error instanceof Error) {
      console.error(error.message);
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
