import type { BundledLanguage } from "shiki";
import reactStringReplace from "react-string-replace";
import { CodeBlock } from "../components/CodeBlock";


export interface CreateCodeBlockProps {
  text: string;
  language?: BundledLanguage;
}

export async function createCodeBlock(props: CreateCodeBlockProps) {
  let { text, language = "typescript" } = props;
  return reactStringReplace(
    text,
    /```(?:\w+)?\s*\n(.*?)(?=^```)```/gmsi,
    async (match, idx) => {
      const lang = match.match(/```(\w+)/)?.[0] as BundledLanguage
      if (lang) {
        match = match.replace(lang, "");
      }
      return await CodeBlock({ code: match, lang: language ?? lang });
    }
  );
}