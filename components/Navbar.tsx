import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

async function Navbar() {
  const user = await currentUser();

  return (
    <header className="bg-black py-4 border-b-white/30 border-b-2">
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
            <div className="flex items-center gap-5">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-end gap-1 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Image
                        src={`${user?.imageUrl}`}
                        width={35}
                        height={35}
                        alt="User profile picture"
                        className="rounded-full"
                      />
                      <div className="flex items-center gap-1">
                        <p className="text-white text-sm">{user?.username}</p>
                        <ChevronDown className="text-white" size={15} />
                      </div>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link href="/user-profile" className="w-full">
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/create-post" className="w-full">
                        Post a Location
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/saved" className="w-full">
                        Saved Routes
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <SignOutButton>
                <button className="btn-primary">Sign Out</button>
              </SignOutButton>
            </div>
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
