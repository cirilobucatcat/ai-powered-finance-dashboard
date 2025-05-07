type OptionProps = {
    value: string,
    label: string,
}
type CustomSelectProps = {
    options: OptionProps[]
    onChange: () => string;
    placeholderValue?: {
        label: string,
        value: string
    }
}

const CustomSelect = ({ onChange, options, placeholderValue }: CustomSelectProps) => {
  return (
    <select onChange={onChange} className="w-full border-2 rounded-sm bg-slate-800 border-electric-lime outline-electric-lime text-slate-50 p-3 text-sm">
        {placeholderValue && (<option className="text-slate-950" value={placeholderValue.value}>{placeholderValue.label}</option>)}
        {options.map((option) => <option className="text-slate-950" value={option.value}>{option.label}</option>)}
    </select>
  )
}

export default CustomSelect