import React, { useRef, useState } from 'react'
import './Quiz.css'
import { data } from '../../assets/data'

const Quiz = () => {

    let [index,setIndex] = useState(0) //0 means we are on first question
    let [question,setQuestion] = useState(data[index])
    let [lock, setLock] = useState(false)
    // for Score
    let [score,setScore] = useState(0)
    // for result
    let [result,setResult] = useState(false)

    // highlighting the correct answer when user clicks on wrong answer
    let Option1 = useRef(null)
    let Option2 = useRef(null)
    let Option3 = useRef(null)
    let Option4 = useRef(null)

    let option_arr = [Option1,Option2,Option3,Option4]

    // check for answer
    const checkAns = (e,ans)=>{
       if(lock === false){
        if(question.ans === ans){
            e.target.classList.add('correct')
            setLock(true)
            setScore(prev => prev + 1)
        }
        else{
            e.target.classList.add('wrong')
            setLock(true)
            option_arr[question.ans-1].current.classList.add('correct')
        }
       }
    }

    // for next button
    const next = ()=>{
        // ensure that user has select the answer
        if(lock === true){
            if(index == data.length -1 ){
                setResult(true)
                return 0
            }

            setIndex(++index);
            setQuestion(data[index]);
            setLock(false)
        // remove the previous selection from the next question
           option_arr.map((option)=>{
            option.current.classList.remove('wrong')
            option.current.classList.remove('correct')
            return null;
           })
            
        }

    }
    // reset button
    const reset = () =>{
        setIndex(0)
        setQuestion(data[0])
        setScore(0)
        setLock(false)
        setResult(false)
        option_arr.map((option)=>{
            option.current.classList.remove('wrong')
            option.current.classList.remove('correct')
            return null;
            })
    }
  return (
    <div className='container'>
      <h1>Quiz App</h1>
      <hr />
      {result?<></>:<>
      
      <h2>{index + 1}. {question.question}</h2>
      <ul>
        <li ref={Option1} onClick={(e)=>checkAns(e,1)}>{question.option1}</li>
        <li ref={Option2} onClick={(e)=>checkAns(e,2)}>{question.option2}</li>
        <li ref={Option3} onClick={(e)=>checkAns(e,3)}>{question.option3}</li>
        <li ref={Option4} onClick={(e)=>checkAns(e,4)}>{question.option4}</li>
      </ul>
      <button onClick={next}>Next</button>
      <div className="index">{index + 1} of {data.length} questions</div></>}
      {result?<><h2 id='result'>You Scored {score} out of {data.length} - {(score/data.length)*100}%</h2>
      <button onClick={reset}>Reset</button>
      </>:<></>}
      
    </div>
  )
}

export default Quiz
