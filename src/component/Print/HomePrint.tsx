import { Provider } from 'react-redux'
import { Link } from "react-router-dom"
import '../_style/app.scss'

import LoadingAnimation from '../../animation/loading.animation'
import ToasterAnimation from '../../animation/toaster.animation'

// import Components
import NewPrint from './NewPrint';

// import rootReducer from './reducers'
import { createStore } from '../../store/configureStore';

const store = createStore();

const HomePrint = () => {

  return (
    <Provider store={ store }>
      <nav className="navbar navbar-dark bg-dark">
        <Link to="/template" className="large_link navbar-brand">Print</Link>
        <Link to="/" className="large_link navbar-brand">Home</Link>
      </nav>
      <div className="container-fluid">
          <div className="container">
            <NewPrint />
          </div>
      </div>
      <LoadingAnimation />
      <ToasterAnimation />
    </Provider>
  )
}


export default HomePrint