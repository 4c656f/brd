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
    return {
        variables: {
            users: () => useActiveUsersStore((sel) => sel.users),
        },
        methods: {
            addUser: () => useActiveUsersStore((sel) => sel.addUser),
        },
    };
};

export const gameModule = createGameModule();
