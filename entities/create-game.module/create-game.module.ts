import type { User } from "@/shared/user.module/user.module";
import { router } from "expo-router";
import { create } from "zustand";

type ActiveUsersState = {
    users: User[];
};

type ActiveUsersActions = {
    addUser: (userName: User["name"]) => void;
    deleteUser: (userName: User) => void;
};

const useActiveUsersStore = create<ActiveUsersState & ActiveUsersActions>(
    (set) => ({
        users: [],
        addUser: (userName) =>
            set((state) => ({ users: [...state.users, { name: userName }] })),
        deleteUser: (userToDelete) =>
            set((state) => ({
                users: state.users.filter(
                    (user) => user.name !== userToDelete.name
                ),
            })),
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

    const deleteUser = () => {
        const setter = useActiveUsersStore((sel) => sel.deleteUser);
        return setter;
    };

    const isGameStartable = () => {
        const activeUsers = useActiveUsersStore((sel) => sel.users);
        return () => activeUsers.length > 0;
    };

    const startRolePick = () => {
        router.push("role-pick");
    };

    return {
        variables: {
            users: () => useActiveUsersStore((sel) => sel.users),
        },
        methods: {
            addUser: addUser,
            deleteUser: deleteUser,
            isGameStartable: isGameStartable,
            startRolePick: startRolePick,
        },
    };
};

export const gameModule = createGameModule();
