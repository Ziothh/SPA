import { Dispatch } from "react"

type FormInputType = "text" | "checkbox" | "radio" | "date" | "email"  | "password" 

interface Props {
    name: string
    type: FormInputType
    value: any
    onChange: Dispatch<any>
    placeholder?: string
    resetAble?: boolean
    className?: string
    required?: boolean
}


const FormInput: React.FC<Props> = ({name, type, value, onChange, placeholder, children, resetAble = false, className, required = false}) => {
    return (
        <label className={`font-inverse ${className}`} key={`${name}Input`}>
            <h3>{`${name}:`}</h3>
            <div className="flex-row">
                <div className="formInputBackground">
                    <input
                        type={type}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        required={type === "date" ? value ? true : false : required} // fixing the stupid clear button
                    />
                    {children}
                </div>
                {resetAble && <button type="button" className="btn btn-red" onClick={() => {onChange("")}}>Reset</button>}
            </div>
        </label>
    )
}


export default FormInput