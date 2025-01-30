import { Dispatch } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

// import reducer
import {
    NewPrintPropsInterface,
    NewPrintInterface,
    initialState
} from '../../reducers/_Print/NewPrint'


import { TextInterface } from '../../reducers/_Text/_text.Interface'
import { LayoutImageInterface } from '../../reducers/_Image/_Image.Interface'

const  NewPrint = () => {
    
    const dispatch = useDispatch()
    
    const np: NewPrintInterface = useSelector((state: NewPrintPropsInterface): NewPrintInterface => {
        return state.NewPrint ? state.NewPrint : initialState
    })
    
    return (
        <div className="container">
            <div className="d-flex">
                <div className="my-box w-75">
                    <svg
                        width={ np.width * 4 }
                        height={ np.height * 4 }
                        viewBox={'0 0 ' + np.width * 1.2 + ' ' + np.height * 1.2 }
                    >
                        <image
                            x="0" y="0"
                            width={ np.width }
                            height={ np.height }
                            href={ np.svg }
                        ></image>
                        { mappingImage(np.images) }
                        { mappingText(np.texts) }

                    </svg>
                </div>

                <br></br>
                <div className="my-box w-25">
                    <div className="container">
                        <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={
                                () => dispatch({
                                    type    : 'PrintAction/print',
                                    // type    : 'PrintAction/printer',
                                })
                            }>
                            PDF作成</button>
                        <p></p>
                        <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={
                                () => dispatch({
                                    type    : 'PrintAction/loadData',
                                })
                            }>
                            データ読み込み</button>
                    </div>
                    <br></br>
                    <table>
                        <tbody>
                            { buildTextList(np.texts, dispatch) }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

const mappingText = (
    text: TextInterface[] | undefined
): JSX.Element[] => {
    if (text === undefined || text.length <= 1) {
        return [<p></p>]
    }
    const _lists: JSX.Element[] = text.map((val: TextInterface, key: number) => {
        return (
            <text key={ key }
                x={val.x}
                y={val.y}
                fontSize={val.size}
                fontFamily={val.font}
                stroke="black"
                textAnchor="Super Sans"
                strokeWidth="0.3"
            >
                {val.text}
            </text>
        )
    })
    return _lists
}

const mappingImage = (
    im: LayoutImageInterface[] | undefined
): JSX.Element[] => {
    if (im === undefined || im[0].image === '') {
        return [<p></p>]
    }
    const _lists: JSX.Element[] = im.map((val: LayoutImageInterface, key: number) => {
        return (
            <image
                key={key}
                x={ val.x } y={ val.y }
                width={ val.width + 'px' }
                height={ val.height + 'px' }
                href={ val.image }
            ></image>
        )
    })
    return _lists
}
const buildTextList = (
    lt: TextInterface[] | undefined,
    dispatch: Dispatch
): JSX.Element[] => {
    if (lt === undefined || lt === initialState.texts) {
        return [<tr><td>登録なし</td></tr>]
    }
    const _lists: JSX.Element[] = lt.map((val: TextInterface, key: number) => {
        return (
            <tr key={key}>
                <td className="TextTitle">
                    Text : 
                    <input
                        className="form-control TextInputLarge"
                        type="text"
                        value={val.text}
                        onChange={(e) => {
                            dispatch({
                                type    : 'NewPrint/updateText',
                                key     : Number(key),
                                text    : e.target.value,
                            })
                        }}
                    />
                </td>
            </tr>
        );
    })
    return _lists
}

export default NewPrint
