import type { User } from "@/shared/user.module/user.module";
import { create } from "zustand";

type ActiveUsersState = {
    users: User[];
};

type ActiveUsersActions = {
    addUser: (userName: User["name"]) => void;
};

const useActiveUsersStore = create<ActiveUsersState & ActiveUsersActions>(
    (set) => ({
        users: [],
        addUser: (userName) =>
            set((state) => ({ users: [...state.users, { name: userName }] })),
    })
);

const createGameModule = () => {
    const addUser = () => {
        const setter = useActiveUsersStore((sel) => sel.addUser);
        return (userName: string) => {
            if (!userName) {
                return;
            }
            setter(userName);
        };
    };

    return {
        variables: {
            users: () => useActiveUsersStore((sel) => sel.users),
        },
        methods: {
            addUser: addUser,
        },
    };
};

export const gameModule = createGameModule();
