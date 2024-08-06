import { getRandomItems } from "@/shared/helpers/array";
import { User } from "@/shared/user.module/user.module";
import { create } from "zustand";

type ImposterUsersState = {
    imposters: User[];
};

type ImposterUsersAction = {
    pickRandomImposters: (users: User[], n: number) => void;
};

const useImposterUserStore = create<ImposterUsersState & ImposterUsersAction>(
    (set) => ({
        imposters: [],
        pickRandomImposters: (users, n) =>
            set(() => ({ imposters: getRandomItems(users, n) })),
    })
);

const createPickRoleModule = () => {
    const isUserImposter = (user: User) => {
        const imposters = useImposterUserStore((sel) => sel.imposters);
        return imposters.some((imp) => imp.name === user.name);
    };

    const pickRandomImposters = () => {
        const pick = useImposterUserStore((sel) => sel.pickRandomImposters);
        return pick;
    };
    const startGame = () => {};
    return {
        variables: {},
        methods: {
            isUserImposter: isUserImposter,
            pickRandomImposters: pickRandomImposters,
            startGame: startGame,
        },
    };
};

export const pickRoleModule = createPickRoleModule();
