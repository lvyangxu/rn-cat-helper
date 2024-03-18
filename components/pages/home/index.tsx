import { cloneDeep } from "lodash";
import React from "react";
import { View } from "react-native";
import { Agenda, AgendaSchedule } from 'react-native-calendars'
import XDate from "xdate";
import { Context } from "../../context/context";
import { RecordRow } from "../../common/record-row";
import { RecordTypeData } from "./data";
import { Record } from "../records/type";
import { Button } from "@rneui/themed";

const today = new XDate().toString("yyyy-MM-dd")

export function Home() {
    const [items, setItems] = React.useState<AgendaSchedule>({ [today]: [] })
    const [selectedDay, setSelectedDay] = React.useState<string>(today)
    const { state, dispatch } = React.useContext(Context)
    const { petData, recordData } = state
    function buildEmptyItemData(day: string) {
        const newItem = cloneDeep(items)
        if (newItem?.[day]) {
            return
        }
        newItem[day] = []
        setItems(newItem)

    }



    const nextData = React.useMemo(() => {
        let data: Record[] = []
        petData.forEach(p => {
            const thisPetRecord: Record[] = []
            recordData.filter(r => r.petId === p.id).forEach(r => {
                r.type.forEach(t => {
                    thisPetRecord.push({ recordId: -1, petId: r.petId, day: r.day, type: [t] })
                })
            })
            if (thisPetRecord.length > 0) {
                thisPetRecord.sort((a, b) => {
                    if (a.day < b.day) {
                        return 1
                    }
                    if (a.day > b.day) {
                        return -1
                    }
                    return 0
                })
                thisPetRecord.forEach(r => {
                    const t = r.type[0]
                    const findData = data.find(d => d.petId === p.id && d.type[0] === t && d.day === r.day)
                    if (findData === undefined) {
                        const cycle = RecordTypeData.find(d1 => d1.id === t)?.cycle
                        if (cycle !== undefined) {
                            const day = new XDate(r.day).addMonths(cycle).toString("yyyy-MM-dd")
                            data.push({ recordId: r.recordId, petId: p.id, day: day, type: [t] })
                        }
                    }
                })
            }
        })
        // 重新进行排序
        data.sort((a, b) => {
            if (a.petId < b.petId) {
                return -1
            }
            if (a.petId > b.petId) {
                return 1
            }
            if (a.day < b.day) {
                return -1
            }
            if (a.day > b.day) {
                return 1
            }
            return 0
        })
        data = data.map((d, i) => {
            if (i > 0) {
                const lastRecord = data[i - 1]
                if (lastRecord.petId === d.petId) {
                    const lastRecordDate = new XDate(lastRecord.day)
                    // 如果同一宠物的两条记录间隔少于7天，则调整为间隔7天
                    const diff = lastRecordDate.diffDays(new XDate(d.day))

                    if (0 <= diff && diff < 7) {
                        d.day = lastRecordDate.addDays(7).toString("yyyy-MM-dd")
                    }
                }

            }
            return d
        })
        // 重新进行排序
        data.sort((a, b) => {
            if (a.petId < b.petId) {
                return -1
            }
            if (a.petId > b.petId) {
                return 1
            }
            if (a.day < b.day) {
                return -1
            }
            if (a.day > b.day) {
                return 1
            }
            return 0
        })
        return data
    }, [petData, recordData])

    const nearestDay = nextData.map(d => d.day).reduce((a, b) => a < b ? a : b, "2099-12-12")

    React.useEffect(() => {
        if (nextData.length > 0) {
            setSelectedDay(nextData[0].day)
        }
    }, [nextData])

    React.useEffect(() => {
        const itemData = cloneDeep(items)
        recordData.concat(nextData).forEach(d => {
            itemData[d.day] = [{ day: d.day, name: "", height: 20 }]
        })
        setItems(itemData)
    }, [recordData, nextData])

    return <View style={{ height: "100%" }}>
        {
            <Agenda
                items={items}
                selected={selectedDay}
                onDayPress={(day) => {
                    buildEmptyItemData(day.dateString)
                    setSelectedDay(day.dateString)
                }}
                renderDay={(day, item) => {

                    if (day?.setHours(0).setMinutes(0).setSeconds(0).toString("yyyy-MM-dd") === selectedDay) {
                        const data = recordData.concat(nextData)


                        return <View style={{ width: "100%" }}>
                            {
                                data.filter(d => d.day === selectedDay).map((d, i) => {
                                    return <RecordRow key={i} value={d} />
                                })
                            }
                        </View>
                    }

                    return <View></View>;
                }}
            />
        }
        <View>
            {
                nextData.length > 0 && <Button onPress={() => {
                    const nearest = nextData.map(d => d.day).reduce((a, b) => a < b ? a : b, "2099-12-12")
                    setSelectedDay(nearest)
                }}>返回待办日期：{`${nearestDay}`}</Button>
            }

        </View>

    </View >
}