interface ReplaceQuilSourceBlankParagraphsWith {
  source: string;
  replaceValue?: string;
}

const replaceQuilSourceBlankParagraphsWith = (
  props: ReplaceQuilSourceBlankParagraphsWith
) => {
  let { source, replaceValue } = props;
  return source.replace(
    /<p>(?:\s+)?\n?(?:\s+)?<br>(?:\s+)?\n?(?:\s+)?<\/p>/gm,
    replaceValue ?? ""
  );
};

export {
  replaceQuilSourceBlankParagraphsWith,
  type ReplaceQuilSourceBlankParagraphsWith,
};
