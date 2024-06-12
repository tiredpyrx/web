"use client";

import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';


function Home() {
  return (
    <>
      <div>
        <article className="bg-gray-50 py-12 px-72">
          <p>Hello guys</p> <br />
          <SyntaxHighlighter customStyle={{padding: "10px 24px", borderRadius: 10}} language="css" style={vs2015}>
            {` 
body {
  background-color: black
}
              
            `}
          </SyntaxHighlighter>
        </article>
      </div>
    </>
  );
}

export default Home;
