import { Text, View } from "react-native"

export function BottomManage(props: {
    value: boolean
    onChange: (v: boolean) => void
}) {
    const { value, onChange } = props
    return <View style={{ position: 'absolute', bottom: 0, width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", padding: 10, backgroundColor: "lightblue" }}>
        <Text style={{ width: "100%", textAlign: 'center' }} onPress={() => {
            onChange(!value)
        }}>{!value ? "管理" : "完成"}</Text>
    </View>
}