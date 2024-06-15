"use client";

import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = ({ onChange }: { onChange?: (source: string) => void }) => {
  const [value, setValue] = useState<string>("");
  const editorRef = useRef<ReactQuill>(null);

  const onEditorChange = (source: string) => {
    setValue(source);
    onChange && onChange(source);
  };

  return (
    <ReactQuill
      ref={editorRef}
      value={value}
      modules={{
        clipboard: {
          matchVisual: false,
        },
      }}
      className={"h-[200px] mb-4"}
      onChange={onEditorChange}
    />
  );
};

export default Editor;
