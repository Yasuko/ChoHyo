import { Dispatch, createSlice } from '@reduxjs/toolkit'
import { TemplateInterface, orgInitial } from './_template_interface'
export interface NewTemplatePropsInterface
{
    NewTemplate?: TemplateInterface,
    dispatch?   : Dispatch
}

export const initialState: TemplateInterface = orgInitial

/* eslint @typescript-eslint/no-explicit-any: 0 */
const slice = createSlice({
    name: 'NewTemplate',
    initialState,
    reducers: {
        setTemplate: (state: any, action: any) => {
            return Object.assign({}, state, action)
        },
        setName: (state: any, action: any) => {
            return Object.assign({}, state,
                { name     : action.name, }
            )
        },
        setSVG: (state: any, action: any) => {
            return Object.assign({}, state,
                {
                    svg     : action.svg,
                    sheet   : '',
                }
            )
        },
        setSheet: (state: any, action: any) => {
            return Object.assign({}, state,
                {
                    svg     : '',
                    sheet   : action.sheet,
                }
            )
        },
        setPaper: (state: any, action: any) => {
            return Object.assign({}, state,
                { paper     : action.paper, }
            )
        },
        setOrientation: (state: any, action: any) => {
            return Object.assign({}, state,
                { orientation   : action.orientation, }
            )
        },
        setGroup1: (state: any, action: any) => {
            return Object.assign({}, state,
                { group1   : action.group1, }
            )
        },
        setGroup2: (state: any, action: any) => {
            return Object.assign({}, state,
                { group2   : action.group2, }
            )
        },
        setGroup3: (state: any, action: any) => {
            return Object.assign({}, state,
                { group3   : action.group3, }
            )
        },
        setMemo: (state: any, action: any) => {
            return Object.assign({}, state,
                { memo     : action.memo, }
            )
        },
        setDone: (state: any, action: any) => {
            return Object.assign({}, state,
                { done     : action.done, }
            )
        },
        reset: () => {
            return initialState
        }
    }
})

export default slice.reducer
