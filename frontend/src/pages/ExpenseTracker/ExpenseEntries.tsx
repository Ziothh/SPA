import { useMemo, useState } from "react"
import { ExpenseEntry } from "."

interface Props {
    entries: ExpenseEntry[]
    setEntries: React.Dispatch<React.SetStateAction<ExpenseEntry[]>>
}

const ExpenseEntries: React.FC<Props> = ({entries, setEntries}) => {
    const [sorted, setSorted] = useState(false)

    const removeByID = (ID: number) => setEntries(
        prev => prev.filter(e => e.ID !== ID)
    )

    const entriesByType = useMemo(
        () => ({
            expenses: entries.filter(e => e.type === "expense"),
            income: entries.filter(e => e.type === "income"),
        }), [entries]
    )


    return (
        <div id="ExpenseEntries">
            <div className="entries-header">
                <h2>Latest entries</h2>
                <div className="sorting-control">
                    <label htmlFor="sorted">Sort by type</label>
                    <input 
                        type="checkbox" 
                        checked={sorted} 
                        name="sorted" 
                        id="sorted"
                        onChange={() => setSorted(!sorted)}
                    />
                </div>
            </div>
            <div className="entries">
                {entries.length !== 0 
                ? ( sorted 
                    ? (<>
                        {Object.entries(entriesByType)
                        .map(([key, value]) => (
                            <div key={key} className="col">
                                <h3 className="category-title">{key}</h3>
                                <ul>
                                    {value.slice(0, 4).map(v => (
                                        <li key={v.ID} onClick={() => removeByID(v.ID)}>
                                            <p className="entry-smalltext">
                                                {v.title}: 
                                                <span>${v.amount}</span>
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </>) 
                    : (<>
                        <ul>
                            {[...entries].reverse().slice(0, 4).map(e => (
                                <li key={e.ID} onClick={() => removeByID(e.ID)}>
                                    <h3>[ {e.ID} ]: {e.title}</h3>
                                    <p>Type: {e.type}</p>
                                    <p>Amount: $ {e.type === "expense" ? "-" : "+"}{e.amount}</p>
                                </li>
                            ))}
                        </ul>
                    </>)
                ) 
                : <h3 style={{fontSize: "18px"}}>No results were found</h3>
                }
                
            </div>
        </div>
    )
}


export default ExpenseEntries