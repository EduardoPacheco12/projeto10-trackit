import { useContext, useState } from "react";
import styled from "styled-components"
import axios from "axios"
import UserContext from "../Context/UserContext";

function Sequences(props) {
    if (props.highestSequence === props.currentSequence && props.currentSequence !== 0) {
        return (
            <>
                <p>Sequência atual: <ColorText selected={props.selected}>{props.currentSequence} dia(s)</ColorText></p>
                <p>Seu recorde: <ColorText selected={props.selected}>{props.highestSequence} dia(s) </ColorText></p>
            </>
        )
    } else {
        return (
            <>
                <p>Sequência atual: <ColorText selected={props.selectedTask}>{props.currentSequence} dia(s)</ColorText></p>
                <p>Seu recorde: {props.highestSequence} dia(s)</p>
            </>
        )
    }
    
}

export default function DailyTask(props) {
    //LOGIC
    const [selectedTask, setSelectedTask] = useState(props.selected)
    const {token, setPercentage} = useContext(UserContext)

    function Mark() {
        if(selectedTask === true) {
            setSelectedTask(false)
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${props.id}/uncheck`,null, config)
            promise.then(() => {
                const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)
                request.then(response => {
                    props.setTasksToday(response.data)
                    const SelectedTasksArray = response.data.filter(e => e.done)
                    setPercentage(Math.round((SelectedTasksArray.length/response.data.length) * 100))
                })
            })
        } else {
            setSelectedTask(true)
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${props.id}/check`,null, config)
            promise.then(() => {
                const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)
                request.then(response => {
                    props.setTasksToday(response.data)
                    const SelectedTasksArray = response.data.filter(e => e.done)
                    setPercentage(Math.round((SelectedTasksArray.length/response.data.length) * 100))
                })
            })
        }
    }
    //UI
    return(
        <li>
            <Text>
                <h3>{props.habit}</h3>
                <Sequences selected={selectedTask} currentSequence={props.currentSequence} highestSequence={props.highestSequence}/>
                
            </Text>
            <Icon selected={selectedTask} onClick={Mark}>
                <ion-icon name="checkbox"></ion-icon>
            </Icon>
        </li>
    )
}

const Text = styled.div`
    max-width: 220px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 12px;
    margin-bottom: 12px;
    margin-left: 15px;
    margin-right: 15px;
    box-sizing: border-box;
    h3{
        font-family: "Lexend Deca";
        font-weight: 400;
        font-size: 20px;
        line-height: 25px;
        color: #666666;
        margin-bottom: 6px;
        word-wrap: break-word;
    }
    p{
        font-family: "Lexend Deca";
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        color: #666666;
    }
`;

const ColorText = styled.span `
    color: ${props => props.selected ? "#8FC549" : "#666666"};
`;

const Icon = styled.div `
    color: ${props => props.selected ? "#8FC549" : "#EBEBEB"};
    ion-icon{
        
        font-size: 100px;
        margin-top: auto;
        margin-bottom: auto;
    }
    
`