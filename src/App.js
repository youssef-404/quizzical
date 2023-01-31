import { useState,useEffect } from "react";
import Question from "./components/Question";
import { nanoid } from 'nanoid'

export default function App() {
  const [quizStart,setQuizStart] =useState(!false)
  const [questions,setQuestions]=useState([])

  useEffect(()=>{
    async function getQuestions() {
      const res = await fetch("https://opentdb.com/api.php?amount=10")
      const data = await res.json()
      setQuestions(data.results)
    }
    getQuestions()
  },[])

  const questionElements=questions.map((question)=>{
    return(
      <Question
      key={nanoid()}
      {...question}
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
          <button>Check answers</button>
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


