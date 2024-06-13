interface SlugifyProps {
  text: string;
  options?: {
    replacements?: {
      [key: string]: Array<string>;
    };
    delete?: RegExp;
    lower?: boolean;
    lowerLocale?: boolean;
    trim?: boolean;
  };
}

function slugify({
  text,
  options = { trim: true, lower: true },
}: SlugifyProps): string {
  if (options?.trim) text = text.trim();
  if (options?.lowerLocale) text = text.toLocaleLowerCase();
  else if (options?.lower) text = text.toLowerCase();
  text = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\œ/g, "oe")
    .replace(/\æ/g, "ae")
    .normalize("NFC");
  // Strip html tags
  text = text.replace(/<[^>]*>/g, "");
  // delete all occurrences of given regexp
  if (options?.delete) text = text.replaceAll(options.delete, "");
  // replace given replacables with replacement
  if (options?.replacements) {
    for (const replacement in options.replacements) {
      const replacables = options.replacements[replacement];
      for (const replacable of replacables) {
        text.replaceAll(replacable, replacement);
      }
    }
  }
  return text
    .replace(/\s+|\.+|\/+|\\+|—+|–+/g, "-")
    .replace(/[^\w0-9\-]+/g, "")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "");
}

export { slugify };
export type { SlugifyProps };
