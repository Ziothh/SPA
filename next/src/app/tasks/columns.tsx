"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "~/components/shadcn/ui/dropdown-menu";
import { Button } from "~/components/shadcn/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "~/components/shadcn/ui/checkbox";
import {
    DataTableColumnHeader,
    DataTableSettingsHeader,
} from "~/components/DataTable/DataTable.ColumnHeader";
import type { db } from "~/server/db";
import { action_task_delete, action_task_update } from "./actions";
import { use } from "react";
import { DBContext } from "~/modules/db/context/client";

export const TASK_TABLE_COLUMNS: ColumnDef<typeof db.tasks.$inferSelect>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column}>ID</DataTableColumnHeader>
        ),
    },
    {
        accessorKey: "title",
        header: ({ column }) => (
            <DataTableColumnHeader column={column}>Title</DataTableColumnHeader>
        ),
    },
    {
        accessorKey: "status",
        // header: 'Status',
        cell: (props) => (
            <select
                className="text-black"
                onChange={async (event) =>
                    action_task_update(props.cell.row.original, {
                        status: event.currentTarget.value as any,
                    })
                }
            >
                {use(DBContext).enumValues.tasks.status.map((status) => (
                    <option key={status} value={status}>
                        {status}
                    </option>
                ))}
            </select>
        ),
    },
    {
        accessorKey: "label",
        header: "Label",
    },
    {
        accessorKey: "priority",
        header: "Label",
    },
    {
        id: "actions",
        header: DataTableSettingsHeader,
        cell: ({ row }) => {
            const task = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            title="Open menu"
                            variant="ghost"
                            className="h-8 w-8 flex-shrink-0 p-0"
                        >
                            <MoreHorizontal className="h-4 w-4 flex-shrink-0" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(
                                    task.id.toString(),
                                )
                            }
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>
                            View payment details
                        </DropdownMenuItem>

                        <form action={() => action_task_delete(task)}>
                            <Button type="submit">Delete</Button>
                        </form>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
