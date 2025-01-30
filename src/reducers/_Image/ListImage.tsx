import { Dispatch, createSlice } from '@reduxjs/toolkit'
import {
    EditImageInterface,
    editInitialState,
} from './_Image.Interface'


export interface ListImagePropsInterface
{
    ListImage?  : EditImageInterface,
    dispatch?   : Dispatch
}

export const initialState: EditImageInterface[] = [editInitialState]

/* eslint @typescript-eslint/no-explicit-any: 0 */
const slice = createSlice({
    name: 'ListImage',
    initialState,
    reducers: {
        set: (state: any, action: any) => {
            return action.images
        },
        reset: () => {
            return initialState
        }
    }
})

export default slice.reducer
