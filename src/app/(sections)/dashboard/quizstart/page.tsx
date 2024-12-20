import  QuizTest  from '../_components/QuizTest'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { getQuizById } from '@/lib/quiz'
import { toast } from 'sonner'


export default async function QuizStartPage() {
    const session = await auth()
    if (!session?.user?.id){
        redirect('/login')
    }

    const userId = session.user.id;
    const quiz = await getQuizById(userId);

    if(!quiz) {
        toast.error('Quiz Not Attempted');
        redirect('/dashboard')
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <QuizTest quiz={quiz} />
        </div>
    )
}