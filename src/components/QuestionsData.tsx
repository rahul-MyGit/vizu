import React from 'react'


const QuestionsData = (quiz : any) => {
    console.log(quiz);
    
  return (
    <>
    <div>QuestionsData is :</div>
    <p className='p-2xl bg-green-200 font-medium'>
        {
            quiz.map((quizData: any) => {
                <div>{quizData}</div>
            })
        }
    </p>
    </>
  )
}

export default QuestionsData