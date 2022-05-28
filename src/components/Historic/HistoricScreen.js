import styled, { createGlobalStyle } from "styled-components";
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles} from "react-circular-progressbar";
import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../Context/UserContext'

export default function HistoricScreen() {
    const [percentage, setPercentage] = useState(25)
    const {imageLogin} = useContext(UserContext)
    return (
        <>
            <GlobalStyle />
            <Top>
                <h1>TrackIt</h1>
                <img src={imageLogin} alt="Icone de perfil" />
            </Top>
            <Content>
                <div>
                    <h2>Histórico</h2>
                    <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
                </div>
            </Content>
            <Bottom>
                <Click to="/habitos">
                    <p>Hábitos</p>
                </Click>
                <Click to="/hoje">
                    <CircularProgressbar
                        value={percentage}
                        text="Hoje"
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                            backgroundColor: "#3E98C7",
                            textColor: "#FFF",
                            pathColor: "#FFF",
                            trailColor: "transparent",
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
    margin-top: 70px;
    div {
        height: 140px;
        margin-left: auto;
        margin-right: auto;
        width: 375px;
        min-width: 280px;
    }
    h2 {
        padding-top: 28px;
        margin-left: 18px;
        margin-bottom: 18px;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 22px;
        line-height: 29px;
        color: #126BA5;
    }
    p {
        margin-left: 18px;
        margin-right: 18px;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        color: #666666;
    } 
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