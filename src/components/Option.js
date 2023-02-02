

export default function Option(props){
    return(
        <div className={
            `option 
            ${props.isChoosed?"option-clicked":""}
            ${props.quizEnd && props.isChoosed && !props.Correct?"option-incorrect":""}
            ${props.quizEnd && props.isCorrect?"option-correct":""}
            `
        }
        onClick={props.toggleSelection}
        >
            {props.value}
        </div>
    )
}