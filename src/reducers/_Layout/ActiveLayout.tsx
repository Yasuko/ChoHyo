import { createSlice } from '@reduxjs/toolkit';
import { ActiveLayoutInterface, activeInitialState } from './_layout.interface';
export interface ActiveLayoutPropsInterface
{
    ActiveLayout?  : ActiveLayoutInterface,
    dispatch?      : any;
}

export const initialState: ActiveLayoutInterface = activeInitialState

const slice = createSlice({
    name: 'ActiveLayout',
    initialState,
    reducers: {
        setPaper: (state: any, action: any) => {
            return Object.assign({}, state,
                {
                    paper     : action.paper,
                    width     : action.width,
                    height    : action.height,
                }
            )
        },
        setWidthHeight: (state: any, action: any) => {
            return Object.assign({}, state,
                {
                    width      : action.width,
                    height     : action.height,
                }
            )
        },
        setRate: (state: any, action: any) => {
            return Object.assign({}, state,
                { rate     : action.rate, }
            )
        },
        setXY: (state: any, action: any) => {
            return Object.assign({}, state,
                {
                    x     : action.x,
                    y     : action.y,
                }
            )
        },
        setTemplate: (state: any, action: any) => {
            return Object.assign({}, state,
                {
                    svg     : action.svg,
                    temp_id : action.id
                }
            )
        },
        setSVG: (state: any, action: any) => {
            return Object.assign({}, state,
                { svg     : action.svg, }
            )
        },
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
});

export default slice.reducer;
