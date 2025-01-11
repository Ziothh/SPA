"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "~/server/db";

function whereTask(task: Pick<typeof db.tasks.$inferSelect, "id">) {
    return eq(db.tasks.id, task.id);
}

export async function action_task_delete(
    task: Pick<typeof db.tasks.$inferSelect, "id">,
) {
    const [deleted] = await db.client
        .delete(db.tasks)
        .where(whereTask(task))
        .returning();

    console.debug({ deleted });

    revalidatePath("/tasks", "page");

    return deleted;
}

export async function action_task_update(
    task: Pick<typeof db.tasks.$inferSelect, "id">,
    newData: Partial<Omit<typeof db.tasks.$inferInsert, "id">>,
) {
    const [updated] = await db.client
        .update(db.tasks)
        .set(newData)
        .where(whereTask(task))
        .returning();

    console.debug({ updated });

    revalidatePath("/tasks", "page");

    return updated;
}
