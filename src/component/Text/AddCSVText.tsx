import { Dispatch } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

// import reducer
type CSVTextState = {
    next        : string,
}

const AddCSVText = (state: CSVTextState) => {

    const dispatch = useDispatch()

    return (
        <div className="">
            <div className="flex justify-center items-center">
                <div
                    id="csvdragtarget"
                    className="
                        w-[80%] h-46 bg-gray-400
                        text-center text-gray-200
                        text-3xl
                        rounded-lg
                        hover:bg-gray-500
                        cursor-pointer
                        "
                    onDragOver={(e) => onDragStart(e, dispatch)}
                    onDrop={(e) => onDragEnd(e, dispatch, state.next)}>
                        <p className='pt-14'>CSVをドラッグ</p>
                </div>
            </div>
        </div>
    )
}

const onDragStart = (
    e: DragEvent | unknown,
    dispatch: Dispatch
): void => {
    const _e = e as Event;
    _e.preventDefault();
    dispatch({
        type    : 'DragAction/DragStart',
        event   : _e,
        target  : 'csvdragtarget',
    })
}

const onDragEnd = (
    e: DragEvent | unknown,
    dispatch: Dispatch,
    next: string
): void => {
    const _e = e as Event;
    _e.preventDefault();
    
    dispatch({
        type    : 'DragAction/DragEndCSV',
        event   : _e,
        next    : next,
    });
    _e.stopPropagation()
}
 
export default AddCSVText
