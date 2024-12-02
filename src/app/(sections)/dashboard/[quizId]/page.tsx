import { auth } from '@/lib/auth'
import { fetchQuizDataUsingQuizId } from '@/lib/quiz'
import { redirect } from 'next/navigation'
import React from 'react'

interface QuizIdProps {
    quizId : string
}

const page = async ({params} : any) => {
    const session = await auth()
    const {quizId} = await params
    console.log(quizId);
    
    if(!session?.user.id){
        redirect('/')
    }
    
    const data = await fetchQuizDataUsingQuizId(quizId)
    console.log(data);
    //TODO: update the quiz details here
  return (
    <div>Details about 1 quiz</div>
  )
}

export default page