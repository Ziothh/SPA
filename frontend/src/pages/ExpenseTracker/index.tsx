import Grid from "@components/Grid"
import PageHeader from "@components/PageHeader"
import { useLocalStorage, useSessionStorage } from "@hooks"
import AddEntry from "./AddEntry"
import Comparison from "./Comparison"
import ExpenseEntries from "./ExpenseEntries"

import "./ExpenseTracker.scss"

export type ExpenseType = "expense" | "income"

export interface ExpenseEntry {
    ID: number
    title: string
    amount: number
    type: "expense" | "income"
}

const ExpenseTracker: React.FC = () => {
    const [expenses, setExpenses, removeAll] = useLocalStorage<ExpenseEntry[]>("expenses", [])
    return (
        <>
            <PageHeader title="Expense Tracker"></PageHeader>   
            <Grid id="ExpenseTracker">
                <ExpenseEntries entries={expenses!} setEntries={setExpenses}></ExpenseEntries>
                <AddEntry {...{setExpenses}}/>
                <Comparison entries={expenses!} />
                <h2>Categories</h2>
            </Grid>
        </>
    )
}


export default ExpenseTracker