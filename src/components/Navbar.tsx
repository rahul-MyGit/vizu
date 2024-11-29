import Link from "next/link";
import { UserAuthButton } from "@/components/ui/user-auth-button";
import { CircuitBoard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center bg-slate-400 rounded-b-md p-4">
        <div className="mr-4 flex items-center space-x-2">
          <CircuitBoard className="h-6 w-6" />
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">Vizu</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Button variant="ghost" asChild>
                  <Link href="/about">About</Link>
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button variant="ghost" asChild>
                  <Link href="/contact">Contact</Link>
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <UserAuthButton />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
}