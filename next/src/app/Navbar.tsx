"use client";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "~/components/shadcn/ui/tooltip";
import { cx } from "class-variance-authority";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsMoon } from "react-icons/bs";
import {
    Code2,
    Home,
    LineChart,
    ListTodo,
    Package,
    Settings,
    ShoppingCart,
    SquareUserRound,
    Triangle,
    Users2,
    Wallet,
    BadgeEuro,
} from "lucide-react";

export const Navbar: React.FC = (_props) => {
    return (
        <aside className="sticky top-0 z-10 hidden h-screen w-14 flex-col border-r bg-background sm:flex">
            <Link href="/" className="w-full border-b p-2">
                <span className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-input bg-background text-lg font-semibold text-primary-foreground transition-all hover:bg-primary md:text-base">
                    {false && (
                        <Code2 className="h-4 w-4 transition-all group-hover:scale-110" />
                    )}
                    <Triangle className="size-5 fill-current transition-all group-hover:scale-110" />
                    <span className="sr-only">Acme Inc</span>
                </span>
            </Link>
            <nav className="flex flex-col items-center gap-1 px-2 sm:pb-5 sm:pt-2">
                <NavItem label="Dashboard" icon={Home} href="#" />
                <NavItem label="Tasks" icon={ListTodo} href="/tasks" />
                <NavItem label="Orders" icon={ShoppingCart} href="#" />
                <NavItem label="Products" icon={Package} href="#" />
                <NavItem label="Customers" icon={Users2} href="#" />
                <NavItem label="Analytics" icon={LineChart} href="#" />
                <NavItem label="Wallet" icon={Wallet} href="/shadcn/wallet" />
                <NavItem label="Payments" icon={BadgeEuro} href="/payments" />
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-1 px-2 sm:py-5">
                {false && <NavItem label="Theme" icon={BsMoon} href="#" />}
                <NavItem label="My Profile" icon={SquareUserRound} href="#" />
                <NavItem label="Settings" icon={Settings} href="#" />
            </nav>
        </aside>
    );
};

export const NavItem: React.FC<{
    label: React.ReactNode;
    href: string;
    icon: React.FC<{ className?: string }>;
    /** @default true */
    matchSubPaths?: boolean;
}> = (props) => {
    const path = usePathname();

    return (
        <TooltipProvider delayDuration={500}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href={props.href}
                        className={cx(
                            "flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-accent md:h-10 md:w-10",
                            (
                                props.matchSubPaths === true
                                    ? path.startsWith(props.href)
                                    : path === props.href
                            )
                                ? "bg-accent text-accent-foreground hover:text-foreground"
                                : "text-muted-foreground hover:text-foreground",
                        )}
                    >
                        <props.icon className="size-5" />
                        <span className="sr-only">{props.label}</span>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{props.label}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
