import Link from 'next/link';

export default function homePage() {
  return (
    <main className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col w-full max-w-xs rounded-lg border-2 border-foreground p-3 gap-4">
        <h1 className='text-center text-xl font-bold'>Whispers</h1>
        <Link href="/login" className='rounded-sm border-2 border-foreground text-center font-bold py-2 hover:bg-foreground hover:text-background'>
          Login
        </Link>
        <Link href="/signup" className='rounded-sm border-2 border-foreground text-center font-bold py-2 hover:bg-foreground hover:text-background'>
          Sign Up
        </Link>
      </div>
    </main>
  );
}
