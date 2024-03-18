import { Avatar, AvatarProps } from "@rneui/base";
import { Add } from "./add";

export function PetIcon(props: { icon?: string | undefined } & AvatarProps) {
    const { icon, ...others } = props
    others.source = { uri: "data:image/jpeg;base64," + icon }
    if (icon === undefined || icon === null) {
        others.title = "+"
        others.containerStyle = { backgroundColor: "lightblue" }
        // 组件bug，避免警告 ReactImageView: Image source "null" doesn't exist
        others.source = { uri: "data:image/png", }
    }

    return <Avatar size={60} rounded {...others} />
}