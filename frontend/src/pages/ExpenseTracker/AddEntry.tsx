import { useState } from "react";
import { ExpenseEntry, ExpenseType } from ".";

interface Props {
    setExpenses: React.Dispatch<React.SetStateAction<ExpenseEntry[]>>
}

const AddEntry: React.FC<Props> = ({setExpenses}) => {
    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState(0)
    const [type, setType] = useState<ExpenseType>("expense")

    return (
        <div id="AddEntry">
            <h2>Add Budget Update</h2>
            <form action="" onSubmit={(e) => {
                    e.preventDefault(); 

                    setExpenses(prev => [...prev, {
                        ID: Date.now(),
                        title,
                        amount,
                        type
                    }])

                    setTitle("")
                    setAmount(0)
                    setType("expense")
                }}>
                <div className="form-input-boxes">
                    <div className="form-row">
                        <label htmlFor="title">Title</label>
                        <input 
                            placeholder="Some title"
                            type="text" 
                            name="title" 
                            id="title" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="form-row">
                        <label htmlFor="amount">Amount</label>
                        <input 
                        type="number" 
                        name="amount" 
                        id="amount" 
                        value={amount}
                        onChange={(e) => setAmount(parseInt(e.target.value))}
                        required 
                        />
                    </div>
                </div>
                <div className="form-radio-row">
                    <div className="form-radio-element">
                        <label htmlFor="expense">Expense</label>
                        <input 
                            type="radio" 
                            name="type" 
                            value="expense" 
                            id="expense" 
                            checked={type === "expense"}
                            onChange={() => setType("expense")}
                        />
                    </div>
                    <div className="form-radio-element">
                        <label htmlFor="income">Income</label>
                        <input 
                            type="radio" 
                            name="type" 
                            value="income" 
                            id="income"
                            checked={type === "income"}
                            onChange={() => setType("income")}
                        />
                    </div>
                </div>

                <input className="btn btn-primary" type="submit" value="Add budget entry" />
            </form>
        </div>
    )
}


export default AddEntry