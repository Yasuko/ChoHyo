import { Dispatch, createSlice } from '@reduxjs/toolkit'
import {
    ImageInterface, initialState as newInitial
} from './_Image.Interface'

export interface LayoutImagePropsInterface
{
    LayoutImage?   : LayoutImageInterface[],
    dispatch?      : Dispatch
}

export interface LayoutImageInterface extends ImageInterface
{
    id          : number,
}

export const initialState: LayoutImageInterface[] = [{
    id          : 0,
    ...newInitial,
}]

/* eslint @typescript-eslint/no-explicit-any: 0 */
const slice = createSlice({
    name: 'LayoutImage',
    initialState,
    reducers: {
        set: (state: any, action: any) => {
            return action.images;
        },
        add: (state: any, action: any) => {
            return state.concat([action.image])
        },
        update: (state: any, action: any) => {
            state[action.image.key] = action.image
            return state;
        },
        reset: () => {
            return initialState
        }
    }
});

export default slice.reducer
