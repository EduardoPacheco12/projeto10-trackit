import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../Context/UserContext'
import dayjs from 'dayjs/locale/pt-br'

export default function TodayScreen() {
    const [tasksToday, setTasksToday] = useState([])
    const {token, setToken, imageLogin} = useContext(UserContext)
    const dayjs = require('dayjs')
    const navigate = useNavigate()

    useEffect(() => {
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);
        promise.then((response) => {
            setTasksToday(response.data)
            console.log(tasksToday);
        });
        promise.catch(() => {
            alert("A conexão com o servidor foi perdida, faça o login novamente")
            navigate("/")
        });
    }, []);

    //UI
    if (tasksToday.length === 0) {
        return(
            <>
                <GlobalStyle />
                <Top>
                    <h1>TrackIt</h1>
                    <img src={imageLogin} alt="Icone de perfil" />
                </Top>
                <Content>
                    <DayWeeknd>
                        <h2>{dayjs().day()}, {dayjs().locale('pt-br').date()}/0{dayjs().locale('pt-br').month() + 1}</h2>
                        <p>Você não tem nenhum hábito planejado pra hoje</p>
                    </DayWeeknd>
                </Content>
                <Bottom>
                    <p>Hábitos</p>
                    <Click to="/historico">
                        <p>Histórico</p>
                    </Click>
                </Bottom>
            </>
        )
    } else {
        return(
            <>
                <GlobalStyle />
                <Top>
                    <h1>TrackIt</h1>
                    <img src={imageLogin} alt="Icone de perfil" />
                </Top>
                <Content>
                    <DayWeeknd>
                        <h2>Segunda, {dayjs().date()}/{dayjs().month()}</h2>
                        <p>Nenhum hábito concluído ainda</p>
                    </DayWeeknd>
                    <Tasks>
                    </Tasks>
                </Content>
                <Bottom>
                    <p>Hábitos</p>
                    <Click to="/historico">
                        <p>Histórico</p>
                    </Click>
                </Bottom>
            </>
        )
    }  
}

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #E5E5E5;
  }
`;

const Top = styled.header `
    height: 70px;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1 {
        margin-left: 18px;
        font-family: 'Playball';
        font-weight: 400;
        font-size: 40px;
        line-height: 48px;
        color: #FFFFFF;
    }
    img {
        width: 50px;
        height: 50px;
        border-radius: 98px;
        margin-right: 18px;
    }
`;

const Content = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 70px;
`;

const DayWeeknd = styled.div `
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 340px;
    min-width: 270px;
    h2 {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 22px;
        line-height: 30px;
        color: #126BA5;
    }
    p {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        color: #BABABA;
    }
`;

const Tasks = styled.div `
    background-color: red;
    height: 70px;
    max-width: 340px;
    min-width: 270px;
`;

const Bottom = styled.footer `
    height: 70px;
    background-color: #FFFFFF;
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        text-align: center;
        color: #52B6FF;
        margin-left: 36px;
        margin-right: 36px;
    }
`;

const Click = styled(Link) `
    text-decoration: none;
`;