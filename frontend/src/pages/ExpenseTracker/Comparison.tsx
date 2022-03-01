import { useMemo } from "react"
import { ExpenseEntry } from "."

interface Props {
    entries: ExpenseEntry[]
}

const Comparison: React.FC<Props> = ({entries}) => {
    const [income, expenses] = useMemo(() => {
        const [expenses, income] = entries.reduce((prev, e) => {
            prev[e.type === "expense" ? 0 : 1] += e.amount

            return prev
        }, [0, 0])

        return [income, expenses]
    }, [entries])

    const weight = Math.round((expenses / (income + expenses) * 100) * 100) / 100
    const budgetRemaining = Math.round((expenses / income * 100) * 100) / 100

    return (
        <div id="ExpenseVsIncome">
            <h2>Expense vs income</h2>
            <div className="beam-container">
                <h3>{">"} Weight ({weight}%)</h3>
                <div className="beam-green">
                    <div 
                        style={{width: `${weight}%`}} 
                        className="beam-red"
                    ></div>
                </div>

                <h3>{">"} Remaining ({100 - budgetRemaining}%)</h3>
                <div className="beam-green">
                    <div 
                        style={{width: `${budgetRemaining}%`}} 
                        className="beam-red"
                    ></div>
                </div>
            </div>
        </div>
    )
}


export default Comparison