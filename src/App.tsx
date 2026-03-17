import { Link, Route, Routes } from 'react-router-dom'
import  HomePage  from './pages/HomePage'
import HooksPage from './pages/HooksPage'
import CommonPopup from './components/CommonPopup'
import StorePage from './pages/StorePage'
import ArrayTest from './pages/ArrayTest'

import './App.css'

function App (){

  return (
    <div>
      
      <div className="page">
        <nav className="tab-menu">
            <Link to="/">Home</Link>
            <Link to="/hooks" className='active'>상태값테스트중</Link>
          <Link to="/store">Store</Link>
          <Link to="/array">Array Test</Link>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/hooks" element={<HooksPage />}></Route>
        <Route path="/store" element={<StorePage />} ></Route>
        <Route path="/array" element={<ArrayTest/>} ></Route>
      </Routes>
      
      <CommonPopup></CommonPopup>
    </div>
  )
}

export default App
