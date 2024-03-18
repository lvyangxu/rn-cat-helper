import { Text, TextProps } from "react-native";

export function Add(props: TextProps) {
    return <Text style={{ fontSize: 50 }} {...props}>+</Text>
}