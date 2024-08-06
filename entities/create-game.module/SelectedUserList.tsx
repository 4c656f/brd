import { XStack, YStack, Text, Button } from "tamagui";
import { gameModule } from "./create-game.module";
import type { User } from "@/shared/user.module/user.module";

export function SelectedUserList() {
    return (
        <YStack
            alignItems="flex-start"
            padding="$4"
            width={"100%"}
            justifyContent="flex-start"
            gap={"$2"}
        >
            <Text fontWeight={"$5"} fontSize={"$5"}>
                Added users:
            </Text>
            <YStack
                paddingVertical="$4"
                alignItems="center"
                borderRadius={"$4"}
                backgroundColor={"$black2"}
                width={"100%"}
                justifyContent="center"
                gap={"$2"}
            >
                {gameModule.variables.users().map((user) => (
                    <UserItem key={user.name} {...user} />
                ))}
            </YStack>
        </YStack>
    );
}

function UserItem(props: User) {
    return (
        <XStack alignItems="center" justifyContent="center" gap={"$2"}>
            <Text>{props.name}</Text>
            <DeleteUserBtn {...props} />
        </XStack>
    );
}

export function DeleteUserBtn(props: User) {
    const deleteUser = gameModule.methods.deleteUser();
    const handleDeleteuser = () => {
        deleteUser(props);
    };
    return (
        <Button size={"$2"} onPress={handleDeleteuser}>
            remove
        </Button>
    );
}
