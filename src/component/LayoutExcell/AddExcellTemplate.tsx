import { Dispatch } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

// import component

// import reducer
interface _Template {
    next        : string,
}

const AddExcellTemplate = (props: _Template) => {
    const dispatch = useDispatch()
    return (
        <div className="container">
            <div className="form-group row">
                <div
                    id="svgtarget" className="dragTest center"
                    onDragOver={(e: DragEvent | unknown) => onDragStart(e, dispatch)}
                    onDrop={(e: DragEvent | unknown) => onDragEnd(e, props.next, dispatch)}>
                        <p>Excellをドラッグ</p>
                </div>
            </div>
        </div>
    )
}

const onDragStart = (e: DragEvent | unknown, dispatch: Dispatch): void => {
    if (e instanceof DragEvent === false) return

    e.preventDefault();
    dispatch({
        type    : 'DragAction/DragStart',
        event   : e,
        target  : 'svgtarget',
    })

}

const onDragEnd = (
    e: DragEvent | unknown,
    next: string,
    dispatch: Dispatch
): void => {
    if (e instanceof DragEvent === false) return

    e.preventDefault()
    
    dispatch({
        type    : 'DragAction/DragEnd',
        event   : e,
        next    : next,
    })
    e.stopPropagation()
}

export default AddExcellTemplate
