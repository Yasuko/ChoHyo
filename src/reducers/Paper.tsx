import { Dispatch, createSlice } from '@reduxjs/toolkit'

export interface PaperPropsInterface
{
    Paper?      : PaperInterface[],
    dispatch?   : Dispatch
}

export interface PaperInterface
{
    name        : string
    width       : number,
    height      : number,
}

export const initialState: PaperInterface[] = [
    {
        name        : 'A3',
        width       : 297,
        height      : 420,
    },
    {
        name        : 'A4',
        width       : 210,
        height      : 297,
    },
    {
        name        : 'A5',
        width       : 148,
        height      : 210,
    },
    {
        name        : 'B4',
        width       : 257,
        height      : 364,
    },
    {
        name        : 'B5',
        width       : 182,
        height      : 257,
    }
]

/* eslint @typescript-eslint/no-explicit-any: 0 */
const slice = createSlice({
    name: 'Paper',
    initialState,
    reducers: {
        set: (
            state: PaperInterface[],
            action: any
        ) => {
            return action.paper;
        },
        add: (state: any, action: any) => {
            return {...state, ...action.paper};
        },
        reset: () => {
            return initialState
        }
    }
})

export default slice.reducer
