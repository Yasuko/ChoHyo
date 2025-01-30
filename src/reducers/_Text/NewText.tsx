import { Dispatch, createSlice } from '@reduxjs/toolkit'
import { TextInterface, initialState as orgInitial } from './_text.Interface'
export interface NewTextPropsInterface
{
    NewText?    : NewTextInterface,
    dispatch?   : Dispatch
}

export interface NewTextInterface extends TextInterface {}
export const initialState: NewTextInterface = orgInitial

/* eslint @typescript-eslint/no-explicit-any: 0 */
const slice = createSlice({
    name: 'NewText',
    initialState,
    reducers: {
        setName: (state: any, action: any) => {
            return Object.assign({}, state,
                { name     : action.name, }
            )
        },
        setText: (state: any, action: any) => {
            return Object.assign({}, state,
                { text     : action.text, }
            )
        },
        setFont: (state: any, action: any) => {
            return Object.assign({}, state,
                { font     : action.font, }
            )
        },
        setSize: (state: any, action: any) => {
            return Object.assign({}, state,
                { size     : action.size, }
            )
        },
        setColor: (state: any, action: any) => {
            return Object.assign({}, state,
                { color     : action.color, }
            )
        },
        setX: (state: any, action: any) => {
            return Object.assign({}, state,
                { x     : action.x, }
            )
        },
        setY: (state: any, action: any) => {
            return Object.assign({}, state,
                { y     : action.y, }
            )
        },
        reset: () => {
            return initialState
        }
    }
})

export default slice.reducer
