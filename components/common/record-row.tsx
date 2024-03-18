import React from "react"
import { Context } from "../context/context"
import { Record } from "../pages/records/type"
import { Icon, ListItem } from "@rneui/themed"
import { PetIcon } from "./pet-icon"
import { RecordTypeData } from "../pages/home/data"

export function RecordRow(props: { value: Record; onDelete?: () => void }) {
    const { value, onDelete } = props
    const { state, dispatch } = React.useContext(Context)
    const { petData } = state
    const pet = petData.find(d1 => d1.id === value.petId)
    return <ListItem>
        <PetIcon icon={pet?.icon} />
        <ListItem.Content>
            <ListItem.Title>
                {value.day}
            </ListItem.Title>
            <ListItem.Subtitle>
                {
                    value.type.map(d1 => {
                        const find = RecordTypeData.find(d2 => d2.id === d1)
                        return find === undefined ? d1 : find.name
                    }).join(",")
                }
            </ListItem.Subtitle>
        </ListItem.Content>
        {
            onDelete && <ListItem.Content style={{ flex: undefined }}>
                <Icon type="ionicon" name="close-outline" onPress={() => {
                    onDelete()
                }} />
            </ListItem.Content>
        }

    </ListItem>
}