import { useState, useContext } from "react"
import styled from "styled-components"
import axios from "axios"
import UserContext from '../Context/UserContext'

function WordButton(props) {
    //LOGIC
    const [selected, setSelected] = useState(false);

    function pushArray() {
        const newDays = [...props.days];
        if (selected === false) {
            newDays.push(props.day)
            props.setDays(newDays)
            setSelected(!selected)
        } else {
            props.setDays((num) => num.filter((selected) => selected !== props.day))
            setSelected(!selected)
        }
    }

    //UI
    return(
        <DayWeek onClick={pushArray} selected={selected}>
            <p>{props.word}</p>
        </DayWeek>
    )
}

export default function Forms(props) {
    //LOGIC
    const weekday = ["D", "S", "T", "Q", "Q", "S", "S"]
    const [newHabit, setNewHabit] = useState("")
    const [days, setDays] = useState([])
    const {token} = useContext(UserContext)

    function FinishHabit(e) {
        e.preventDefault()
        const body = {
            name: newHabit,
            days: days
        }
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", body, config)
        
        promise.then((response) => {
            props.setGeneralTasks([...props.generalTasks, response.data])
            props.setAdd(false)
        })
    }
    //UI
    return (
        <Form onSubmit={FinishHabit}>
            <input type="text" placeholder="nome do hábito" required onChange={(e) => setNewHabit(e.target.value)} value={newHabit}/>
            <ul>
                {weekday.map((word, index) => <WordButton key={index} day={index} word={word} days={days} setDays={setDays}/>)}
            </ul>
            <Save type="submit">Salvar</Save>
            <Cancel type="button" onClick={(e) => {e.preventDefault(); props.setAdd(false)}}>Cancelar</Cancel>
        </Form>
    )
}

const Form = styled.form `
    width: 340px;
    height: 180px;
    background-color: #FFFFFF;
    border-radius: 5px;
    margin-bottom: 30px;
    position: relative;
    input {
        width: 300px;
        height: 45px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        margin-top: 18px;
        margin-left: 14px;
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
    ul{
        display: flex;
        margin-top: 8px;
        margin-left: 14px;
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

const Save = styled.button `
    position: absolute;
    width: 84px;
    height: 35px;
    background-color: #52B6FF;
    border: 1px solid #52B6FF;
    border-radius: 5px;
    bottom: 16px;
    right: 16px;
    font-family: "Lexend Deca";
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #FFFFFF;
`;

const Cancel = styled.button `
    position: absolute;
    width: 84px;
    height: 35px;
    background-color: #FFFFFF;
    border: 1px solid #FFFFFF;
    border-radius: 5px;
    bottom: 16px;
    right: 122px;
    font-family: "Lexend Deca";
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #52B6FF;
`;