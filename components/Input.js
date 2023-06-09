import React, { useState, useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const Input = ({
  id,
  label,
  type,
  required,
  password,
  textarea,
  placeholder,
  onChange,
  defaultValue,
  status
}) => {
  const [hide, setHide] = useState(true);
  const [textValue, setTextValue] = useState('')
  const [value, setValue] = useState('')
  const [typeInput, setTypeInput] = useState(type)


  const textareaHandler = (e) => {
    setTextValue(e.target.value);
    if (textarea) {
      onChange(e.target.value);
    }
  };

  const inputHandler = (e) => {
    setValue(e.target.value);
    if (!textarea) {
      onChange(e.target.value);
    }
  };

  useEffect(() => {
    if (textarea) {
      setTextValue(defaultValue);
    } else {
      setValue(defaultValue);
    }
    
    if(password){
      if(!hide){
        setTypeInput("text")
      }else{
        setTypeInput("password")
      }
    }
  },[hide])

  return (
    <div className="relative w-full">
      {textarea ? (
        <textarea
          className={`
          w-full
          rounded-md
          border 
          border-gray-400 
          bg-white 
          p-4
          pl-4
          pt-6
          font-light
          placeholder-black
          outline-none
         transition`}
          value={textValue}
          placeholder={placeholder}
          onChange={(e) => textareaHandler(e)}
        />
      ) : (
        <input
          type={typeInput}
          id={id}
          placeholder=" "
          className={`peer
          w-full
          rounded-md
          border 
          border-gray-400 
          bg-white 
          p-4
          pl-4
          pt-6
          font-light
          outline-none
         transition`}
          value={value}
          onChange={(e) => inputHandler(e)}
        />
      )}
      <label
        htmlFor={id}
        className="text-md
        absolute
          left-4
          top-5
          z-10
          origin-[0]
          -translate-y-3
          transform
          text-gray-500
          duration-150
          peer-placeholder-shown:translate-y-0
          peer-placeholder-shown:scale-100
          peer-focus:-translate-y-4
          peer-focus:scale-75"
      >
        {label}
      </label>
      {password && (
        <div className="absolute right-5 top-1/2 -translate-y-1/2  transform">
          {hide ? (
            <EyeSlashIcon
              className="h-5 cursor-pointer"
              onClick={() => setHide(!hide)}
            />
          ) : (
            <EyeIcon
              className="h-5 cursor-pointer"
              onClick={() => setHide(!hide)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
