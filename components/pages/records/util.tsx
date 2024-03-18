import AsyncStorage from "@react-native-async-storage/async-storage"
import { Record } from "./type"

export async function setRecords(data: Record[]) {
    await AsyncStorage.setItem("records", JSON.stringify(data))
}

export async function getRecords(): Promise<Record[]> {
    const data = await AsyncStorage.getItem("records")
    if (!data) {
        return []
    }
    try {
        const arr = JSON.parse(data)
        return arr
    } catch (e) {
        console.log(e)
        return []
    }
}