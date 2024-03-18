import React from "react";
import { Pet } from "../pages/pets/type";
import { reducer } from "./reducer";
import { Record } from "../pages/records/type";

export interface State {
    petData: Pet[]
    recordData: Record[]
}

const initialState: State = {
    petData: [],
    recordData: []
}

const Context = React.createContext<{ state: State; dispatch: (v: { type: string; id: string; value: any }) => void }>({
    state: initialState,
    dispatch: () => { }
})

function ContextProvider(props: any) {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    const { children } = props
    return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
}

const ContextConsumer = Context.Consumer

export { Context, ContextProvider, ContextConsumer }