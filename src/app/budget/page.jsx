import BudgetMain from '@/components/Budget/BudgetMain'
import React from 'react'
import Messenger from '@/utils/Messenger'

export default function budgetPage() {
    return (
        <div>
            <BudgetMain />
            <Messenger />
        </div>
    )
}
