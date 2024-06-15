import type { BundledLanguage } from "shiki";
import reactStringReplace from "react-string-replace";
import { CodeBlock } from "../components/CodeBlock";
import { replaceHTMLEntitiesWithItsCorrespondingCharacters } from "@/helpers";

interface InsertCodeBlocksToStringProps {
  text: string;
  language?: BundledLanguage;
}

async function insertCodeBlocksToString(props: InsertCodeBlocksToStringProps) {
  let { text, language } = props;
  return reactStringReplace(
    text,
    /<p>```(\w*?\s*.*?)<p>```<\/p>/gims,
    async (match, idx) => {
      match = match.replaceAll("</p>", "<br>")
        .replaceAll(/<\/?(?!br)(\w+)>/gims, "")
        .replaceAll("<br>", "\n");
      match = replaceHTMLEntitiesWithItsCorrespondingCharacters(match);
      const lang = (match.match(/(\w+)$/)?.[0] as BundledLanguage) ?? "tsx";
      if (lang) match = match.replace(lang, "");
      return await CodeBlock({ code: match, lang: language ?? lang });
    }
  );
}


export { insertCodeBlocksToString, type InsertCodeBlocksToStringProps }