import { faker } from "@faker-js/faker";

const PAYMENT_STATUS = ["pending", "processing", "success", "failed"] as const;

export type Payment = {
    id: string;
    amount: number;
    status: (typeof PAYMENT_STATUS)[number];
    email: string;
};

export const PAYMENTS: Payment[] = [
    {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    },
    {
        id: "489e1d42",
        amount: 125,
        status: "processing",
        email: "example@gmail.com",
    },
    ...new Array(18).fill(null).map<Payment>(() => ({
        id: faker.string.uuid().slice(0, 8),
        amount: faker.number.float({ min: 0, max: 10 ** 3 }),
        status: faker.helpers.arrayElement(PAYMENT_STATUS),
        email: faker.internet.email(),
    })),
];
