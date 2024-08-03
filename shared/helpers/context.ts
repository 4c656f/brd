import { useContext } from "react";

export const useNonNullableContext = <T>(
    ctx: React.Context<T>
): NonNullable<T> => {
    const val = useContext(ctx);
    if (val === null || val === undefined) {
        throw new TypeError(`Context ${ctx.displayName || ""} is nullable`);
    }
    return val;
};
