import Option from "./Option"

export default function Question(props){
    const optionElements =props.options.map((option)=>{
        return(
            <Option
            key={option.optionId}
            {...option}
            toggleSelection={()=>props.toggleSelection(props.id,option.optionId)}
            quizEnd={props.quizEnd}
            />
        )
    })
    return(
        <div className="question-container">
            <h3 className="question">{props.question}</h3>
            <div className="options">
                {optionElements}
            </div>
        </div>
    )
}