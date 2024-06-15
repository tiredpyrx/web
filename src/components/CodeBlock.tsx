import React from "react";
import { BundledLanguage, BundledTheme, codeToHtml } from "shiki";

type CodeBlockProps = {
  code: string;
  lang?: BundledLanguage;
  theme?: BundledTheme;
  trim?: {
    trimStartEnd?: boolean
    trimStart?: boolean
    trimEnd?: boolean
  };
};

async function CodeBlock({
  code,
  lang = "javascript",
  theme = "github-dark",
  trim = {
    trimStartEnd: true
  }
}: CodeBlockProps) {
  code = trim.trimStartEnd ? code.trim() : trim.trimStart ? code.trimStart() : trim.trimEnd ? code.trimEnd() : code;
  let html = await codeToHtml(code, {
    lang,
    theme,
  });

  return (
    <div
      className="code-block"
      dangerouslySetInnerHTML={{ __html: html }}
    ></div>
  );
}

export { CodeBlock };
export type { CodeBlockProps };
