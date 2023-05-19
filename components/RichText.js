import dynamic from "next/dynamic";

const ReactQuill = dynamic(import("react-quill"), { ssr: false });

import "react-quill/dist/quill.snow.css";
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    ["link", "image", "video"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote"],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
  ],
};

const RichText = ({ style }) => {
  return (
    <ReactQuill
      modules={modules}
      className={` max-w-5xl ${style} mt-4 2xl:h-[300px] 2xl:mb-20`}
    />
  );
};

export default RichText;
