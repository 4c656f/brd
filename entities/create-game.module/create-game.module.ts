/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";

type User = {
    name: string;
};

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
