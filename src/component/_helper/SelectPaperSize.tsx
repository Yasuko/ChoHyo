import { Dispatch } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"

export const SelectPaperSize = ({
    selected,
    next
}: {
    selected: string,
    next: string
}) => {
    const dispatch = useDispatch();
    return (
        <div className="">
            <label
                className="
                text-2xl
                text-gray-400
                "
            >
                <p>Paper Size</p>
            </label>
            <div
                className="
                    flex justify-center items-center
                    text-gray-200
                ">
                {paperList(selected, next, dispatch)}
            </div>
        </div>
    );
}

const paperList = (
    selected: string,
    next: string,
    dispatch: Dispatch,
) => {
    let key = 0;
    const list = ['A3', 'A4', 'A5', 'B3', 'B4', 'B5'].map((value) => {
        const _selected = (selected && selected === value) ? true : false
        key++
                        
        return <div className="m-4" key={key}>
            <input
                type="radio"
                className="
                    shrink-0 mt-0.5 border-gray-200
                    rounded-full
                    text-blue-600
                    focus:ring-blue-500
                    disabled:opacity-50 disabled:pointer-events-none
                    dark:bg-neutral-800 dark:border-neutral-700
                    dark:checked:bg-blue-500 dark:checked:border-blue-500
                    dark:focus:ring-offset-gray-800"
                name="paper-size"
                defaultChecked={_selected}
                id={"custom-radio-1" + value}
                onChange={
                    () => dispatch({
                        type    : next,
                        paper   : value,
                    })
                }
            />
            <label
                className="
                    text-sm text-gray-500
                    ms-2 dark:text-neutral-200"
                htmlFor={"custom-radio-1" + value}>
                    {value}
            </label>
        </div>
    })
    return list
}

export default SelectPaperSize
