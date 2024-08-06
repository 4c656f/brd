import { gameModule } from "@/entities/create-game.module/create-game.module";
import { SelectedUserList } from "@/entities/create-game.module/SelectedUserList";
import { StartGameBtn } from "@/entities/create-game.module/StartGameFeature";

import { useState } from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
} from "react-native";
import { Button, Input, styled, YStack } from "tamagui";

const InputContainer = styled(KeyboardAvoidingView, {
    width: "100%",
});

export default function Index() {
    const [userName, setUserName] = useState("");
    const addUser = gameModule.methods.addUser();

    const clearInput = () => {
        setUserName("");
    };

    const handleAddUser = () => {
        addUser(userName);
        clearInput();
    };

    return (
        <TouchableWithoutFeedback
            style={{ flex: 1 }}
            onPress={Keyboard.dismiss}
            accessible={false}
        >
            <YStack
                flex={1}
                alignItems="center"
                justifyContent="center"
                padding={"$2"}
                gap={"$2"}
                backgroundColor={"$black1"}
                borderRadius="$4"
            >
                <InputContainer
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <Input
                        width={"100%"}
                        value={userName}
                        onChangeText={(text) => setUserName(text)}
                    />
                </InputContainer>
                <Button onPress={handleAddUser}>Add user</Button>
                {gameModule.variables.users().length > 0 ? (
                    <SelectedUserList />
                ) : null}
                <StartGameBtn />
            </YStack>
        </TouchableWithoutFeedback>
    );
}
