import { Dispatch, createSlice } from '@reduxjs/toolkit'
import {
    ExcellLayoutInterface,
    excellInitialState
} from './_layout.interface'

export interface ExcellLayoutPropsInterface
{
    ExcellLayout?   : ExcellLayoutInterface,
    dispatch?       : Dispatch
}

export type ExcellLayout = ExcellLayoutInterface
export const initialState = excellInitialState;

/* eslint @typescript-eslint/no-explicit-any: 0 */
const slice = createSlice({
    name: 'ExcellLayout',
    initialState,
    reducers: {
        set: (state: any, action: any) => {
            return action.layout
        },
        setTemplate: (state: any, action: any) => {
            return Object.assign({}, state,
                { template     : action.template, }
            )
        },
        setName: (state: any, action: any) => {
            return Object.assign({}, state,
                { name     : action.name, }
            )
        },
        setImages: (state: any, action: any) => {
            return Object.assign({}, state,
                { images     : action.images, }
            )
        },
        addImage: (state: any, action: any) => {
            return Object.assign(
                    {},
                    ...state.images,
                    ...action.images
                )
        },
        setMemo: (state: any, action: any) => {
            return Object.assign({}, state,
                { name     : action.name, }
            )
        },
        setContents: (state: any, action: any) => {
            return Object.assign({}, state,
                { contents     : action.contents, }
            )
        },
        setSheet: (state: any, action: any) => {
            return Object.assign({}, state,
                { sheet     : action.sheet, }
            )
        },
        updateContents: (state: any, action: any) => {
            Object.keys(state.contents).map((val, key) => {
                if (key === action.key) {
                    state.contents[val] = action.content
                }
            });
            return state
        },
        setDone: (state: any, action: any) => {
            return Object.assign({}, state,
                { done     : action.done, }
            )
        },
        setBack: (state: any, action: any) => {
            return Object.assign({}, state,
                { back     : action.back, }
            )
        },
        resetContent: () => {
            return initialState
        }
    }
})

export default slice.reducer
