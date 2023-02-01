import Option from "./Option"
import { useState } from "react"

export default function Question(props){

    const optionElements =props.options.map((option)=>{
        return(
            <Option
            {...option}  
            />
        )
    })
    console.log(props)
    return(
        <div className="question-container">
            <h3 className="question">{props.question}</h3>
            <div className="options">
                {optionElements}
            </div>
        </div>
    )
}