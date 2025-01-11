import type { Column } from "@tanstack/react-table";
import {
    ArrowDown,
    ArrowUp,
    ArrowUpDown,
    ChevronsUpDown,
    EyeOff,
} from "lucide-react";
import { cx } from "class-variance-authority";
import { Button } from "~/components/shadcn/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "~/components/shadcn/ui/dropdown-menu";

export function DataTableColumnHeader<TData, TValue>(
    props: Pick<
        React.HTMLAttributes<HTMLDivElement>,
        "children" | "className"
    > & {
        column: Column<TData, TValue>;
    },
) {
    if (!props.column.getCanSort()) {
        return <div className={cx(props.className)}>{props.children}</div>;
    }

    const sortDirection = props.column.getIsSorted();
    const SortIcon = (() => {
        switch (sortDirection) {
            case false:
                return ArrowUpDown;
            case "asc":
                return ArrowUp;
            case "desc":
                return ArrowDown;
        }
    })();

    return (
        <div className={cx("flex items-center space-x-2", props.className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="-ml-3 h-8 data-[state=open]:bg-accent"
                    >
                        <span>{props.children}</span>
                        <SortIcon
                            className={cx(
                                "ml-2 h-4 w-4",
                                sortDirection !== false &&
                                    "text-primary-foreground",
                            )}
                        />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem
                        onClick={() => sortDirection === "asc"
                            ? props.column.clearSorting()
                            : props.column.toggleSorting(false)
                        } // prettier-ignore
                    >
                        <ArrowUp
                            className={cx(
                                "mr-2 h-3.5 w-3.5",
                                sortDirection !== "asc" &&
                                    "text-muted-foreground/70",
                            )}
                        />
                        Asc
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => sortDirection === "desc"
                            ? props.column.clearSorting()
                            : props.column.toggleSorting(true)
                        } // prettier-ignore
                    >
                        <ArrowDown
                            className={cx(
                                "mr-2 h-3.5 w-3.5",
                                sortDirection !== "desc" &&
                                    "text-muted-foreground/70",
                            )}
                        />
                        Desc
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => props.column.toggleVisibility(false)}
                    >
                        <EyeOff className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Hide
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
