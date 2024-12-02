import { auth } from '@/lib/auth'
import { fetchQuizDataUsingQuizId } from '@/lib/quiz'
import { redirect } from 'next/navigation'
import React from 'react'

interface QuizIdProps {
    quizId : string
}

const page = async ({params} : {params : QuizIdProps}) => {
    const session = await auth()
    if(!session?.user.id){
        redirect('/')
    }
    console.log(params.quizId);
    
    const data = await fetchQuizDataUsingQuizId(params?.quizId)
    console.log(data);
    //TODO: update the quiz details here
  return (
    <div>Details about 1 quiz</div>
  )
}

export default page