'use client';

import PasswordVisibility from '@/components/PasswordVisibility';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

// INITIAL_STATE
const userInitialState: LoginUser = {
  username: '',
  password: ''
};

export default function LoginForm() {
  const router = useRouter();
  const [userState, setUserState] = useState<LoginUser>(userInitialState);
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const [errorState, setErrorState] = useState<string[]>([
    'Un error muy jodido',
    'Otro error pero más suavecito',
    'Este error si lo peta'
  ]);

  // HANDLE_INPUT_CHANGE
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setUserState((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      };
    });
  }

  // HANDLE_SUBMIT
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setUserState(userInitialState);
    router.push('/feed');
  }

  // TOGGLE_PASSWORD_VISIBILITY
  function toggleVisibility() {
    setPasswordVisibility(!passwordVisibility);
  }

  // RENDER
  return (
    <form
      className="w-screen max-w-xs flex flex-col items-center gap-4 border-2 rounded-lg p-6"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-bold">Log in</h1>
      <div className="flex flex-col w-full">
        <label>Username</label>
        <input
          className="outline-none border-2 rounded-md bg-background text-foreground px-3 py-1"
          onChange={handleChange}
          value={userState.username}
          placeholder="Username..."
          name="username"
          type="text"
        />
      </div>
      <div className="relative flex flex-col w-full">
        <label>Password</label>
        <input
          className="outline-none border-2 rounded-md bg-background text-foreground px-3 py-1"
          onChange={handleChange}
          value={userState.password}
          placeholder="Password..."
          name="password"
          type={passwordVisibility ? 'text' : 'password'}
        />
        <PasswordVisibility
          visibility={passwordVisibility}
          toggleVisibility={toggleVisibility}
        />
      </div>
      <ul>
        {errorState.map((error) => (
          <li
            className="text-red-600 text-[0.7rem] list-disc"
            key={Math.random().toString(36).slice(2)}
          >
            {error}
          </li>
        ))}
      </ul>
      <button className="border-2 rounded-md w-full px-3 py-1 font-bold hover:bg-foreground hover:text-background">
        Login
      </button>
    </form>
  );
}
