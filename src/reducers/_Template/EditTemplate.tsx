import { Dispatch, createSlice } from '@reduxjs/toolkit'
import { EditTemplateInterface, editInitial } from './_template_interface'
export interface EditTemplatePropsInterface
{
    EditTemplate?: EditTemplateInterface,
    dispatch?   : Dispatch
}

export const initialState: EditTemplateInterface = editInitial;

/* eslint @typescript-eslint/no-explicit-any: 0 */
const slice = createSlice({
    name: 'EditTemplate',
    initialState,
    reducers: {
        set: (state: any, action: any) => {
            return action.template
        },
        setName: (state: any, action: any) => {
            return Object.assign({}, state,
                { name     : action.name, }
            )
        },
        setSVG: (state: any, action: any) => {
            return Object.assign({}, state,
                { svg     : action.svg, }
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
        setEnd: (state: any, action: any) => {
            return Object.assign({}, state,
                { editend  : action.editend, }
            )
        },
        reset: () => {
            return initialState
        }
    }
})

export default slice.reducer
