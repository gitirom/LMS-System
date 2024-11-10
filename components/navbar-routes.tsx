"use client"

import { useClerk, UserButton } from "@clerk/nextjs"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "./ui/button";
import {  LogOut } from "lucide-react";
import Link from "next/link";

export const NavBarRoutes = () => {

    const { signOut } = useClerk(); 

    // const handleSignOut = async () => {
    //     await signOut();
    //     router.push("/sign-in"); // Redirect after sign-out
    // };

    const pathname = usePathname();
    const router = useRouter();

    const isTeacherPage = pathname?.startsWith("/teacher");
    const isPlayerPage = pathname?.includes('/chapter'); //when open the course chapters

    return (
        <div className="flex gap-x-2 ml-auto ">
            {isTeacherPage || isPlayerPage ? (
                <Link href="/" >
                    <Button size="sm" variant="ghost"  >
                        <LogOut className="h-4 w-4 mr-2 " />
                        Exit
                    </Button>
                </Link>
            ) : (
                <Link href="/teacher/courses" >
                    <Button size="sm" variant="ghost" >
                        Teacher Mode
                    </Button>
                </Link>
            )}
            <UserButton />
        </div>
    )
}