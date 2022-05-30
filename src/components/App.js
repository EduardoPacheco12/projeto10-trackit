import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import { useState } from 'react'
import '../assets/css/reset.css'
import '../assets/css/style.css'
import LoginScreen from './Login/LoginScreen'
import RegisterScreen from './Register/RegisterScreen'
import HabitsScreen from './Habits/HabitsScreen'
import TodayScreen from './Today/TodayScreen'
import HistoricScreen from './Historic/HistoricScreen'
import UserContext from './Context/UserContext'

export default function App() {
    const [token, setToken] = useState("")
    const [imageLogin, setImageLogin] = useState("")
    const [percentage, setPercentage] = useState(0)

    //UI
    return( 
        <UserContext.Provider value={{ token, setToken, imageLogin, setImageLogin, percentage, setPercentage }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginScreen />} />
                    <Route path="/cadastro" element={<RegisterScreen />}/>
                    <Route path="/habitos" element={<HabitsScreen />} />
                    <Route path="/hoje" element={<TodayScreen />} />
                    <Route path="/historico" element={<HistoricScreen />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}