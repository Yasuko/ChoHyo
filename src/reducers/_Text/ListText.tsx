import { Dispatch, createSlice } from '@reduxjs/toolkit'
import {
    ListTextInterface,
    TextInterface as TextInterfaceORG,
    listInitial } from './_text.Interface'

export interface ListTextPropsInterface
{
    ListText?   : ListTextInterface,
    dispatch?   : Dispatch
}

export type TextInterface = TextInterfaceORG
export const initialState: ListTextInterface = listInitial

/* eslint @typescript-eslint/no-explicit-any: 0 */
const slice = createSlice({
    name: 'ListText',
    initialState,
    reducers: {
        set: (state: any, action: any) => {
            state.texts = action.texts
            return state;
        },
        setSpot: (state: any, action: any) => {
            return Object.assign({}, state,
                { spot     : action.spot, }
            )
        },
        add: (state: any, action: any) => {
            state.texts = state.texts.concat([action.text]);
            return state;
        },
        update: (state: any, action: any) => {
            state.texts[action.text.key] = action.text;
            return state;
        },
        delete: (state: any, action: any) => {
            delete state.texts[action.key];
            return state;
        },
        reset: () => {
            return initialState
        }
    }
})

export default slice.reducer
