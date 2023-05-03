import React from "react";

const Input = ({ id, label, type, required, textarea }) => {
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
        htmlFor=""
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
    </div>
  );
};

export default Input;
