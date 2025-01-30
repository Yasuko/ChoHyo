
// import reducer

import { TextInterface, listInitial, ListTextInterface } from '../../reducers/_Text/_text.Interface';
import { ListTextPropsInterface } from '../../reducers/_Text/ListText';
import { FontInterface, FontPropsInterface, initialState as initialFont } from '../../reducers/Font';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';

export const ListText = () => {

    const dispatch = useDispatch();

    const lt: ListTextInterface = useSelector((state: ListTextPropsInterface): ListTextInterface => {
        return state.ListText ? state.ListText : listInitial;
    })
    const Font: FontInterface[] = useSelector((state: FontPropsInterface): FontInterface[] => {
        return state.Font ? state.Font : initialFont;
    })

    return (
        <div className="
            w-full h-full
        ">
            { buildTextList(lt, Font, dispatch) }
        </div>
    );

}

const buildTextList = (
    lt: ListTextInterface,
    Font: FontInterface[],
    dispatch: Dispatch
): JSX.Element[] => {
    if (lt.texts[0] === listInitial.texts[0]) {
        return [<div>Select Text</div>]
    }

    const _lists = lt.texts.map((val: TextInterface, key) => {
        if (key === lt.spot) {
            return (
                <div
                    key={key}
                    className='
                        w-full h-60
                        grid grid-cols-10 gap-4
                        bg-gray-700 rounded-lg
                        text-gray-200
                        '>
                    <div className="col-span-1 leading-10 mt-4 px-4">
                        Text:
                    </div>
                    <div className="col-span-9 p-4 pb-2">
                        <input
                            className="
                                py-3 px-4 pe-9 block w-full
                                focus:border-blue-500 focus:ring-blue-500
                                disabled:opacity-50 disabled:pointer-events-none
                                rounded-lg
                                dark:bg-neutral-900 dark:border-neutral-700
                                dark:text-neutral-400 dark:placeholder-neutral-500
                                dark:focus:ring-neutral-600
                            "
                            type="text"
                            defaultValue={val.text}
                            onChange={(e) => {
                                updateProp(key, val, {text: e.target.value}, dispatch);
                            }}/>
                    </div>

                    <div className="col-span-1 leading-10 px-4">
                        Name:
                    </div>
                    <div className="col-span-4 px-4">
                        <input
                            type="text"
                            defaultValue={val.name}
                            className="
                                py-2 px-4 block w-full
                                focus:border-blue-500 focus:ring-blue-500
                                disabled:opacity-50 disabled:pointer-events-none
                                rounded-lg
                                dark:bg-neutral-900 dark:border-neutral-700
                                dark:text-neutral-400 dark:placeholder-neutral-500
                                dark:focus:ring-neutral-600
                            "
                            onChange={(e) => {
                                updateProp(key, val, {name: e.target.value}, dispatch);
                            }}/>
                    </div>

                    <div className="col-span-1 leading-10 px-4">
                        Font:
                    </div>
                    <div className="col-span-4 px-4">
                        { fontList(key, val, Font, dispatch) }
                    </div>

                    <div className='col-span-10 grid grid-cols-15 gap-1'>
                        <div className="leading-8 pl-4">
                            Size:
                        </div>
                        <div className="col-span-3 px-4">
                            <input
                                type="text"
                                defaultValue={val.size}
                                className="
                                    py-1 px-2 block w-full
                                    focus:border-blue-500 focus:ring-blue-500
                                    disabled:opacity-50 disabled:pointer-events-none
                                    rounded-lg
                                    dark:bg-neutral-900 dark:border-neutral-700
                                    dark:text-neutral-400 dark:placeholder-neutral-500
                                    dark:focus:ring-neutral-600
                                "
                                onChange={(e) => {
                                    updateProp(key, val, {size: Number(e.target.value)}, dispatch);
                                }}/>

                        </div>

                        <div className="leading-8 ">
                            x:
                        </div>
                        <div className="col-span-3 pr-2">
                            <input
                                type="text"
                                value={val.x}
                                className="
                                    py-1 px-2 block w-full
                                    focus:border-blue-500 focus:ring-blue-500
                                    disabled:opacity-50 disabled:pointer-events-none
                                    rounded-lg
                                    dark:bg-neutral-900 dark:border-neutral-700
                                    dark:text-neutral-400 dark:placeholder-neutral-500
                                    dark:focus:ring-neutral-600
                                "
                                onChange={(e) => {
                                    updateProp(key, val, {x: Number(e.target.value)}, dispatch);
                                }} />
                        </div>
                        <div className="leading-8 ">
                            y:
                        </div>
                        <div className="col-span-3 pr-2">
                            <input
                                type="text"
                                value={val.y}
                                className="
                                    py-1 px-2 pe-9 block w-full
                                    focus:border-blue-500 focus:ring-blue-500
                                    disabled:opacity-50 disabled:pointer-events-none
                                    rounded-lg
                                    dark:bg-neutral-900 dark:border-neutral-700
                                    dark:text-neutral-400 dark:placeholder-neutral-500
                                    dark:focus:ring-neutral-600
                                "
                                onChange={(e) => {
                                    updateProp(key, val, {y: Number(e.target.value)}, dispatch);
                                }} />
                        </div>

                        <button
                            type="button"
                            className="
                                col-span-3
                                w-20 h-10 m-4 -mt-1
                                text-sm font-medium text-white text-center
                                rounded-lg border border-transparent bg-red-500
                                hover:bg-red-600 focus:outline-none focus:bg-red-600
                                disabled:opacity-50 disabled:pointer-events-none
                                dark:bg-red-600 dark:hover:bg-red-700
                                dark:focus:bg-red-700 dark:disabled:bg-red-600
                                dark:disabled:text-neutral-400 dark:disabled:hover:bg-red-600
                                dark:disabled:hover:text-neutral-400 dark:disabled:focus:bg-red-600
                                dark:disabled:pointer-events-none
                            "
                            data-toggle="modal" data-target='#show_qr'
                            onClick={
                                () => {
                                    dispatch({
                                        type    : 'ListText/delete',
                                        key     : key
                                    });
                                }
                        }>削除</button>
                    </div>
                </div>
            );
        } else {
            return <> </>
        }
    });
    return _lists;
}

const updateProp = (
    key: number,
    val: TextInterface,
    change: Partial<TextInterface>,
    dispatch: Dispatch
): void => {
    dispatch({
        type    : 'ListText/update',
        text    : {
            ...val,
            ...change,
            ...{key: key}
        }
    });
}

const fontList = (
    key: number,
    val: TextInterface,
    Font: FontInterface[],
    dispatch: Dispatch
): JSX.Element => {
    const f = (Font) ?
                Font : initialFont;
    const _lists = f.map((val: any, k) => {
        return (
            <option value={val.name} key={k}>
                {val.outstring}
            </option>
        );
    });
    return (
        <select
            className="
                py-3 px-4 pe-9 block w-full
                border-gray-200 rounded-lg
                text-sm
                focus:border-blue-500 focus:ring-blue-500
                disabled:opacity-50 disabled:pointer-events-none
                dark:bg-neutral-900 dark:border-neutral-700
                dark:text-neutral-400 dark:placeholder-neutral-500
                dark:focus:ring-neutral-600
            "
            defaultValue={val.font}
            onChange={(e) => {
                dispatch({
                    type    : 'ListText/update',
                    text    : {
                        ...val,
                        ...{
                            font: e.target.value,
                            key: key
                        }
                    }
                })
            }}>
            {_lists}
        </select>
    );
}

export default ListText
