import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const Input = ({ id, label, type, required, textarea, password }) => {
  const [hide, setHide] = useState(true);

  return (
    <div className="w-full relative">
      {textarea ? (
        <textarea
          id={id}
          placeholder=" "
          className={`peer
          w-full
          p-4
          pt-6 
          font-light 
          bg-white 
          border
          rounded-md
          outline-none
          transition
          border-gray-400
         pl-4`}
        />
      ) : (
        <input
          type={type}
          id={id}
          placeholder=" "
          className={`peer
          w-full
          p-4
          pt-6 
          font-light 
          bg-white 
          border
          rounded-md
          outline-none
          transition
          border-gray-400
         pl-4`}
        />
      )}
      <label
        htmlFor={id}
        className="absolute
        text-gray-500
          text-md
          duration-150
          transform
          -translate-y-3
          top-5
          z-10
          origin-[0]
          left-4
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4"
      >
        {label}
      </label>
      {password && (
        <div className="absolute right-5 top-1/2 transform  -translate-y-1/2">
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
