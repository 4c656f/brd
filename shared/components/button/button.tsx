import Colors from "@/constants/Colors";
import Spacing from "@/constants/Spacing";
import { useNonNullableContext } from "@/shared/helpers/context";
import type { SpacingKeys } from "@/shared/types/spacing";
import { createContext, useState } from "react";
import {
    Pressable,
    type PressableProps,
    StyleSheet,
    Text,
    type TextProps,
    type PressableStateCallbackType,
    type StyleProp,
    type ViewStyle,
} from "react-native";

type ButtonVariants = "default";

type StyledButtonProps = {
    variant?: ButtonVariants;
    size?: SpacingKeys;
    title?: string;
} & PressableProps;

type ButtonState = {
    pressed: boolean;
};

const ButtonContext = createContext<ReturnType<typeof useButtonStore> | null>(
    null
);

const useButtonStore = () => {
    const [btnState, setBtnState] = useState<ButtonState>({ pressed: false });

    const setIsPressed = (isPressed: boolean) => {
        setBtnState((prev) => ({ ...prev, pressed: isPressed }));
    };

    const getIsPressed = () => {
        return btnState.pressed;
    };

    return {
        btnState,
        setBtnState,
        setIsPressed,
        getIsPressed,
    };
};

export const ThemedButton = (props: StyledButtonProps) => {
    const { variant, style, size, children } = props;
    const btnStore = useButtonStore();

    const getStyle: (
        state: PressableStateCallbackType
    ) => StyleProp<ViewStyle> = (state) => {
        return [
            buttonStyles.base,
            buttonStyles[variant || "default"],
            state.pressed ? buttonStyles[`${variant || "default"}Hover`] : {},
            buttonStyles[size || "md"],
            typeof style === "function" ? style(state) : style,
        ];
    };

    return (
        <ButtonContext.Provider value={btnStore}>
            <Pressable
                onPressIn={() => btnStore.setIsPressed(true)}
                onPressOut={() => btnStore.setIsPressed(false)}
                style={getStyle}
                {...props}
            >
                {children}
            </Pressable>
        </ButtonContext.Provider>
    );
};
type StyledTextProps = {
    variant?: ButtonVariants;
    size?: SpacingKeys;
} & TextProps;

export const ThemedButtonText = (props: StyledTextProps) => {
    const { children, variant, style, ...rest } = props;

    const ctx = useNonNullableContext(ButtonContext);

    return (
        <Text
            style={[
                buttonTextStyles[variant || "default"],
                ctx.getIsPressed()
                    ? buttonTextStyles[`${variant || "default"}Hover`]
                    : {},
                style,
            ]}
            {...rest}
        >
            {children}
        </Text>
    );
};

const buttonStyles = StyleSheet.create({
    base: {
        borderRadius: 10,
        // flex: 1,
    },
    default: {
        backgroundColor: Colors.dark.background,
    },
    defaultHover: {
        backgroundColor: Colors.dark.backgroundActive,
    },
    sm: {
        paddingHorizontal: Spacing.p.sm,
        paddingVertical: Spacing.p.sm,
    },
    md: {
        paddingHorizontal: Spacing.p.md,
        paddingVertical: Spacing.p.md,
    },
    lg: {
        paddingHorizontal: Spacing.p.lg,
        paddingVertical: Spacing.p.lg,
    },
});

const buttonTextStyles = StyleSheet.create({
    default: {
        color: Colors.dark.textPrimary,
    },
    defaultHover: {},
    sm: {},
    md: {},
    lg: {},
});
