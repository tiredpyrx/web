import React from "react";
import { BundledLanguage, BundledTheme, codeToHtml } from "shiki";

type CodeBlockProps = {
  code: string;
  lang?: BundledLanguage;
  theme?: BundledTheme;
  trim?: boolean;
};

async function CodeBlock({
  code,
  lang = "javascript",
  theme = "github-dark",
  trim = true,
}: CodeBlockProps) {
  let html = await codeToHtml(trim ? code.trim() : code, {
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
