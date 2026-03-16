import Title from '@/utils/Title'
import React from 'react'
import FormBudget from './FormBudget'
import Questions from './Questions'
import LoadingScreen from '@/utils/Loanding'

export default function BudgetMain() {
    return (
        <LoadingScreen>
            <main className='min-h-screen flex-1 mt-20 gap-30 flex flex-col items-center'>
                <Title label="Faça seu Orçamento" />
                <FormBudget />
                <Title label="Perguntas Frequentes" />
                <Questions />
            </main>
        </LoadingScreen>
    )
}
