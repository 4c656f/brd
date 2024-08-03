import Colors from "@/constants/Colors";
import Spacing from "@/constants/Spacing";
import type { SpacingKeys } from "@/shared/types/spacing";
import { TextInput, type TextInputProps, StyleSheet } from "react-native";
type InputVariants = "default";
type InputProps = {
    variant?: InputVariants;
    size?: SpacingKeys;
} & TextInputProps;

export const ThemedInput = (props: InputProps) => {
    const { variant, size, style, ...rest } = props;

    return (
        <TextInput
            style={[
                inputStyles.base,
                inputStyles[variant || "default"],
                inputStyles[size || "md"],
                style,
            ]}
            {...rest}
        />
    );
};

const inputStyles = StyleSheet.create({
    base: {
        borderRadius: 10,
    },
    default: {
        backgroundColor: Colors.dark.background,
        color: 'white'
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
        paddingVertical: Spacing.p.sm,
    },
    lg: {
        paddingHorizontal: Spacing.p.lg,
        paddingVertical: Spacing.p.sm,
    },
});
