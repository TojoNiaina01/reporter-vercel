import dynamic from "next/dynamic";

const ReactQuill = dynamic(import("react-quill"), { ssr: false });
import { htmlToText } from "html-to-text";
import "react-quill/dist/quill.snow.css";

const testHandler = () => {
  alert("flsdjfsmj");
};

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    ["link"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote"],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [
      { color: [] },
      {
        background: [
          "transparent",
          // Colonne 1
          "#000000",
          "#333333",
          "#666666",
          "#999999",
          "#CCCCCC",
          "#FFFFFF",
          "#FF0000",
          // Colonne 2
          "#FF6666",
          "#FF9900",
          "#FFFF00",
          "#00FF00",
          "#00FFFF",
          "#0000FF",
          "#6600CC",
          // Colonne 3
          "#FF33CC",
          "#FF6633",
          "#FFCC00",
          "#FFFF66",
          "#66FF33",
          "#66FFFF",
          "#3366FF",
          // Colonne 4
          "#FF3399",
          "#FF9966",
          "#FFFF99",
          "#99FF33",
          "#99FFFF",
          "#3399FF",
          "#9933CC",
          // Colonne 5
          "#FF00FF",
          "#FF9933",
          "#FFFFCC",
          "#CCFF66",
          "#CCFFFF",
          "#6699FF",
          "#CC66FF",
          // Colonne 6
          "#FF66CC",
          "#FFCC99",
          "#FFFF33",
          "#99FF66",
          "#99FFCC",
          "#66CCFF",
          "#CC99FF",
          // Colonne 7
          "#FF99CC",
          "#FFCC66",
          "#FFFF66",
          "#66FF99",
          "#66FFCC",
          "#66CCFF",
          "#CC66CC",
        ],
      },
    ],
    [{ align: [] }],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const RichText = ({ style, value, setValue }) => {
  const pasteHandler = () => {
    alert("val");
  };
  return (
    <ReactQuill
      modules={modules}
      className={` max-w-5xl ${style} mt-4 2xl:h-[300px] 2xl:mb-20`}
      value={value}
      onChange={setValue}
      onPaste={pasteHandler}
    />
  );
};

export default RichText;
