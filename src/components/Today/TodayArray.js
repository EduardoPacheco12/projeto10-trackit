import { useContext } from 'react'
import styled from 'styled-components'
import DailyTask from './DailyTask'
import UserContext from '../Context/UserContext'

export default function TodayArray(props) {
    //LOGIC
    const dayjs = require('dayjs')
    const weekday = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"]
    const {percentage, setPercentage} = useContext(UserContext)
    //UI
    if (props.tasksToday.length === 0) {
        return(
            <DayWeeknd>
                <h2>{weekday[dayjs().day()]}, {dayjs().locale('pt-br').date()}/0{dayjs().locale('pt-br').month() + 1}</h2>
                <EmptyMessage>Você não tem nenhum hábito planejado pra hoje</EmptyMessage>
            </DayWeeknd>
        )
    } else {
        return(
            <>
                <DayWeeknd>
                    <h2>{weekday[dayjs().day()]}, {dayjs().locale('pt-br').date()}/0{dayjs().locale('pt-br').month() + 1}</h2>
                    <Message tasksToday={props.tasksToday}>{props.tasksToday.filter(index => index.done).length === 0 ? "Nenhum hábito concluído ainda" : `${percentage}% dos hábitos concluidos`}</Message>
                </DayWeeknd>
                <Tasks>
                    {props.tasksToday.map((task, index) => <DailyTask key={index} id={task.id} habit={task.name} currentSequence={task.currentSequence} highestSequence={task.highestSequence} selected={task.done} setTasksToday={props.setTasksToday}/>)}
                </Tasks>
            </>
        )
    }
}

const DayWeeknd = styled.div `
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h2 {
        font-family: "Lexend Deca";
        font-weight: 400;
        font-size: 22px;
        line-height: 30px;
        color: #126BA5;
    }
`;

const EmptyMessage = styled.p `
    font-family: "Lexend Deca";
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    color: #BABABA
`

const Message = styled.p `
    font-family: "Lexend Deca";
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    color: ${props => props.tasksToday.filter(index => index.done).length === 0 ? "#BABABA" : "#8FC549"};
`;

const Tasks = styled.ul `
    max-width: 340px;
    min-width: 270px;
    li{
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        min-height: 94px;
        background: #FFFFFF;
        border-radius: 5px;
        box-sizing: border-box;
        
    }
`;