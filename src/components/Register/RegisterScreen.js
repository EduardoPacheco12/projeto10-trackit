import styled from 'styled-components'
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../img/logo.png'
import { ThreeDots } from  "react-loader-spinner"

export default function RegisterScreen() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    function FinishRegister(e) {
        e.preventDefault();
        setLoading(true)
        const body = {
            email,
            name,
            image,
            password
        }
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", body)

        promise.then( () => {
            navigate("/")
        })
        promise.catch( () => {
            alert("Esses dados já foram utilizados para cadastro")
            setLoading(false)
            setEmail("")
            setPassword("")
            setName("")
            setImage("")
        })
    }

    return (
        <All>
            <Logo>
                <img src={logo} alt="Logo da TrackIt" />
                <h1>TrackIt</h1>
            </Logo>
            <Forms onSubmit={FinishRegister}>
                <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email} disabled={loading === true ? true : false} required/>
                <input type="password" placeholder="senha" onChange={(e) => setPassword(e.target.value)} value={password} minLength={3} disabled={loading === true ? true : false} required/>
                <input type="text" placeholder="nome" onChange={(e) => setName(e.target.value)} value={name} disabled={loading === true ? true : false} required/>
                <input type="url" placeholder="foto" onChange={(e) => setImage(e.target.value)} value={image} disabled={loading === true ? true : false} required/>
                <button type="submit" disabled={loading === true ? true : false}>{loading === true ? <ThreeDots color="#FFFFFF" height={80} width={80} /> : "Cadastrar"}</button>
            </Forms>
            <Click to="/">
                <BackLogin>Já tem uma conta? Faça login!</BackLogin>
            </Click>
        </All>
    )
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
        display: flex;
        justify-content: center;
        align-items: center;
        color: #FFFFFF;
        &:hover {
            cursor: pointer;
        }
    }
`;

const BackLogin = styled.p `
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