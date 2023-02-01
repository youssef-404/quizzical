import Option from "./Option"
import { useState } from "react"

export default function Question(props){
    // console.log(props.id)
    const optionElements =props.options.map((option)=>{
        return(
            <Option
            key={option.optionId}
            {...option}
            toggleSelection={()=>props.toggleSelection(props.id,option.optionId)}  
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