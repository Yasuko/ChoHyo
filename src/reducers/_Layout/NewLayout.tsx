import { createSlice } from '@reduxjs/toolkit';
import { LayoutInterface, initialState as newInitial } from './_layout.interface';

export interface NewLayoutPropsInterface
{
    NewLayout?  : LayoutInterface,
    dispatch?   : any
}

export type NewLayoutInterface = LayoutInterface

export const initialState = newInitial

/* eslint @typescript-eslint/no-explicit-any: 0 */
const slice = createSlice({
    name: 'NewLayout',
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
        setSVG: (state: any, action: any) => {
            return Object.assign({}, state,
                { template     : action.svg, }
            )
        },
        setName: (state: any, action: any) => {
            return Object.assign({}, state,
                { name     : action.name, }
            )
        },
        setPaper: (state: any, action: any) => {
            return Object.assign({}, state,
                { paper     : action.paper, }
            )
        },
        setWidth: (state: any, action: any) => {
            return Object.assign({}, state,
                { width     : action.width, }
            )
        },
        setHeight: (state: any, action: any) => {
            return Object.assign({}, state,
                { height     : action.height, }
            )
        },
        setTexts: (state: any, action: any) => {
            return Object.assign({}, state,
                { texts     : action.texts, }
            )
        },
        addText: (state: any, action: any) => {
            return Object.assign(
                    {},
                    ...state.texts,
                    ...action.texts
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
                    ...action.texts
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
        setBack: (state: any, action: any) => {
            return Object.assign({}, state,
                { back     : action.back, }
            )
        },
        resetContent: () => {
            return initialState;
        }
    }
});

export default slice.reducer;
