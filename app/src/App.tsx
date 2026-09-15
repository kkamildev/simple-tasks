
import './App.css'
import "./Utils/Components/style.css"
import LandingPage from './Pages/LandingPage'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import MainPage from './Pages/MainPage'

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/app" element={<MainPage/>}/>
        </Routes>
      
      </BrowserRouter>
  )
}

export default App
