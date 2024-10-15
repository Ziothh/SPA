import { db } from "~/server/db";
import { faker } from "@faker-js/faker";

const __Page: React.FC<{}> = async (props) => {
    const tasks = await db.client.select().from(db.tasks);
    return <pre>{JSON.stringify(tasks, null, 4)}</pre>;
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
