import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-green-600 bg-opacity-20 flex items-center justify-evenly text-xs">
      <Link href="/feed">FEED</Link>
      <Link href="/profile">PROFILE</Link>
      <Link href="/followers">FOLLOWERS</Link>
      <Link href="/following">FOLLOWING</Link>
      <Link href="/admin">ADMIN</Link>
    </nav>
  );
}
