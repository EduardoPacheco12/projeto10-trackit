import styled, { createGlobalStyle } from "styled-components";
import { CircularProgressbar, buildStyles} from "react-circular-progressbar";
import { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../Context/UserContext'
import Forms from "./Forms";
import GeneralTask from "./GeneralTask"
import axios from "axios"
import { ThreeDots } from  "react-loader-spinner"

export default function HabitsScreen() {
    //LOGIC
    const {imageLogin, percentage, token} = useContext(UserContext)
    const [generalTasks, setGeneralTasks] = useState([])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);
        promise.then((response) => {
            setGeneralTasks(response.data)
            setLoading(false)
        });
        promise.catch(() => {
            alert("A conexão com o servidor foi perdida, faça o login novamente")
            navigate("/")
        });
    }, []);

    //UI
    if(loading === true) {
        return (
            <Loading>
                <ThreeDots color="#00BFFF" height={80} width={80} />
            </Loading>
        )
    } else {
        if (generalTasks.length === 0) {
            return (
                <>
                    <GlobalStyle />
                    <Top>
                        <h1>TrackIt</h1>
                        <img src={imageLogin} alt="Icone de perfil" />
                    </Top>
                    <CreateHabit>
                        <h2>Meus hábitos</h2>
                        <div>
                            <ion-icon name="add-sharp"></ion-icon>
                        </div>
                    </CreateHabit>
                    <Content>
                        {/* <Forms /> */}
                        <Message>
                            <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
                        </Message>
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
        } else {
            return(
                <>
                    <GlobalStyle />
                    <Top>
                        <h1>TrackIt</h1>
                        <img src={imageLogin} alt="Icone de perfil" />
                    </Top>
                    <CreateHabit>
                        <h2>Meus hábitos</h2>
                        <div>
                            <ion-icon name="add-sharp"></ion-icon>
                        </div>
                    </CreateHabit>
                    <Content>
                        {/* <Forms /> */}
                        <Tasks>
                            {generalTasks.map((task, index) => <GeneralTask key={index} name={task.name}/>)}
                        </Tasks>
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
}
    

//STYLE
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

const CreateHabit = styled.div `
    margin-top: 70px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    h2{
        margin-left: 18px;
        font-family: "Lexend Deca";
        font-weight: 400;
        font-size: 22px;
        line-height: 29px;
        color: #126BA5;
    }
    div{
        width: 40px;
        height: 35px;
        margin-right: 18px;
        background-color: #52B6FF;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    ion-icon{
        font-size: 28px;
        color: #FFFFFF;
    }
`;

const Content = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 90px;
`;

const Message = styled.div `
    width: 338px;
    height: 74px;
    p{
        font-family: "Lexend Deca";
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        color: #666666;
    }
`;

const Tasks = styled.ul `
    max-width: 340px;
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
        margin-left: 36px;
        margin-right: 36px;
    }
`;

const Loading = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
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