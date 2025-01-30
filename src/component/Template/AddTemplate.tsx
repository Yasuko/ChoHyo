import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

// import component

// import reducer

export const AddTemplate = ({
    next
}: {
    next: string
}) => {
    const dispatch = useDispatch()

    return (
        <div className="">
            <div
                className="
                    flex justify-center items-center
                ">
                <div
                    id="svgtarget"
                    className="
                        w-[80%] h-96 bg-gray-200 dark:bg-neutral-100
                        text-center
                        rounded-lg
                        "
                    onDragOver={(e) => onDragStart(e)}
                    onDrop={(e) => onDragEnd(e, next, dispatch)}>
                        <p className='pt-28 text-gray-500'>Drag SVG File</p>
                </div>
            </div>
        </div>
    );
}

const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
): void => {
    const _e = e;
    _e.preventDefault();
}

const onDragEnd = (
    e: React.DragEvent<HTMLDivElement>,
    next: string,
    dispatch: Dispatch
): void => {
    const _e = e;
    _e.preventDefault();
    
    dispatch({
        type    : 'DragAction/DragEnd',
        event   : _e,
        next    : next,
    });
    _e.stopPropagation();
}

export default AddTemplate
