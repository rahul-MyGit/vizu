import Link from "next/link";
import { UserAuthButton } from "@/components/ui/user-auth-button";
import { Button } from "@/components/ui/button";
import { VibrantLogo } from "./home/vibrant-logo";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#feeed9] backdrop-blur-sm border-b">
                <div className="container mx-auto px-4 py-4">
                    <nav className="flex items-center justify-between">
                        <VibrantLogo />
                        <div className="hidden md:flex items-center gap-6">
                            <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Home</Link>
                            <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Features</Link>
                            <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">How it Works</Link>
                            <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">About Us</Link>
                            <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Blog</Link>
                        </div>
                        <div className="flex items-center gap-4">
                            <UserAuthButton />
                            <Link href='/dashboard'>
                            <Button className="bg-rose-500 hover:bg-rose-600 transition-colors">
                                Get Started
                            </Button>
                            </Link>
                        </div>
                    </nav>
                </div>
            </header>
  );
}