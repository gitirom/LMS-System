"use client"

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
    icon: LucideIcon;
    label: string;
    href: string;
};

export const SidebarItem = ({
    icon: Icon,
    label,
    href,
}: SidebarItemProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const isActive = 
        (pathname === "/" && href === "/") || // checks if the pathname is the root ("/")  so is active will true
        pathname === href ||  //checks if pathname exactly matches href so isAct = true
        pathname?.startsWith(`${href}/`); //if any of them is true isAct = true
    
    const onClick = () => {
        router.push(href);
    }


    return (
        <button 
            className={
                cn(
                    //df style 
                    "flex items-center gap-x-2 text-slate-500 text-lg font-[500] pl-6 transition-all ☐ hover: text-slate-600 hover:bg-slate-300/20 ",
                    isActive && "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover: text-sky-700 "
                )
            }
            onClick={onClick}
        >
            <div className="flex items-center gap-x-2 py-4 ">
                <Icon size={22} className={cn("text-slate-500 ", 
                    isActive && "text-sky-700 ")}
                />
                {label}
            </div>
            <div className={
                cn("ml-auto opacity-0 border-2 border-sky-700 h-full transition-all ",
                    isActive && "opacity-100 "
                ) //for the boder of the active elem
            } />
        </button>
    )
}



