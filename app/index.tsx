import { gameModule } from "@/entities/create-game.module/create-game.module";

import { useState } from "react";
import { Text } from "react-native";
import { Button, Input, YStack } from "tamagui";
export default function Index() {
    const [userName, setUserName] = useState("");
    const addUser = gameModule.methods.addUser();

    const handleAddUser = () => {
        addUser(userName);
    };

    return (
        <YStack
            flex={1}
            alignItems="center"
            justifyContent="center"
            height={"100%"}
            width={"100%"}
            padding={"$2"}
            gap={"$2"}
            backgroundColor={"$black1"}
            borderRadius="$4"
        >
            <Input
                width={'100%'}
                value={userName}
                onChangeText={(text) => setUserName(text)}
            />
            <Button onPress={handleAddUser}>Add user</Button>
            {gameModule.variables.users().map((user) => (
                <Text key={user.name}>{user.name}</Text>
            ))}
        </YStack>
    );
}
