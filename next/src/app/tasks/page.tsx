import { db } from "~/server/db";
import { faker } from "@faker-js/faker";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { Button } from "~/components/shadcn/ui/button";
import { DataTable } from "~/components/DataTable";
import { TASK_TABLE_COLUMNS } from "./columns";

const __Page: React.FC<{}> = async (_props) => {
    const tasks = await db.client
        .select()
        .from(db.tasks)
        .orderBy(desc(db.tasks.id));

    return (
        <div className="flex flex-col gap-10">
            <form
                className="flex flex-col gap-4 rounded-md border border-white"
                action={async (form) => {
                    "use server";

                    const title = form.get("title")?.toString() ?? null;

                    if (!title) {
                        throw new Error("Task name should not be empty");
                    }

                    const [newTask] = await db.client
                        .insert(db.tasks)
                        .values({
                            title,
                            status: "TODO",
                            label: "BUG",
                            priority: "MEDIUM",
                        })
                        .returning();

                    console.debug({ newTask });
                    revalidatePath("/");

                    return newTask;
                }}
            >
                <legend>Add a new task</legend>

                <label>
                    Task title
                    <input name="title" className="text-black" />
                </label>

                <button className="w-fit">Submit</button>
            </form>

            <DataTable
                data={tasks}
                columns={TASK_TABLE_COLUMNS}
                searchable="title"
            />

            <table>
                <thead>
                    <tr>
                        <th className="text-left">ID</th>
                        <th>Title</th>
                        <th>Label</th>
                        <th>Priority</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id} className="[&>td]:p-2">
                            <td className="text-left">{task.id}</td>
                            <td>{task.title}</td>
                            <td>{task.label}</td>
                            <td>{task.priority}</td>
                            <td>
                                <select
                                    className="text-black"
                                    onChange={async (event) => {
                                        "use server";

                                        db.client
                                            .update(db.tasks)
                                            .set({
                                                status: event.currentTarget
                                                    .value as any,
                                            })
                                            .where(eq(db.tasks.id, task.id));
                                    }}
                                >
                                    {db.tasks.status.enumValues.map(
                                        (status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ),
                                    )}
                                </select>

                                <form
                                    action={async () => {
                                        "use server";

                                        const [deleted] = await db.client
                                            .delete(db.tasks)
                                            .where(eq(db.tasks.id, task.id))
                                            .returning();

                                        console.debug({ deleted });

                                        revalidatePath("/tasks", "page");

                                        return deleted;
                                    }}
                                >
                                    <Button type="submit">Delete</Button>
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default __Page;

async function __seedTasks() {
    await db.client.insert(db.tasks).values(
        Array.from({ length: 100 }, () => ({
            // id: `TASK-${faker.number.int({ min: 1000, max: 9999 })}`,
            title: faker.hacker
                .phrase()
                .replace(/^./, (letter) => letter.toUpperCase()),
            status: faker.helpers.arrayElement(db.tasks.status.enumValues),
            label: faker.helpers.arrayElement(db.tasks.label.enumValues),
            priority: faker.helpers.arrayElement(db.tasks.priority.enumValues),
        })),
    );
}
