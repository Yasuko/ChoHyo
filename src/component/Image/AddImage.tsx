import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

export const AddImage = () => {
    const dispatch = useDispatch();
    return (
        <div
            className="
                w-full h-full
                flex justify-center items-center
            "
        >
            <div
                id="dragimage"
                className="
                    w-[80%] h-96
                    text-center text-gray-200
                    bg-gray-600
                    rounded-lg
                    hover:bg-gray-400
                    drag:bg-gray-100 drag:cursor-pointer
                    cursor-pointer
                "
                onDragOver={(e) => onDragStart(e, dispatch)}
                onDrop={(e) => onDragEnd(e, dispatch)}
            >
                <p className='text-3xl text-center mt-28'>Drag Image</p>
            </div>
        </div>
    );
}

const onDragStart = (
    e: React.DragEvent,
    dispatch: Dispatch
): void => {
    e.preventDefault();
    dispatch({
        type    : 'DragAction/DragStart',
        event   : e,
    })
}

const onDragEnd = (
    e: React.DragEvent,
    dispatch: Dispatch
): void => {
    e.preventDefault();
    
    dispatch({
        type    : 'DragAction/DragEndImage',
        event   : e,
        next    : 'TextAction/addImage',
    });
    e.stopPropagation();
}

export default AddImage
