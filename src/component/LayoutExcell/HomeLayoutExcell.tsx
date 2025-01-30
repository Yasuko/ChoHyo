
import { Provider } from 'react-redux'
import { Link } from "react-router-dom"

import LoadingAnimation from '../../animation/loading.animation'
import ToasterAnimation from '../../animation/toaster.animation'

// import Component
import NewLayoutExcell from './NewLayoutExcell'

// import rootReducer from './reducers'
import { createStore } from '../../store/configureStore'

const store = createStore()

const HomeLayoutExcell = () => {
    return (
        <Provider store={ store }>
        <nav className="navbar navbar-dark bg-dark">

            <Link to="/layout_excell" className="large_link navbar-brand">Layout</Link>
            <Link to="/" className="large_link navbar-brand">Home</Link>
        </nav>
        <div className="container-fluid">
            <NewLayoutExcell />
        </div>
        <LoadingAnimation />
        <ToasterAnimation />
        </Provider>
    )
}

export default HomeLayoutExcell
