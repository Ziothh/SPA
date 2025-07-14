"use client";

import {
    Table as TanstackTable,
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    RowData,
    RowModel,
    SortingState,
    useReactTable,
    VisibilityState,
    RowSelectionState,
} from "@tanstack/react-table";
import React from "react";
import { Button } from "~/components/shadcn/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/shadcn/ui/table";
import { useStateObject } from "~/modules/react";
import { Input } from "../shadcn/ui/input";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    searchable?: Extract<keyof TData, string>;
}

function useRowModelState<State>(
    initialState: State,
    getModelFn: <TData extends RowData>() => (
        table: TanstackTable<TData>,
    ) => () => RowModel<TData>,
) {
    const [state, setState] = React.useState<State>(initialState);

    return {
        state,
        setState,
        getModel: getModelFn(),
    };
}

export function DataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
    const sorting = useRowModelState<SortingState>([], getSortedRowModel);
    const columnFilters = useRowModelState<ColumnFiltersState>(
        [],
        getFilteredRowModel,
    );
    const columnVisibility = useStateObject<VisibilityState>({});
    const rowSelection = useStateObject<RowSelectionState>({});

    const table = useReactTable({
        data: props.data,
        columns: props.columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),

        onSortingChange: sorting.setState,
        getSortedRowModel: sorting.getModel,

        getFilteredRowModel: columnFilters.getModel,
        onColumnFiltersChange: columnFilters.setState,

        onColumnVisibilityChange: columnVisibility.setValue,

        onRowSelectionChange: rowSelection.setValue,

        state: {
            sorting: sorting.state,
            columnFilters: columnFilters.state,
            columnVisibility: columnVisibility.value,
            rowSelection: rowSelection.value,
        },
    });

    return (
        <section>
            {!!props.searchable?.length && (
                <header className="flex items-center py-4">
                    <Input
                        placeholder={`Filter ${props.searchable}...`}
                        value={
                            (table
                                .getColumn(props.searchable)
                                ?.getFilterValue() as string) ?? ""
                        }
                        onChange={(event) =>
                            table
                                .getColumn(props.searchable!)
                                ?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                </header>
            )}
            <main className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext(),
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={props.columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </main>
            <footer className="flex items-center justify-end space-x-2 py-4">
                <p className="mr-auto flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </p>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </footer>
        </section>
    );
}
