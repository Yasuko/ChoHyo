
import { animationReducers } from '../animation/index.reducer'
import { LayoutReducer } from './_Layout/index.reducers'
import { TemplateReducer } from './_Template/index.reducers'
import { TextReducer } from './_Text/index.reducers'
import { ImageReducer } from './_Image/index.reducers'
import { PrintReducer } from './_Print/index.reducers'
import Server from './Server';
import Paper from './Paper';
import Font from './Font';
import PrintData from './PrintData';
export const reducer = {
    ...animationReducers,
    ...LayoutReducer,
    ...TemplateReducer,
    ...TextReducer,
    ...ImageReducer,
    ...PrintReducer,
    Server,
    Paper,
    Font,
    PrintData,
}



