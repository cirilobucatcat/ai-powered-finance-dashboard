import { FieldValues } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';
import { FormInputProps } from '@/types';
import CustomSelect from './CustomSelect';

export function FormInput<T extends FieldValues>({
  name,
  label,
  type = 'select',
  register,
  error,
  placeholder,
  className = '',
  containerClass = '',
  prependIcon,
  selectOptions
}: FormInputProps<T>) {

  return (
    <div className={`relative ${containerClass}`}>
      {label && (
        <label htmlFor={name} className="block mb-1 font-medium text-sm text-electric-lime">
          {label}
        </label>
      )}
      {prependIcon && <div className="absolute top-[36px] left-2 bottom-[12px]">{prependIcon}</div>}
      {
        type === 'select' ?
          <CustomSelect
            id={name}
            placeholderValue={{ label: '-- select an item --', value: ''}}
            options={selectOptions ?? []}
            {...register(name)}
          /> :
          <input
            id={name}
            type={type}
            placeholder={placeholder}
            className={`w-full form-input ${className} ${prependIcon ? '!pl-8' : '!px-3'}`}
            {...register(name)}
          />
      }
      {error && <ErrorMessage message={error.message} />}
    </div>
  );
}
