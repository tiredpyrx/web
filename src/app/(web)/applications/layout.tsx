import React from "react";

function ApplicationsLayout({children}: { children: React.ReactNode }): React.JSX.Element {
    const range = "Lorem ipsum dolor sit amet consectetur adipisicing elit."
    return (
        <div className="container mx-auto">
            <div className={"grid grid-cols-4 gap-4"}>
                {Array.from([...(range.split(""))]).map(_ => children)}
            </div>
        </div>
    );
}


export default ApplicationsLayout;
