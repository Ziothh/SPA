"use server";

import SuperJSON from "superjson";
import { inspect } from "util";

export const action_testSuperJSON = async (data: unknown) => {
    console.debug("Action received:", inspect(data, false, null, true));

    return data;
};
