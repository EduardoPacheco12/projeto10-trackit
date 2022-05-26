import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import '../assets/css/reset.css';
import '../assets/css/style.css';
import LoginScreen from './Login/LoginScreen';
import RegisterScreen from './Register/RegisterScreen';
import HabitsScreen from './Habits/HabitsScreen';
import TodayScreen from './Today/TodayScreen';
import HistoricScreen from './Historic/HistoricScreen';

export default function App() {
    return( 
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginScreen />} />
                <Route path="/cadastro" element={<RegisterScreen />}/>
                <Route path="/habitos" element={<HabitsScreen />} />
                <Route path="/hoje" element={<TodayScreen />} />
                <Route path="/historico" element={<HistoricScreen />} />
            </Routes>
        </BrowserRouter>
    );
}