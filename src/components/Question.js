import Option from "./Option"
import { useState } from "react"

export default function Question(props){
    const decodeHtmlCharCodes = str => {
        const decodedString = document.createElement("textarea");
        decodedString.innerHTML = str;
        return decodedString.value;
    }


    const allOptions =props.incorrect_answers.map((item)=>{
        return({
            value:item,
            isCorrect:false,
            isChoosed:false
        })
    })
    allOptions.push({
        value:props.correct_answer,
            isCorrect:true,
            isChoosed:false
    })

    allOptions.sort(() => Math.random() - 0.5);
    
    const [options,setOptions] =useState(allOptions)

    const optionElements =options.map((option)=>{
        return(
            <Option 
                {...option}
                decodeHtmlCharCodes={decodeHtmlCharCodes}  
            />
        )
    })
    return(
        <div className="question-container">
            <h3 className="question">{decodeHtmlCharCodes(props.question)}</h3>
            <div className="options">
                {optionElements}
            </div>
        </div>
    )
}