"use client";

import { cx } from "class-variance-authority";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const __Layout: React.FC<React.PropsWithChildren> = (props) => (
    <div className="w-full px-10 pb-4">
        <header className="flex w-full items-center justify-between space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Tasks</h2>

            <TabsNav
                links={[
                    { label: "Table", href: "/tasks" },
                    { label: "Kanban", href: "/tasks?view=kanban" },
                ]}
            />
        </header>
        <main>{props.children}</main>
    </div>
);
export default __Layout;

const TabsNav: React.FC<{
    links: {
        label: React.ReactNode;
        href: string;
    }[];
}> = (props) => {
    const path = usePathname();
    const searchParams = useSearchParams();

    const activeIdx = props.links
        .map((x) => {
            const url = new URL(x.href, "http://unuded.org");

            if (url.pathname !== path) return -1;

            if (url.searchParams.size === 0 && searchParams.size === 0)
                return Infinity;

            let value = 0;

            let isEveryEqual = true;
            Array.from(url.searchParams.entries()).forEach(([key, value]) => {
                if (searchParams.get(key) === value) {
                    value += 1;
                } else {
                    isEveryEqual = false;
                }
            });

            if (isEveryEqual) return -1;

            return value;
        })
        .map((value, idx) => ({ value, idx }))
        .sort((a, b) => a.value - b.value)
        .pop()!.idx;

    return (
        <nav className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
            {props.links.map((x, i) => (
                <Link
                    key={x.href}
                    href={x.href}
                    className={cx(
                        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                        activeIdx === i &&
                            "bg-background text-foreground shadow-sm",
                    )}
                >
                    {x.label}
                </Link>
            ))}
        </nav>
    );
};
