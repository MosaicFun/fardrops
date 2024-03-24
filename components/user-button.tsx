'use client'
import { useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export default function UserButton() {
  //const session = await auth()
  const { ready, user, logout, authenticated } = usePrivy();
  const router = useRouter();
  console.log(user)

  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/");
    }
  }, [ready, user, authenticated, router]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <div className="flex flex-row space-y-4">
        <Button variant="ghost" className="relative w-10 h-10 rounded-full">
        <Avatar className="w-10 h-10">
          {user?.farcaster?.pfp && (
            <AvatarImage
              src={user.farcaster.pfp}
              alt={user.farcaster.displayName ?? ""}
            />
          )}
          <AvatarFallback>{user?.farcaster?.displayName}</AvatarFallback>
        </Avatar>
        </Button>
        <p className="text-sm font-medium leading-none hidden sm:block">
              {user?.farcaster?.displayName}
        </p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {/*<DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-xs leading-none text-muted-foreground">
              {user?.farcaster?.displayName}
            </p>
          </div>
          </DropdownMenuLabel>*/}
        <DropdownMenuItem>
        <Button onClick={logout} variant="ghost">
          <div>Sign Out</div>
        </Button>  
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
