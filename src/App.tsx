import { Link, Route, Routes } from 'react-router-dom'
import  HomePage  from './pages/HomePage'
import HooksPage from './pages/HooksPage'
import CommonPopup from './components/CommonPopup'
import StorePage from './pages/StorePage'
import './App.css'

function App (){

  return (
    <div>
      <nav style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <Link to="/">Home</Link>
        <Link to="/hooks">상태값테스트중</Link>
        <Link to="/store">Store</Link>
      </nav>  
      
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/hooks" element={<HooksPage />}></Route>
        <Route path="/store" element={<StorePage/>} ></Route>
      </Routes>
      
      <CommonPopup></CommonPopup>
    </div>
  )
}

export default App
