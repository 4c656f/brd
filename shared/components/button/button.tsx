import Spacing from "@/constants/Spacing";
import { useThemeColor } from "@/hooks/useThemeColor";
import type { SpacingKeys } from "@/shared/types/spacing";
import { Pressable, type PressableProps, StyleSheet, Text } from "react-native";

type ButtonVariants = "default";
type StyledButtonProps = {
    variant?: ButtonVariants;
    size?: SpacingKeys;
    title?: string;
} & PressableProps;

export const ThemedButton = (props: StyledButtonProps) => {
    const { variant, style, size } = props;
    const bgColor = useThemeColor({}, "background");
    return (
        <Pressable
            style={[
                { backgroundColor: bgColor },
                styles[variant || "default"],
                styles[size || "md"],
                style,
            ]}
            {...props}
        >
            <Text>{props.title}</Text>
        </Pressable>
    );
};
const styles = StyleSheet.create({
    default: {
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
