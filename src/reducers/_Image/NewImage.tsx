import { Dispatch, createSlice } from '@reduxjs/toolkit';
import { ImageInterface, initialState as orgInitial } from './_Image.Interface';
export interface NewImagePropsInterface
{
    NewImage?   : ImageInterface,
    dispatch?   : Dispatch
}

export const initialState = orgInitial;

/* eslint @typescript-eslint/no-explicit-any: 0 */
const slice = createSlice({
    name: 'NewImage',
    initialState,
    reducers: {
        setImage: (state: any, action: any) => {
            return Object.assign({}, state,
                { image     : action.image, }
            )
        },
        setWidth: (state: any, action: any) => {
            return Object.assign({}, state,
                { width         : action.width, }
            )
        },
        setHeight: (state: any, action: any) => {
            return Object.assign({}, state,
                { height        : action.height, }
            )
        },
        setWidthHeight: (state: any, action: any) => {
            return Object.assign({}, state,
                {
                    width       : action.width,
                    height      : action.height,
                }
            )
        },
        setXY: (state: any, action: any) => {
            return Object.assign({}, state,
                {
                    x           : action.x,
                    y           : action.y,
                }
            )
        },
        setMemo: (state: any, action: any) => {
            return Object.assign({}, state,
                { name     : action.name, }
            )
        },
        reset: () => {
            return initialState;
        }
    }
})

export default slice.reducer
