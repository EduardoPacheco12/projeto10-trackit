export default function DailyTask(props) {
    //LOGIC
    //UI
    return(
        <li>
            <div>
                <h3>{props.habit}</h3>
                <p>Sequência atual: {props.currentSequence} dia(s)</p>
                <p>Seu recorde: {props.highestSequence} dia(s)</p>
            </div>
            <ion-icon name="checkbox"></ion-icon>
        </li>
    )
}