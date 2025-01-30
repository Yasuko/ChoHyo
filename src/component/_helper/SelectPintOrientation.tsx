import { useDispatch } from 'react-redux'

interface PrintOrientation {
    selected?   : 'landscape' | 'portrait',
    next        : string,
}

export const SelectPrintOrientation = ({
    selected,
    next
}: PrintOrientation) => {
    const dispatch = useDispatch()
    let select = [false, false]
    if (selected !== undefined) {
        select = (selected === 'portrait') ? [ true, false ] : [false, true];
    } 

    return (
        <div>
            <div
                className="
                    text-2xl
                    text-gray-400
                ">
                <p>Orientation</p>
            </div>
            <div
                className="
                    flex justify-center items-center
                    text-gray-200
                ">
                <div className="mx-4 flex">
                    <input
                        type="radio"
                        name="rotate"
                        id="custom-radio-1a"
                        defaultChecked={select[0]}
                        className="
                            shrink-0 mt-0.5 border-gray-200
                            rounded-full
                            text-blue-600
                            focus:ring-blue-500
                            disabled:opacity-50 disabled:pointer-events-none
                            dark:bg-neutral-800 dark:border-neutral-700
                            dark:checked:bg-blue-500 dark:checked:border-blue-500
                            dark:focus:ring-offset-gray-800"
                        onChange={
                            () => dispatch({
                                type        : next,
                                orientation : 'portrait',
                            })
                        } />
                    <label
                        htmlFor="hs-checked-radio"
                        className="
                            text-sm text-gray-500
                            ms-2 dark:text-neutral-200">
                            縦向き
                    </label>
                </div>
                <div className="mx-4 flex">
                    <input
                        type="radio"
                        name="rotate"
                        id="custom-radio-1b"
                        defaultChecked={select[1]}
                        className="
                            shrink-0 mt-0.5 border-gray-200
                            rounded-full
                            text-blue-600
                            focus:ring-blue-500
                            disabled:opacity-50 disabled:pointer-events-none
                            dark:bg-neutral-800 dark:border-neutral-700
                            dark:checked:bg-blue-500 dark:checked:border-blue-500
                            dark:focus:ring-offset-gray-800"
                        onChange={
                            () => dispatch({
                                type    : next,
                                orientation   : 'landscape',
                            })
                        }
                    />
                    <label
                        className="
                            text-sm text-gray-500
                            ms-2 dark:text-neutral-200"
                        htmlFor="custom-radio-1b">
                            横向き
                    </label>
                </div>
            </div>
        </div>
    );
}

export default SelectPrintOrientation
