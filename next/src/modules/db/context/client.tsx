"use client";

import type { ColumnBaseConfig } from "drizzle-orm";
import type { SQLiteColumn, SQLiteTable } from "drizzle-orm/sqlite-core";
import type { db } from "~/server/db";
import { createContext } from "react";

export type DBContext = {
    enumValues: {
        [Table in keyof typeof db as (typeof db)[Table] extends SQLiteTable<any>
            ? Table
            : never]: {
            [Column in keyof (typeof db)[Table] as (typeof db)[Table][Column] extends SQLiteColumn<
                ColumnBaseConfig<any, any> & {
                    enumValues: infer EnumValues extends string[];
                }
            >
                ? [string, ...string[]] extends EnumValues
                    ? never
                    : Column
                : never]: (typeof db)[Table][Column] extends SQLiteColumn<
                ColumnBaseConfig<any, any> & {
                    enumValues: infer EnumValues;
                }
            >
                ? EnumValues
                : never;
        };
    };
};

export const DBContext = createContext<DBContext>(null!);

export const DBContextProvider: React.FC<
    React.PropsWithChildren<DBContext>
> = ({ children, ...props }) => (
    <DBContext.Provider value={props}>{children}</DBContext.Provider>
);
