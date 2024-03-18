import { State } from "./context"

export function reducer(state: State, action: { type: string; id: string; value: any }) {
    switch (action.type) {
        case 'SET_DATA':
            return { ...state, [action.id]: action.value }
        default:
            return state
    }
}