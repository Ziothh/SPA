"use client";

import { Button } from "~/components/shadcn/ui/button";
import { action_testSuperJSON } from "./actions";

const Page: React.FC = (_props) => {
    return (
        <Button
            onClick={async () => {
                console.debug(
                    "Action returned:",
                    await action_testSuperJSON({
                        hello: "world",
                        foo: ["bar", "baz"],
                        sentAt: new Date(),
                    }),
                );
            }}
        >
            Click me!
        </Button>
    );
};

export default Page;
