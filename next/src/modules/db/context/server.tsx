import "server-only";

import { db } from "~/server/db";
import { DBContext } from "./client";
import { SQLiteColumn, SQLiteTable } from "drizzle-orm/sqlite-core";

export function getDBContextServerValues(): DBContext {
    return {
        enumValues: (() => {
            const enumsValues: Record<string, Record<string, string[]>> = {};

            for (const [tableName, tableValue] of Object.entries(db)) {
                if (!(tableValue instanceof SQLiteTable)) {
                    continue;
                }

                enumsValues[tableName] = {};

                for (const [columnName, columnValue] of Object.entries(
                    tableValue,
                )) {
                    if (!(columnValue instanceof SQLiteColumn)) {
                        continue;
                    }
                    if (
                        Array.isArray(columnValue.enumValues) &&
                        columnValue.enumValues.length > 0
                    ) {
                        enumsValues[tableName][columnName] =
                            columnValue.enumValues as string[];
                    }
                }
            }

            return enumsValues as DBContext["enumValues"];
        })(),
    };
}

