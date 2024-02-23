import {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  placeHolder?: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  rules?: RegisterOptions;
}

export const inputContainerStyle = `flex justify-center items-center flex-1 `;

export const inputStyle = `w-16 sm:w-32 md:w-44 lg:w-48 xl:w-96 h-10 md:h-8 flex items-center ps-3 border-secondary-light hover:border-secondary-accent focus:border-secondary-accent border-2 rounded-medium  md:text-lg lg:text-xl outline-none transition-colors duration-300`;

export const errorStyle = `absolute start-0 -bottom-6 text-error text-sm mt-2 capitalize;`;

export const TextInput = <T extends FieldValues>(props: InputProps<T>) => {
  return (
    <div className={inputContainerStyle}>
      <div className="input relative">
        <input
          type="text"
          id={props.name}
          {...props.register(props.name, props.rules)}
          placeholder={props.placeHolder}
          autoComplete={props.name}
          className={inputStyle}
        />
        {props.error && (
          <span className={errorStyle}>{props.error.message}</span>
        )}
      </div>
    </div>
  );
};

