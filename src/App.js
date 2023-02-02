import { useState,useEffect } from "react";
import Question from "./components/Question";
import { nanoid } from 'nanoid'

export default function App() {
  const [quizStart,setQuizStart] =useState(false)
  const [quizEnd,setQuizEnd] =useState(false)
  const [reset,setReset] =useState(false)
  const [score,setScore] =useState(0)
  const [questions,setQuestions]=useState([])

  const decodeHtmlCharCodes = str => {
    const decodedString = document.createElement("textarea");
    decodedString.innerHTML = str;
    return decodedString.value;
}

  useEffect(()=>{
    async function getQuestions() {
      const res = await fetch("https://opentdb.com/api.php?amount=10")
      const data = await res.json()
      
      const questionData=data.results.map((element)=>{
        const allOptions=element.incorrect_answers.map(item=>{
          return({
            optionId:nanoid(),
            value:decodeHtmlCharCodes(item),
          isCorrect:false,
          isChoosed:false
          })
        })
        allOptions.push({
          optionId:nanoid(),
          value:decodeHtmlCharCodes(element.correct_answer),
              isCorrect:true,
              isChoosed:false
      })
  
      allOptions.sort(() => Math.random() - 0.5);
        return({
          id:nanoid(),
          question:decodeHtmlCharCodes(element.question),
          options:allOptions
        })
      })
      setQuestions(questionData)
    }
    getQuestions()
  },[reset])

  function toggleSelection(id,optionId){
    if(!quizEnd){
      setQuestions((prevQuestions)=>{
        return prevQuestions.map((question)=>{
          if(question.id===id){
            return ({
              ...question,
              options:question.options.map(option=>{
                return option.optionId!==optionId?
                {
                  ...option,
                  isChoosed:false
                }
                :
                {
                  ...option,
                  isChoosed:!option.isChoosed
                }
              })
            })
         

        }else{
          return question
        }
      })
    })
  }
  }

  function checkResults(){
    if(!quizEnd){
      setQuizEnd(true)
      questions.forEach((question)=>{
        if(question.options.find(option=>option.isChoosed && option.isCorrect)){
          setScore(prevScore=>prevScore+1)
        }
      })
    }else{
      setScore(0)
      setQuizEnd(false)
      setQuizStart(false)
      setReset(prevState=>!prevState)
    }
  }

  const questionElements=questions.map((question)=>{
    return(
      <Question
      key={question.id}
      {...question}
      toggleSelection={toggleSelection}
      quizEnd={quizEnd}
      />
    )
  })

  return (
    <>
      <div className="cercle cercle-up"></div>
      <div className="cercle cercle-down"></div>
    {quizStart?

      <div className="second-page">
        {questionElements}
        <div className="buttons">
          {quizEnd?
          <p>You scored {`${score}/${questions.length}`} correct answers</p>:""
        }
          <button onClick={checkResults}>{quizEnd?"New quiz":"Check answers"}</button>
        </div>
      </div>
    :
      <div className="first-page">
        <h3>Quizzical</h3>
        <p>Test your skills and see if you've got the winning answers!</p>
        <button onClick={()=>setQuizStart(true)}>Start quiz</button>
      </div>
      }
    </>
  );
}


