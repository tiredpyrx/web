import type { BundledLanguage } from "shiki";
import reactStringReplace from "react-string-replace";
import { CodeBlock } from "../components/CodeBlock";


export interface CreateCodeBlockProps {
  text: string;
  language?: BundledLanguage;
}

export async function createCodeBlock(props: CreateCodeBlockProps) {
  let { text, language } = props;
  return reactStringReplace(
    text,
    /<codeblock>\n?(.*?)<\/codeblock>/gms,
    async (match, idx) => {
      const languageTag = match.match(/<language>\n?(.*?)<\/language>/gms)?.[0];
      if (languageTag) {
        language = languageTag.substring(
          languageTag.indexOf(">") + 1,
          languageTag.lastIndexOf("<")
        ) as BundledLanguage;
        match = match.replace(languageTag, "");
      }
      return await CodeBlock({ code: match, lang: language });
    }
  );
}
