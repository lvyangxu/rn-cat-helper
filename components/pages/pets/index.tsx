import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { cloneDeep } from 'lodash';
import { Context } from '../../context/context';
import { PetIcon } from '../../common/pet-icon';
import { getAutoIncrId } from '../../common/util';

export function Pets() {
    const { state, dispatch } = React.useContext(Context)
    const { petData, recordData } = state

    return <ScrollView style={{ height: "100%" }} >
        <View style={{ padding: 20, gap: 10, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
            {
                petData.map((d, i) => {
                    return <View key={i} style={{ paddingTop: 5, width: "30%", display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: 'center' }}>
                        <PetIcon icon={d.icon} />
                        <TextInput placeholder={'请输入名字'} style={{ width: "100%", textAlign: "center", fontSize: 12 }} value={d.name} onChangeText={v => {
                            let newData = cloneDeep(petData)
                            newData = newData.map((d1, j) => {
                                if (i === j) {
                                    d1.name = v
                                }
                                return d1
                            })
                            dispatch({ type: "SET_DATA", id: "petData", value: newData })
                        }} />
                        {
                            <Text style={{ position: "absolute", top: -5, right: 5, color: "red", fontWeight: "bold" }} onPress={() => {
                                let newData = cloneDeep(petData)
                                newData.splice(i, 1)
                                dispatch({ type: "SET_DATA", id: "petData", value: newData })
                                let newRecordData = cloneDeep(recordData)
                                newRecordData = newRecordData.filter(d1 => d1.petId !== d.id)
                                dispatch({ type: "SET_DATA", id: "recordData", value: newRecordData })
                            }}>X</Text>
                        }

                    </View>
                })
            }
            {
                <View key={0} style={{ paddingTop: 5, width: "30%", display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: 'flex-start' }}>
                    <View><PetIcon onPress={async () => {
                        try {
                            const img = await ImagePicker.openPicker({
                                width: 300,
                                height: 300,
                                cropping: true,
                                cropperCircleOverlay: true,
                                includeBase64: true,
                                mediaType: 'photo',
                            })
                            if (typeof img.data === "string") {
                                const newData = cloneDeep(petData)
                                const newId = getAutoIncrId(petData.map(d => d.id))
                                newData.push({ id: newId, name: "", icon: img.data })
                                dispatch({ type: "SET_DATA", id: "petData", value: newData })
                            }


                        } catch (e) {
                            console.log(e)
                        }
                    }} /></View>
                </View>
            }

        </View>
    </ScrollView>
}