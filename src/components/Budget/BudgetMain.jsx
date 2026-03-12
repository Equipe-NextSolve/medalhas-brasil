import Title from '@/utils/Title'
import React from 'react'
import FormBudget from './FormBudget'

export default function BudgetMain() {
    return (
        <main className='min-h-screen flex-1 mt-20 gap-30 flex flex-col items-center'>
            <Title label="Faça seu Orçamento"/>
            <FormBudget/>
        </main>
    )
}
