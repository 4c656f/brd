
type User = {
    name: string;
};

const createGameModule = () => {

    const users = <User[]>[];

    const addUser = (userName: string) => {
        users.push({ name: userName });
    };

    return {
        variables: {
            users,
        },
        methods: {
            addUser,
        },
    }
}


export const gameModule = createGameModule();
