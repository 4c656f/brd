import {Text, TextInput, View, StyleSheet, Button} from "react-native";
import {useState} from "react";
import {gameModule} from "@/entities/create-game.module/create-game.module";

export default function Index() {
    const [userName, setUserName] = useState("");

    const handleAddUser = () => {
        gameModule.methods.addUser(userName );
    }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
          padding: 20,
      }}
    >
    {gameModule.variables.users.map(user => <Text key={user.name}>{user.name}</Text>)}
    <TextInput style={styles.textInput} value={userName} onChangeText={text => setUserName(text) } />
    <Button title={'Add user'} onPress={handleAddUser} />
    </View>
  );
}


const styles = StyleSheet.create({
    textInput: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        paddingHorizontal: 20,
    }
})
