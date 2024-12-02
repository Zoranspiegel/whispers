'use client';

import {
  FaHome,
  FaComment,
  FaUsers,
  FaUserFriends,
  FaCog
} from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <nav className="rounded-lg border-2 border-foreground flex items-center justify-evenly">
      <Link
        className={`text-2xl ${
          pathname.startsWith('/feed') ? 'text-red-600' : undefined
        }`}
        href="/feed"
      >
        <FaHome />
      </Link>
      <Link
        className={`text-xl ${
          pathname.startsWith('/profile') ? 'text-red-600' : undefined
        }`}
        href="/profile"
      >
        <FaComment />
      </Link>
      <Link
        className={`text-2xl ${
          pathname.startsWith('/followers') ? 'text-red-600' : undefined
        }`}
        href="/followers"
      >
        <FaUsers />
      </Link>
      <Link
        className={`text-2xl ${
          pathname.startsWith('/following') ? 'text-red-600' : undefined
        }`}
        href="/following"
      >
        <FaUserFriends />
      </Link>
      <Link
        className={`text-xl ${
          pathname.startsWith('/admin') ? 'text-red-600' : undefined
        }`}
        href="/admin"
      >
        <FaCog />
      </Link>
    </nav>
  );
}
