import { Dispatch, createSlice } from '@reduxjs/toolkit'
import {
    EditImageInterface,
    editInitialState,
} from './_Image.Interface'
export interface EditImagePropsInterface
{
    EditImage?  : EditImageInterface,
    dispatch?   : Dispatch
}

export const initialState: EditImageInterface = editInitialState;

/* eslint @typescript-eslint/no-explicit-any: 0 */
const slice = createSlice({
    name: 'EditImage',
    initialState,
    reducers: {
        set: (state: any, action: any) => {
            return action.image;
        },
        setImage: (state: any, action: any) => {
            return Object.assign({}, state,
                { image     : action.image, }
            )
        },
        setWidthHeight: (state: any, action: any) => {
            return Object.assign({}, state,
                {
                    width   : action.width,
                    height  : action.height,
                }
            )
        },
        setMemo: (state: any, action: any) => {
            return Object.assign({}, state,
                { name     : action.name, }
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
