import type { User } from "@/shared/user.module/user.module";
import { gameModule } from "../create-game.module/create-game.module";
import { Text, View, Button, styled } from "tamagui";
import { pickRoleModule } from "./prick-role.module";
import { useState } from "react";

const MAX_AMOUNT_UNDELINECARDS = 10;

export function UsersCards() {
    const users = gameModule.variables.users();

    const [activeCardIdx, setActiveCardIdx] = useState(0);

    const moveToNextCard = () => {
        const lastIdx = users.length - 1;
        if (activeCardIdx === lastIdx) {
            return;
        }
        setActiveCardIdx((prev) => prev + 1);
    };

    return (
        <View
            height={"80%"}
            alignSelf="center"
            position="relative"
            width={"80%"}
            alignItems="center"
            justifyContent="center"
        >
            <ActiveUserCard
                onMoveToNextCard={moveToNextCard}
                user={users[activeCardIdx]}
            />
            {users
                .slice(
                    activeCardIdx + 1,
                    Math.min(users.length, MAX_AMOUNT_UNDELINECARDS)
                )
                .map((user, i) => (
                    <UnderlineCards
                        zIndex={-(i+1)}
                        top={(i + 1) * 10}
                        left={(i + 1) * 10}
                        key={user.name}
                    />
                ))}
        </View>
    );
}
const UnderlineCards = styled(View, {
    height: "100%",
    width: "100%",

    background: "transparent",
    backgroundColor: "$black9",
    borderWidth: "$1",
    borderRadius: "$4",
    position: "absolute",
    borderStyle: "solid",
    borderColor: "$black5",
});

enum ActiveCardStates {
    showUserName = "showUserName",
    showUserRole = "showUserRole",
}

type ActiveUserCardProps = {
    user: User;
    onMoveToNextCard: () => void;
};

export function ActiveUserCard(props: ActiveUserCardProps) {
    const [cardState, setCardState] = useState<ActiveCardStates>(
        ActiveCardStates.showUserName
    );

    const moveToNextState = () => {
        if (cardState === ActiveCardStates.showUserRole) {
            props.onMoveToNextCard();
            setCardState(ActiveCardStates.showUserName);
            return;
        }
        setCardState(ActiveCardStates.showUserRole);
    };
    return (
        <Button
            backgroundColor={"$black2"}
            borderColor={"$black8"}
            height={"100%"}
            width={"100%"}
            alignItems="center"
            justifyContent="center"
            onPress={moveToNextState}
        >
            {cardState === ActiveCardStates.showUserName ? (
                <Text>{props.user.name}</Text>
            ) : null}
            {cardState === ActiveCardStates.showUserRole ? (
                <ShowUserRole user={props.user} />
            ) : null}
        </Button>
    );
}

function ShowUserRole(props: { user: User }) {
    const isImposter = pickRoleModule.methods.isUserImposter(props.user);
    return (
        <Text>{isImposter ? "You are the spy" : "You are not the spy"}</Text>
    );
}
