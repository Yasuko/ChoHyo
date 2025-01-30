import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import('preline')

// import component
import ChoHyo from './component/chohyo'
import HomeLayout from './component/Layout/HomeLayout'
import HomeLayoutExcell from './component/LayoutExcell/HomeLayoutExcell'
import HomePrint from './component/Print/HomePrint'

import './App.css'

createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={ <ChoHyo /> }></Route>
      <Route path="/layout" element={ <HomeLayout page="" /> }></Route>
      <Route path="/layout/new" element={ <HomeLayout page="new" /> }></Route>
      <Route path="/layout/edit" element={ <HomeLayout page="edit" /> }></Route>
      <Route path="/layout_excell" element={ <HomeLayoutExcell /> }></Route>
      <Route path="/layout_excell/new" element={ <HomeLayoutExcell /> }></Route>
      <Route path="/print/new" element={ <HomePrint /> }></Route>
    </Routes>
  </BrowserRouter>
)