 import React, { useRef, useState } from "react";
import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/outline";
import { log } from "next/dist/server/typescript/utils";

const UploadFile = ({onChangeFile}) => {
  const [files, setFiles] = useState();
  const inputRef = useRef(null);
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files);
    onChangeFile(event.dataTransfer.files)
  };

  const removeFile = (e, fileName) => {
    e.preventDefault();
    setFiles(Array.from(files).filter((file) => file.name !== fileName));
    onChangeFile(Array.from(files).filter((file) => file.name !== fileName))
  };

  return (
    <div
      className="flex flex-col"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div>
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-main-500 bg-gray-100 border-dashed rounded-lg cursor-pointer "
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              aria-hidden="true"
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG</p>
          </div>
          <input
            multiple
            onChange={(event) => setFiles(event.target.files)}
            id="dropzone-file"
            type="file"
            accept="image/png, image/jpeg"
            className="hidden"
            ref={inputRef}
          />
        </label>
      </div>

      {!files ? (
        <div className="text-lg text-center pt-5">Aucune donnée</div>
      ) : (
        <div className="pt-2">
          <ul>
            {Array.from(files).map((file, idx) => (
              <li
                key={idx}
                className="font-semibold py-1 flex items-center gap-4"
              >
                <Image
                  src={URL.createObjectURL(file)}
                  width={40}
                  height={40}
                  alt="Thumb"
                />
                <span>{file.name}</span>
                <button
                  className="p-2 bg-secondary-100 rounded-xl active:scale-95"
                  onClick={(e) => removeFile(e, file.name)}
                >
                  <TrashIcon className="h-5 text-secondary-500" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
