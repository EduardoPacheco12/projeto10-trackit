import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios'
import { CircularProgressbar, buildStyles} from "react-circular-progressbar";
import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../Context/UserContext'
import { TailSpin } from  "react-loader-spinner"
import TodayArray from './TodayArray';

export default function TodayScreen() {
    //LOGIC
    const [tasksToday, setTasksToday] = useState([])
    const [loading, setLoading] = useState(true)
    const {token, imageLogin, percentage, setPercentage} = useContext(UserContext)
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
            setLoading(false)
            const SelectedTasksArray = response.data.filter(e => e.done)
            setPercentage(Math.round((SelectedTasksArray.length/response.data.length) * 100))
        });
        promise.catch(() => {
            alert("A conexão com o servidor foi perdida, faça o login novamente")
            navigate("/")
        });
    }, []);

    //UI
    if( loading === true) {
        return (
            <Loading>
                <TailSpin color="#52B6FF" height={80} width={80} />
            </Loading>
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
                    {<TodayArray tasksToday={tasksToday} setTasksToday={setTasksToday}/>} 
                </Content>
                <Bottom>
                    <Click to="/habitos">
                        <p>Hábitos</p>
                    </Click>
                    <Click to="/hoje">
                        <ProgressBar
                            value={percentage}
                            text="Hoje"
                            background={true}
                            backgroundPadding={6}
                            styles={buildStyles({
                                backgroundColor: "#52B6FF",
                                textColor: "white",
                                pathColor: "white",
                                trailColor: "transparent",
                                textSize: "20px",
                                strokeLinecap: "round",
                                transform: "center center"
                            })}
                        />
                    </Click>
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
    z-index: 1;
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
    margin-top: 70px;
    margin-bottom: 90px;
    max-width: 340px;
    min-width: 270px;
    margin-left: auto;
    margin-right: auto;
`;

const Loading = styled.div `
    display: flex;
    justify-content: center;
    margin-top: 300px;
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
        font-family: "Lexend Deca";
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        text-align: center;
        color: #52B6FF;
        margin-left: 20px;
        margin-right: 20px;
    }
`;

const ProgressBar = styled(CircularProgressbar)`
    margin-bottom: 30px;
    width: 90px;
    height: 90px;
    .CircularProgressbar-text {
        transform: translate(-22px, 8px);
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
    }
`;

const Click = styled(Link) `
    text-decoration: none;
`;