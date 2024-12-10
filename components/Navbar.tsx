import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

async function Navbar() {
  const user = await currentUser();

  return (
    <header className="bg-black py-4">
      <nav className="container flex justify-between items-center">
        <Link href="/">
          <Image
            src="/hauntmap-logo.png"
            width={216}
            height={50}
            alt="HauntMap Logo"
            className="w-[144px]"
          />
        </Link>
        <div>
          <SignedOut>
            <SignInButton>
              <button className="btn-primary">Sign In</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div>
              <Image
                src={`${user?.imageUrl}`}
                width={50}
                height={50}
                alt="User profile picture"
              />
            </div>
            <p className="text-white">{user?.username}</p>
            <SignOutButton>
              <button className="btn-primary">Sign Out</button>
            </SignOutButton>
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
