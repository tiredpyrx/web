// "use client"

// import React, { useRef } from "react";
// import { codeToHtml } from "shiki";
// import type { BundledLanguage, BundledTheme } from "shiki"; // Import the types from shiki
// import reactStringReplace from "react-string-replace";
// import parse from "html-react-parser"

// const text = `
// <h1>My Awesome Custom Title</h1>
// <codeblock>one liner code</codeblock>
// <codeblock>
// <language>typescript</language>
// const myVariable: string = "hello_world";
// console.log(myVariable);
// </codeblock>
// <p>this is another line hahah</p>
// <div><p>this is another another line hahah</p></div>
// <codeblock>
// <language>css</language>
// body {
//   background: beige;
//   color: whitesmoke;
// }
// </codeblock>
// <p>hahah</p>
// `;

// // const getSubstrBetween = async (
// //   text: string,
// //   openTag: string,
// //   closeTag: string
// // ) => {
// //   let obj: { [key: string]: any } = {};
// //   let arr: Array<any> = [];
// //   let wordStartIndex = 0,
// //     arrWord: string[] = [];
// //   const words = text.split(/\W+/gi);
// //   for (let i = 0; i < words.length; i++) {
// //     let word = words[i];
// //     if (word == openTag) {
// //       wordStartIndex = i;
// //     } else if (word == closeTag) {
// //       let code: any = text.slice(
// //         text.indexOf(words[wordStartIndex + 1]) - 1,
// //         text.indexOf(words[i])
// //       );
// //       const _q = await CodeBlock({
// //         code,
// //       }).then((q) => {
// //         text = text.replace(code, q as unknown as string);
// //       });
// //     }
// //   }
// //   return {
// //     substrArray: arrWord.filter((w) => w),
// //     code: await CodeBlock({
// //       code: "const x = 1",
// //     }),
// //     text,
// //   };
// // };

// const getSubstrBetween = (text: string, openTag: string, closeTag: string) => {
//   let wordStartIndex = 0,
//     arrWord: string[] = [];
//   const words = text.split(/\W+/gi);
//   for (let i = 0; i < words.length; i++) {
//     let word = words[i];
//     if (word == openTag) wordStartIndex = i;
//     else if (word == closeTag)
//       arrWord.push(
//         text.slice(
//           text.indexOf(words[wordStartIndex + 1]) - 1,
//           text.indexOf(words[i])
//         )
//       );
//   }
//   return arrWord.filter((w) => w);
// };

// export async function bsxToJSX(text: string) {
//   // return await getSubstrBetween(text, "<codeblock>", "</codeblock>").then(
//   //   (_) => {
//   //     return <div dangerouslySetInnerHTML={{ __html: _.text }}></div>;
//   //   }
//   // );
//   return reactStringReplace(
//     // text.replace(/\n/g, ""),
//     text,
//     /^<codeblock>\n?(.*?)<\/codeblock>$/gms,
//     async (match, idx) => {
//       const languageTag = match.match(
//         /^<language>\n?(.*?)<\/language>$/gms
//       )?.[0] as string;
//       let language: BundledLanguage = "typescript";
//       if (languageTag) {
//         language = languageTag.substring(
//           languageTag.indexOf(">") + 1,
//           languageTag.lastIndexOf("<")
//         ) as BundledLanguage;
//         match = match.replace(languageTag, "");
//       }
//       return await CodeBlock({ code: match, lang: language });
//     }
//   );
// }

// // bsxToJSX(text);

// type Props = {
//   code: string;
//   lang?: BundledLanguage;
//   theme?: BundledTheme;
// };

// export async function CodeBlock({ code, lang = "javascript", theme = "nord" }: Props) {
//   const html = await codeToHtml(code, {
//     lang,
//     theme,
//   });

//   const block = parse(html);

//   const blockRef = useRef(null)


//   return <div ref={blockRef} dangerouslySetInnerHTML={{ __html: html }}></div>;
// }

// export default async function Home() {
//   let component = await bsxToJSX(text);

//   component = component.map(e => typeof e === "string" ? parse(e) : e)

//   return (
//     <>
//       <div className="grid gap-4">
//         <CodeBlock
//           lang="typescript"
//           theme="github-dark"
//           code="const xz: number = 1;"
//         />
//         <CodeBlock code="const aa = 1;" />
//         {component}
//       </div>
//     </>
//   );
// }
