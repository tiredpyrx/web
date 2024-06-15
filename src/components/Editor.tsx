"use client";

import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface EditorProps {
  onChange?: (source: string) => void;
  replaceBlankParagraphs?: {
    replaceValue?: string;
  };
}

const Editor = ({ onChange, replaceBlankParagraphs }: EditorProps) => {
  const [value, setValue] = useState<string>("");

  const onEditorChange = (source: string) => {
    // if (replaceBlankParagraphs) {
    //   source = replaceQuilSourceBlankParagraphsWith({
    //     source,
    //     replaceValue: replaceBlankParagraphs.replaceValue,
    //   });
    // }
    setValue(source);
    onChange && onChange(source);
  };

  return (
    <ReactQuill
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

export { Editor, type EditorProps };
