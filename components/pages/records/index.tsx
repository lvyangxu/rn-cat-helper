import React from "react";
import { Context } from "../../context/context";
import { ScrollView, Text, View } from "react-native";
import { BottomSheet, Button, CheckBox, Divider, Icon, ListItem } from "@rneui/themed";
import { PetIcon } from "../../common/pet-icon";
import { RecordTypeData } from "../home/data";
import XDate from "xdate";
import { Record } from './type'
import { assign, cloneDeep, merge } from "lodash";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { getAutoIncrId } from "../../common/util";
import { Calendar } from "react-native-calendars";
import { RecordRow } from "../../common/record-row";

const today = new XDate().toString("yyyy-MM-dd")

export function Records() {
    const { state, dispatch } = React.useContext(Context)
    const { recordData, petData } = state
    const [newRecord, setNewRecord] = React.useState<Record>({ recordId: 0, petId: 0, day: today, type: [] })
    const [petVisible, setPetVisible] = React.useState(false)
    const [typeVisible, setTypeVisible] = React.useState(false)
    const [dayVisible, setDayVisible] = React.useState(false)
    function setNewRecordData(data: Partial<Record>) {
        let newData = cloneDeep(newRecord)
        newData = assign(newData, data)
        setNewRecord(newData)
    }
    const newRecordPet = petData.find(d1 => d1.id === newRecord.petId)

    return <View>
        <ScrollView style={{ height: "100%" }} >
            {
                recordData.map(d => {
                    return <RecordRow key={d.recordId} value={d} onDelete={() => {
                        let newData = cloneDeep(recordData)
                        newData = newData.filter(d1 => d1.recordId !== d.recordId)
                        dispatch({ type: "SET_DATA", id: "recordData", value: newData })
                    }} />
                })
            }
            <Divider />
            <ListItem key={0}>
                <PetIcon icon={newRecordPet?.icon} onPress={() => {
                    setPetVisible(true)
                }} />
                <ListItem.Content>
                    <ListItem.Title onPress={() => {
                        setDayVisible(true)
                    }}>
                        {newRecord.day}
                    </ListItem.Title>
                    <ListItem.Subtitle onPress={() => {
                        setTypeVisible(true)
                    }}>
                        {
                            newRecord.type.length === 0 ? "未设置类型" : newRecord.type.map(d1 => {
                                const find = RecordTypeData.find(d2 => d2.id === d1)
                                return find === undefined ? d1 : find.name
                            }).join(",")
                        }
                    </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Content style={{ flex: undefined }}>
                    <Button disabled={newRecord.petId == 0 || newRecord.type.length === 0} onPress={() => {
                        const newId = getAutoIncrId(recordData.map(d => d.recordId))
                        const newData = cloneDeep(recordData)
                        newData.push({
                            recordId: newId,
                            petId: newRecord.petId,
                            day: newRecord.day,
                            type: newRecord.type
                        })
                        dispatch({ type: "SET_DATA", id: "recordData", value: newData })
                        setNewRecordData({
                            petId: 0,
                            type: [],
                        })
                    }}>添加</Button>
                </ListItem.Content>
            </ListItem>
            <BottomSheet isVisible={typeVisible}>
                {
                    RecordTypeData.map(d => {
                        const checked = newRecord.type.includes(d.id)
                        return <ListItem key={d.id}>
                            <ListItem.Content>
                                <ListItem.Subtitle>
                                    <CheckBox
                                        checked={checked}
                                        onPress={() => {
                                            let newType = cloneDeep(newRecord.type)

                                            if (checked) {
                                                newType = newType.filter(d1 => d1 !== d.id)
                                            } else {
                                                if (!newType.includes(d.id)) {
                                                    newType.push(d.id)
                                                }

                                            }
                                            setNewRecordData({
                                                type: newType
                                            })
                                        }}
                                        title={d.name}
                                        iconType="material"
                                        checkedIcon="check-box"
                                        uncheckedIcon="check-box-outline-blank"
                                    />
                                </ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    })

                }
                <ListItem>
                    <ListItem.Content>
                        <ListItem.Title style={{ textAlign: "center", width: "100%" }} onPress={() => {
                            setTypeVisible(false)
                        }}>完成</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            </BottomSheet>
            <BottomSheet isVisible={petVisible}>
                {
                    petData.map(d => {
                        const checked = newRecord.type.includes(d.id)
                        return <ListItem key={d.id}>
                            <ListItem.Content>
                                <PetIcon icon={d.icon} onPress={() => {
                                    setNewRecordData({ petId: d.id })
                                    setPetVisible(false)
                                }} />
                            </ListItem.Content>
                        </ListItem>
                    })

                }
                <ListItem>
                    <ListItem.Content>
                        <ListItem.Title style={{ textAlign: "center", width: "100%" }} onPress={() => {
                            setPetVisible(false)
                        }}>完成</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            </BottomSheet>
            <BottomSheet isVisible={dayVisible}>

                <Calendar date={newRecord.day} onDayPress={(date) => {
                    setNewRecordData({ day: date.dateString })
                    setDayVisible(false)
                }} />
            </BottomSheet>
        </ScrollView>
    </View >
}