import { CustomSelectProps } from '@/types';

const CustomSelect = ({ onChange, options, placeholderValue, ...props }: CustomSelectProps) => {
  return (
    <select
      onChange={onChange}
      className="w-full border-2 rounded-sm bg-slate-800 border-electric-lime outline-electric-lime text-slate-50 p-3 text-sm"
      {...props}
    >
      {placeholderValue && (<option key={0} className="text-slate-950" value={placeholderValue.value}>{placeholderValue.label}</option>)}
      {options.map((option, index) => <option key={index + 1} className="text-slate-950" value={option.value}>{option.label}</option>)}
    </select>
  )
}

export default CustomSelect