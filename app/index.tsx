import Spacing from "@/constants/Spacing";
import { gameModule } from "@/entities/create-game.module/create-game.module";
import {
    ThemedButton,
    ThemedButtonText,
} from "@/shared/components/button/button";
import { ThemedInput } from "@/shared/components/input/input";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";
export default function Index() {
    const [userName, setUserName] = useState("");
    const addUser = gameModule.methods.addUser();
    
    const handleAddUser = () => {
        addUser(userName);
    };

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: Spacing.p.md,
                backgroundColor: 'black'
            }}
        >
            <ThemedInput
                style={styles.textInput}
                value={userName}
                onChangeText={(text) => setUserName(text)}
            />
            <ThemedButton onPress={handleAddUser}>
                <ThemedButtonText>Add User</ThemedButtonText>
            </ThemedButton>
            {gameModule.variables.users().map((user) => (
                <Text key={user.name}>{user.name}</Text>
            ))}
        </View>
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
