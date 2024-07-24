import { gameModule } from "@/entities/create-game.module/create-game.module";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
    const [userName, setUserName] = useState("");
    const addUser = gameModule.methods.addUser()
    const handleAddUser = () => {
        addUser(userName);
    };

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
            }}
        >
            <TextInput
                style={styles.textInput}
                value={userName}
                onChangeText={(text) => setUserName(text)}
            />
            <Button title={"Add user"} onPress={handleAddUser} />
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
        paddingHorizontal: 20,
    },
});