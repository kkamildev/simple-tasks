
import './App.css'
import "./Utils/Components/style.css"
import LandingPage from './Pages/LandingPage'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import MainPage from './Pages/MainPage'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/app" element={<MainPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
        </Routes>
      
      </BrowserRouter>
  )
}

export default App
