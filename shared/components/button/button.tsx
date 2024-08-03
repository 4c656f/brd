import Spacing from "@/constants/Spacing";
import { useThemeColor } from "@/hooks/useThemeColor";
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
    const bgColor = useThemeColor({}, "background");
    const btnStore = useButtonStore();

    const getStyle: (
        state: PressableStateCallbackType
    ) => StyleProp<ViewStyle> = (state) => {
        btnStore.setIsPressed(state.pressed);
        return [
            { backgroundColor: bgColor },
            buttonStyles[variant || "default"],
            state.pressed ? buttonStyles[`${variant || "default"}Hover`] : {},
            buttonStyles[size || "md"],
            typeof style === "function" ? style(state) : style,
        ];
    };

    return (
        <ButtonContext.Provider value={btnStore}>
            <Pressable style={getStyle} {...props}>
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
    const { children } = props;

    const ctx = useNonNullableContext(ButtonContext);

    return <Text style={[buttonTextStyles.default]}>{children}</Text>;
};

const buttonStyles = StyleSheet.create({
    default: {
        height: 40,
        borderWidth: 1,
        borderColor: "black",
    },
    defaultHover: {
        height: 40,
        borderWidth: 1,
        borderColor: "black",
    },
    sm: {
        paddingHorizontal: Spacing.p.sm,
    },
    md: {
        paddingHorizontal: Spacing.p.md,
    },
    lg: {
        paddingHorizontal: Spacing.p.lg,
    },
});

const buttonTextStyles = StyleSheet.create({
    default: {
        height: 40,
        borderWidth: 1,
        borderColor: "black",
    },
    defaultHover: {
        height: 40,
        borderWidth: 1,
        borderColor: "black",
    },
    sm: {},
    md: {},
    lg: {},
});
