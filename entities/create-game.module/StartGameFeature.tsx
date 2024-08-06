import { Button } from "tamagui";
import { gameModule } from "./create-game.module";

export function StartGameBtn() {
    const isGameStartable = gameModule.methods.isGameStartable();
    return (
        <Button
            disabled={!isGameStartable()}
            opacity={isGameStartable() ? 1 : 0.5}
            onPress={gameModule.methods.startRolePick}
        >
            Start
        </Button>
    );
}
