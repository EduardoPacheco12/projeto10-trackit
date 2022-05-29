import styled from "styled-components"

function WordButton(props) {
    return(
        <li>
            <p>{props.word}</p>
        </li>
    )
}

export default function Forms() {
    //LOGIC
    const weekday = ["D", "S", "T", "Q", "Q", "S", "S"]
    //UI
    return(
        <Form>
            <input type="text" placeholder="nome do hábito"/>
            <ul>
                {weekday.map((word, index) => <WordButton key={index} word={word}/>)}
            </ul>
            <Save type="submit">Salvar</Save>
            <Cancel>Cancelar</Cancel>
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
    li{
        width: 30px;
        height: 30px;
        background-color: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 4px;
    }
    p{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 25px;
        color: #DBDBDB;
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