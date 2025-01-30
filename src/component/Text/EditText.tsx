import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    ListTextPropsInterface,
    TextInterface,
    initialState
} from '../../reducers/_Text/ListText'
import { NewTextInterface } from '../../reducers/_Text/NewText'
import { Dispatch } from '@reduxjs/toolkit'
import { ListTextInterface } from '../../reducers/_Text/_text.Interface'


const EditText = () => {

    const dispatch = useDispatch()

    const lt = useSelector((state: ListTextPropsInterface): ListTextInterface => {
        return state.ListText ? state.ListText : initialState
    })
    return (
        <div className="container">
            <Link to="/template/new" className="large_link">新規</Link>
            <div className="d-flex">
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { buildTemplateList(lt.texts, dispatch) }
                </tbody>
            </table>
            </div>
        </div>
    );
}

const buildTemplateList = (lt: TextInterface[], dispatch: Dispatch): JSX.Element[] => {
    if (lt === initialState.texts) {
        return ([<tr><td>登録なし</td></tr>])
    }
    const _lists = lt.map((val: NewTextInterface, key: number) => {
        console.log(val);
        return (
            <tr key={key}>
                <td>
                    <tr>
                        <td>{val.text}</td>
                    </tr>
                    <tr>
                        <td>{val.font}</td>
                        <td>{val.size}</td>
                    </tr>
                    <tr>
                        <td>{val.x}</td>
                        <td>{val.y}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <button
                                type="button"
                                className="btn btn-secondary btn-sm"
                                data-toggle="modal" data-target='#show_qr'
                                onClick={
                                    () => {
                                        dispatch({
                                            type    : 'TemplateAction/del',
                                            id      : key
                                        });
                                    }
                            }>削除</button>
                        </td>
                    </tr>
                </td>
            </tr>
        )
    })
    return _lists
}

export default EditText
