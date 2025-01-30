import { Provider } from 'react-redux'
import { Link } from "react-router-dom"
// import 'bootstrap/dist/css/bootstrap.css'

// import rootReducer from './reducers'
import { createStore } from '../store/configureStore'

const store = createStore()

export const ChoHyo = (
) => {
    return (
    <Provider store={ store }>
        <div className='bg-gray-800'>
            <h1 className="
                    text-4xl text-right
                    text-gray-600
                    mr-8
                    ">Layout</h1>
        </div>
        <div className="
            w-svw h-svh bg-gray-900
            grid grid-cols-5
        ">
            <div className="
                col-start-1 col-span-2 my-4 ms-8 w-full h-1/2
                rounded-lg
                bg-gray-200
            ">
                <div className="
                    p-8 text-gray-600 font-bold
                ">
                    <h1 className="">Layout (svg)</h1>
                    <p className="">レイアウト作成・出力</p>
                    <hr className="" />
                    <p>SVGレイアウトの作成、印刷</p>
                    <Link
                        to="/layout"
                        className="flex right-0 text-[3em] text-red-800">Start</Link>
                </div>
            </div>
            <div className="
                col-start-1 col-span-2 my-4 ms-8 w-full h-1/2
                rounded-lg
                bg-gray-200
            ">
                <div className="
                    p-8 text-gray-600 font-bold
                ">
                    <h1 className="">Layout (excell)</h1>
                    <p className="">レイアウト作成・出力</p>
                    <hr className="" />
                    <p>Excellレイアウトの作成、印刷</p>
                    <Link
                        to="/layout_excell"
                        className="flex right-0 text-[3em] text-red-800">Start</Link>
                </div>
            </div>
        </div>
    </Provider>
    )
}

export default ChoHyo