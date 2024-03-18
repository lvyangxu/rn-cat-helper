import { Tab, TabView, ThemeProvider, createTheme } from "@rneui/themed";
import React from "react";
import { Home } from "./pages/home";
import { Pets } from "./pages/pets";
import { getPets, setPets } from "./pages/pets/util";
import { Context } from "./context/context";
import { Records } from "./pages/records";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { getRecords, setRecords } from "./pages/records/util";
import { LocaleConfig } from "react-native-calendars";

const theme = createTheme({

});

LocaleConfig.locales = {
    "zh-hans": {
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        dayNames: ["日", "一", '二', '三', '四', '五', '六'],
        dayNamesShort: ["日", "一", '二', '三', '四', '五', '六'],
    }
}
LocaleConfig.defaultLocale = "zh-hans"

export function Framework() {
    const [selectedTab, setSelectedTab] = React.useState(0)
    const { state, dispatch } = React.useContext(Context)
    const [initSuccess, setInitSuccess] = React.useState(false)
    const { petData, recordData } = state
    // 读取存储的数据
    React.useEffect(() => {
        async function load() {
            const pets = await getPets()
            dispatch({ type: "SET_DATA", id: "petData", value: pets })
            const records = await getRecords()
            dispatch({ type: "SET_DATA", id: "recordData", value: records })
            setInitSuccess(true)
        }
        load()
    }, [])

    React.useEffect(() => {
        if (initSuccess) {
            setPets(petData)
        }
    }, [petData])

    React.useEffect(() => {
        if (initSuccess) {
            setRecords(recordData)
        }
    }, [recordData])

    return <ThemeProvider theme={theme}>

        <SafeAreaProvider>
            <Tab value={selectedTab} onChange={v => setSelectedTab(v)} titleStyle={{ fontSize: 12 }}>
                <Tab.Item>
                    日程
                </Tab.Item>
                <Tab.Item>
                    宠物管理
                </Tab.Item>
                <Tab.Item>
                    记录管理
                </Tab.Item>
            </Tab>
            <TabView value={selectedTab} onChange={v => setSelectedTab(v)}>
                <TabView.Item style={{ width: "100%" }}>
                    <Home />
                </TabView.Item>
                <TabView.Item style={{ width: "100%" }}>
                    <Pets />
                </TabView.Item>
                <TabView.Item style={{ width: "100%" }}>
                    <Records />
                </TabView.Item>
            </TabView>
        </SafeAreaProvider>


    </ThemeProvider>
}