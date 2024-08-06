import { gameModule } from "@/entities/create-game.module/create-game.module";
import { pickRoleModule } from "@/entities/pick-role.module/prick-role.module";
import { UsersCards } from "@/entities/pick-role.module/UsersCards";
import { useEffect } from "react";
import { YStack, Text } from "tamagui";

export default function Index() {
    const activeUsers = gameModule.variables.users();
    const pickRandomImposters = pickRoleModule.methods.pickRandomImposters();
    
    useEffect(() => {
        pickRandomImposters(activeUsers, 1);
    }, []);
    
    return (
        <YStack
          flex={1}
          alignItems="center"
          justifyContent="center"
        >
            <UsersCards/>
        </YStack>
    );
}
