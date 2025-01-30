import { useDispatch, useSelector } from 'react-redux'

// import component
import AddCSVText from '../Text/AddCSVText';
import AddExcellTemplate from './AddExcellTemplate';

// import reducer
import {
    ExcellLayoutPropsInterface,
    ExcellLayout,
    initialState
} from '../../reducers/_Layout/ExcellLayout'
import { Dispatch } from '@reduxjs/toolkit';


let nl: ExcellLayout | undefined = undefined

const NewlayoutExcell = () => {

    const dispatch = useDispatch()

    const nl = useSelector((state: ExcellLayoutPropsInterface): ExcellLayout => {
                return state.ExcellLayout === undefined ? initialState : state.ExcellLayout
    })

    if (nl.done){
        window.location.href = nl.back
    }

    return (
        <div className="container">
            <nav className="navbar">
                <h6>ExcellLayout</h6>
                <div className="ToolBox">
                    <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        data-toggle="modal" data-target='#show_qr'
                        onClick={
                            () => {
                                dispatch({
                                    type    : 'NewPrint/set',
                                    layout  : nl
                                })
                                dispatch({
                                    type    : 'PrintAction/export',
                                })
                            }
                    }>Excell出力</button>
                    <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        data-toggle="modal" data-target='#show_qr'
                        onClick={
                            () => {
                                dispatch({
                                    type    : 'LayoutAction/exportValiableList',
                                });
                            }
                    }>変数一覧出力</button>
                </div>
            </nav>
            <div className="LayoutBaseExcell">
                { showTexts(dispatch) }
            </div>
            <div className="LayoutSub">
                <AddExcellTemplate next="LayoutAction/changeExcellTemplate" />
                <br></br>
                <AddCSVText next="LayoutAction/atachCSV" />
            </div>
        </div>
    )
}

const showTexts = (
    dispatch: Dispatch
): JSX.Element[] => {
    if (nl === undefined) {
        return ([<div></div>])
    }
    if (Object.keys(nl.contents).length <= 1 ) {
        return ([<tr><td>登録なし</td></tr>])
    }
    const _lists = Object.keys(nl.contents).map((val: any, key) => {
        return (
            <div key={key} className='d-flex TextList'>
                <div className="my-box col TextTitle2">
                    {val}
                </div>
                <div className="my-box col">
                    <input
                        className="form-control TextInputMiddle"
                        type="text"
                        defaultValue={nl.contents[val]}
                        onChange={(e) => {
                            dispatch({
                                type    : 'ExcellLayout/updateContents',
                                key     : key,
                                content : e.target.value
                            })
                        }} />
                </div>
            </div>
        )
    })
    return _lists
}

export default NewlayoutExcell