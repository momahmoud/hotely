import Link from "next/link";
import { auth } from "../_lib/auth";
import Image from "next/image";

export default async function Navigation() {
  const session = await auth();
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors "
            >
              <div className="flex gap-2 items-center">
                <Image
                  src={session?.user?.image}
                  alt="Profile picture"
                  width={32}
                  height={32}
                  className="rounded-full h-8"
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col">
                  <span>Guest Area</span>
                  {/* <span>{session?.user?.email}</span> */}
                </div>
              </div>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
