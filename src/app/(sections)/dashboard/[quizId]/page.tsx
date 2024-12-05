import QuestionsData from '@/components/QuestionsData'
import { fetchQuizDataUsingQuizAttemptId } from '@/lib/quiz'
import { redirect } from 'next/navigation'
import { toast } from 'sonner'

interface QuizIdProps {
    quizId : string
}

const page = async ({params} : any) => {
    const {quizId} = await params    
    const data = await fetchQuizDataUsingQuizAttemptId(quizId)

    if(!data){
      toast.error('Error while accessing the data')
      redirect('/dashboard')
    }

  return (
    <div>
      <QuestionsData data={data}/>
    </div>
  )
}

export default page