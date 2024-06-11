"use client";

import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';


function Home() {
  return (
    <>
      <div>
        <article className="bg-gray-50 p-12">
          <p>Hello guys</p> <br />
          <SyntaxHighlighter customStyle={{padding: "10px 24px", borderRadius: 10}} language="typescript" style={vs2015}>
            {` 
"use client";

import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

function Home() {
  return (
    <>
      <div>
        <article className="bg-gray-50 p-12">
          <p>Hello guys</p> <br />
          <SyntaxHighlighter language="typescript" style={docco}>
            {"const x = (num: string) => num + 1"}
          </SyntaxHighlighter>
        </article>
      </div>
    </>
  );
}

export default Home;
              
            `}
          </SyntaxHighlighter>
        </article>
      </div>
    </>
  );
}

export default Home;
