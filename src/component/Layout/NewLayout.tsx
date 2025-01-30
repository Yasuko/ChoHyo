import { useDispatch, useSelector } from 'react-redux'

// import component
import ListText     from '../Text/ListText'
import ShowText     from '../Text/ShowText'
import AddCSVText   from '../Text/AddCSVText'
import AddTemplate  from '../Template/AddTemplate'
import AddSpecTemplate from '../Template/AddSpecTemplate'
import AddImage     from '../Image/AddImage'

// import reducer
import {
    NewLayoutPropsInterface,
    NewLayoutInterface,
    initialState
} from '../../reducers/_Layout/NewLayout'

export const Newlayout = () => {
    const dispatch = useDispatch()

    const nl: NewLayoutInterface = useSelector((state: NewLayoutPropsInterface) => {
        return state.NewLayout ? state.NewLayout : initialState;
    })

    if (nl.done){
        window.location.href = nl.back;
    }
    return (
        <div className="
            w-svw h-[94svh]
            grid grid-cols-5
            bg-gray-800
        ">
            <div
                className="
                    col-span-3
                    w-full h-full bg-gray-700
                    overflow-y-hidden 
                ">
                <ShowText />
            </div>
            <div className="col-span-2">
            <div className="border-b border-gray-200 dark:border-neutral-700">
                <nav
                    className="flex gap-x-1"
                    aria-label="Tabs"
                    role="tablist"
                    aria-orientation="horizontal">
                    <button
                        type="button"
                        className="
                            hs-tab-active:font-semibold
                            hs-tab-active:border-blue-600
                            hs-tab-active:text-blue-600
                            py-4 px-1 inline-flex items-center
                            gap-x-2 border-b-2 border-transparent
                            text-sm whitespace-nowrap text-gray-500
                            hover:text-blue-600
                            focus:outline-none focus:text-blue-600
                            disabled:opacity-50 disabled:pointer-events-none
                            dark:text-neutral-400 dark:hover:text-blue-500 active"
                        id="tabs-with-underline-item-1"
                        aria-selected="true"
                        data-hs-tab="#tabs-with-underline-1"
                        aria-controls="tabs-with-underline-1"
                        role="tab">
                    SVG
                    </button>
                    <button
                        type="button"
                        className="
                            hs-tab-active:font-semibold
                            hs-tab-active:border-blue-600
                            hs-tab-active:text-blue-600
                            py-4 px-1 inline-flex items-center
                            gap-x-2 border-b-2 border-transparent
                            text-sm whitespace-nowrap text-gray-500
                            hover:text-blue-600
                            focus:outline-none focus:text-blue-600
                            disabled:opacity-50 disabled:pointer-events-none
                            dark:text-neutral-400 dark:hover:text-blue-500"
                        id="tabs-with-underline-item-2"
                        aria-selected="false"
                        data-hs-tab="#tabs-with-underline-2"
                        aria-controls="tabs-with-underline-2"
                        role="tab">
                    Text
                    </button>
                    <button
                        type="button"
                        className="
                            hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-blue-500"
                        id="tabs-with-underline-item-3"
                        aria-selected="false"
                        data-hs-tab="#tabs-with-underline-3"
                        aria-controls="tabs-with-underline-3"
                        role="tab">
                    Image
                    </button>
                </nav>
            </div>

            <div className="mt-3">
                <div
                    id="tabs-with-underline-1"
                    role="tabpanel"
                    aria-labelledby="tabs-with-underline-item-1"
                    className="w-full h-full bg-gray-700">
                        <div className="pt-4">
                            <AddTemplate next="LayoutAction/changeTemplate" />
                        </div>
                        <div className="p-4">
                            <AddSpecTemplate
                                next="LayoutAction/changePaperSpec"
                                paper="A4"
                                orientation="portrait" />
                        </div>
                </div>
                <div
                    id="tabs-with-underline-2"
                    className="
                        hidden
                        w-full h-full bg-gray-800
                    "
                    role="tabpanel"
                    aria-labelledby="tabs-with-underline-item-2">
                    <button
                        type="button"
                        className="
                            ml-6 py-3 px-4 inline-flex items-center gap-x-2
                            text-sm font-medium text-white
                            rounded-lg border border-transparent bg-teal-500 
                            hover:bg-teal-600 focus:outline-none focus:bg-teal-600
                            disabled:opacity-50 disabled:pointer-events-none
                            cursor-pointer"
                        onClick={
                            () => {
                                dispatch({
                                    type    : 'TextAction/add',
                                });
                            }
                        }>
                        Add Text
                    </button>
                    <div className="h-full ">
                        <div className="p-8 h-[80%]">
                            <ListText />
                        </div>
                        <div className="p-8">
                            CSV読み込み
                            <AddCSVText next="LayoutAction/exchangeCSVText" />
                        </div>
                    </div>
                </div>
                <div
                    id="tabs-with-underline-3"
                    className="
                        hidden
                        w-full h-full bg-gray-800
                    "
                    role="tabpanel"
                    aria-labelledby="tabs-with-underline-item-3"
                >
                    <div className="p-8">
                        <AddImage />
                    </div>
                </div>
            </div>
            </div>

            <div
                className="
                    absolute right-8
                    ">
                <button
                    className="
                        py-3 px-4 inline-flex items-center gap-x-2
                        text-sm font-medium text-white
                        rounded-lg border border-transparent bg-amber-400 
                        hover:bg-teal-600 focus:outline-none focus:bg-amber-600
                        disabled:opacity-50 disabled:pointer-events-none
                        cursor-pointer"
                    onClick={
                        () => {
                            dispatch({
                                type    : 'LayoutAction/save',
                            });
                        }
                    }>
                        PDF作成
                </button>
            </div>
        </div>
    )
}


export default Newlayout
