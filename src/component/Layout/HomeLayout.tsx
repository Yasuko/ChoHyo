import { Provider } from 'react-redux'
import { Link } from "react-router-dom"
// import 'bootstrap/dist/css/bootstrap.css'

import LoadingAnimation from '../../animation/loading.animation'
import ToasterAnimation from '../../animation/toaster.animation'

// import Component
import NewLayout from './NewLayout'

// import rootReducer from './reducers'
import { createStore } from '../../store/configureStore'

const store = createStore()

const HomeLayout = ({
    page
} :
{ 
    page: string 
}) => {
    return (
        <Provider store={ store }>
            <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3 dark:bg-neutral-800">
                <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
                    <a className="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80 dark:text-white" href="#" aria-label="Brand">ChoHyo</a>
                    <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:ps-5">
                        <Link
                            to="/layout"
                            className="
                                font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                        >Layout</Link>
                        <Link
                            to="/"
                            className="
                            font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                        >Home</Link>
                    </div>
                </nav>
            </header>
            < NewLayout />
            <LoadingAnimation />
            <ToasterAnimation />
        </Provider>
    )
}

export default HomeLayout
