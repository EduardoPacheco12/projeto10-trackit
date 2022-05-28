import styled from 'styled-components'
import axios from 'axios'
import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../Context/UserContext'
import logo from '../img/logo.png'

export default function LoginScreen() {
    //LOGIC
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {setToken, setImageLogin} = useContext(UserContext)
    const navigate = useNavigate();

    function FinishLogin(e) {
        e.preventDefault();
        const body = {
            email,
            password
        }
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", body)
        promise.then( response => {
            setToken(response.data.token)
            setImageLogin(response.data.image)
            navigate("/hoje")
        })
        promise.catch(() => {
            alert("Não foi possível fazer o login, tente novamente.")
            setEmail("")
            setPassword("")
        })
    }

    //UI
    return(
        <All>
            <Logo>
                <img src={logo} alt="Logo da TrackIt" />
                <h1>TrackIt</h1>
            </Logo>
            <Forms onSubmit={FinishLogin}>
                <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email} required/>
                <input type="password" placeholder="senha" onChange={(e) => setPassword(e.target.value)} value={password} required/>
                <button type="submit">Entrar</button>
            </Forms>
            <Click to="/cadastro">
                <BackRegister>Não tem uma conta? Cadastre-se!</BackRegister>
            </Click>
        </All>
    );
}

const All = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Logo = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 68px;
    h1{
        font-family: 'Playball';
        font-weight: 400;
        font-size: 70px;
        line-height: 86px;
        text-align: center;
        color: #126BA5;
    }
`;

const Forms = styled.form `
    display: flex;
    flex-direction: column;
    min-width: 270px;
    max-width: 300px;
    margin-top: 50px;
    input {
        height: 45px;
        background-color: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        margin-bottom: 6px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        color: #666666;    
        padding-left: 10px; 
        ::-webkit-input-placeholder {
            font-family: 'Lexend Deca';
            font-weight: 400;
            font-size: 20px;
            line-height: 25px;
            color: #DBDBDB;
        }
    }
    button {
        height: 45px;
        background-color: #52B6FF;
        border: 1px solid #52B6FF;
        border-radius: 5px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 22px;
        line-height: 26px;
        text-align: center;
        color: #FFFFFF;
        &:hover {
            cursor: pointer;
        }
    }
`;

const BackRegister = styled.p `
    margin-top: 25px;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 13.976px;
    line-height: 17px;
    text-align: center;
    text-decoration-line: underline;
    color: #52B6FF;
    &:hover {
            cursor: pointer;
    }
`;

const Click = styled(Link) `
    text-decoration: none;
`;