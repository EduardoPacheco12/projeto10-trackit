import styled from "styled-components"
import axios from "axios"
import { useContext } from "react"
import UserContext from "../Context/UserContext"

function WordButton(props) {
    return(
        <DayWeek selected={props.selected}>
            <p>{props.word}</p>
        </DayWeek>
    )
}

export default function GeneralTask(props) {
    //LOGIC
    const weekday = ["D", "S", "T", "Q", "Q", "S", "S"]
    const {token} = useContext(UserContext)
    function deleteHabit() {
        const confirm = window.confirm("Deseja deletar esse hábito?")
        if(confirm) {
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
            const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${props.id}`, config)
            promise.then(() => {
                const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
                request.then(response => {
                    props.setGeneralTasks(response.data)
                })
            })
        }
    }
    //UI
    return(  
        <Task>
            <h3>{props.name}</h3>
            <ul>
                {weekday.map((word, index) => <WordButton key={index} word={word} selected={props.days.some(day => day === index)}/>)}
            </ul>
            <ion-icon onClick={deleteHabit} name="trash-outline"></ion-icon>
        </Task>
    )
}

const Task = styled.li `
    width: 340px;
    min-height: 90px;
    background-color: #FFFFFF;
    border-radius: 5px;
    margin-bottom: 10px;
    position: relative;
    h3{
        font-family: "Lexend Deca";
        font-weight: 400;
        font-size: 20px;
        line-height: 25px;
        color: #666666;
        padding-top: 6px;
        margin-left: 15px;
        margin-right: 35px;
        margin-bottom: 10px;
        word-wrap: break-word;
    }
    ul{
        display: flex;
        margin-top: 8px;
        margin-left: 14px;
    }
    ion-icon {
        position:absolute;
        font-size: 20px;
        top: 10px;
        right: 10px;
    }
`;

const DayWeek = styled.li `
    width: 30px;
    height: 30px;
    background-color: ${props => props.selected ? "#DBDBDB" : "#FFFFFF"};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 4px;
    p{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 25px;
        color: ${props => props.selected ? "#FFFFFF" : "#DBDBDB"};
    }
`;