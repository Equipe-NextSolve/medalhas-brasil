import Messenger from '@/layout/ChatBot/Messenger'
import LoadingScreen from '@/layout/Loanding/Loanding'
import Title from '@/utils/Title'
import FormBudget from './FormBudget'
import InitialBudget from './InitialBudget'
import Questions from './Questions'

export default function BudgetMain() {
    return (
        <LoadingScreen>
            <main className='min-h-screen flex-1 mt-20 gap-30 flex flex-col items-center'>
                <InitialBudget />
                <Title label="Faça seu Orçamento" />
                <FormBudget />
                <Title label="Perguntas Frequentes" />
                <Questions />
                <Messenger />
            </main>
        </LoadingScreen>
    )
}
