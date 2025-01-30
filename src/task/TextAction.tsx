import { put, select, takeEvery } from 'redux-saga/effects';

// import Helper


// import Reducer
import { ListTextPropsInterface, initialState as ltextInitial } from '../reducers/_Text/ListText';
import { initialState as orgTextInitial } from '../reducers/_Text/_text.Interface';
import { LayoutImageInterface, LayoutImagePropsInterface, initialState as layoutImageInitial } from '../reducers/_Image/LayoutImage';
import { editInitialState as imageInitial } from '../reducers/_Image/_Image.Interface';

const listTextParam = (state: ListTextPropsInterface) => state.ListText;
const layoutImageParam = (state: LayoutImagePropsInterface) => state.LayoutImage;

// Root Saga登録配列
export const RootTextAction = [
    takeEvery('TextAction/add', add),
    takeEvery('TextAction/addImage', addImage),
];

export function* add()
{
    console.log('add new text');
    const lt = yield select(listTextParam);
    const nt = Object.assign({}, orgTextInitial);
    nt.name = 'text';

    if (lt['texts'][0] === ltextInitial['texts'][0]) {
        yield put({
            type        : 'ListText/set',
            texts        : [nt],
        });
    } else {
        yield put({
            type        : 'ListText/add',
            text        : nt,
        });
    }
}

export function* addImage(val)
{
    console.log('add new image');
    const lm: LayoutImageInterface[] = yield select(layoutImageParam)
    const nt = Object.assign({}, imageInitial);
    nt.image= val.image;

    console.log(lm[0]);
    console.log(layoutImageInitial);

    if (lm[0] === layoutImageInitial[0]) {
        yield put({
            type        : 'LayoutImage/set',
            images      : [nt],
        });
    } else {
        yield put({
            type        : 'LayoutImage/add',
            image       : nt,
        });
    }
}

