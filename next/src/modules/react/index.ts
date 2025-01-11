import { useMemo, useState } from "react";

export function useStateObject<T>(initialState: T | (() => T)) {
    const [value, setValue] = useState(initialState);

    return useMemo(
        () =>
            ({
                value,
                setValue,
            }) as const,
        [value],
    );
}
