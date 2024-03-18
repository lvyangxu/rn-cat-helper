import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pet } from './type';

export async function setPets(data: Pet[]) {
    await AsyncStorage.setItem("pets", JSON.stringify(data))
}

export async function getPets(): Promise<Pet[]> {
    const data = await AsyncStorage.getItem("pets")
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




