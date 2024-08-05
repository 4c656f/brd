import Spacing from "@/constants/Spacing";
import { gameModule } from "@/entities/create-game.module/create-game.module";

import { useState } from "react";
import { StyleSheet, Text } from "react-native";
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
            h={''}
            borderWidth={2}
            borderColor="$color"
            borderRadius="$4"
            padding="$2"
        >
            <Input
                style={styles.textInput}
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

const styles = StyleSheet.create({
    textInput: {
        width: "100%",
        height: 40,
        borderWidth: 1,
        borderColor: "black",
        paddingHorizontal: Spacing.p.md,
    },
});
