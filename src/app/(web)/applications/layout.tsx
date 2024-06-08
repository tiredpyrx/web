import React from "react";

function ApplicationsLayout({children}: { children: React.ReactNode }): React.JSX.Element {
    return (
        <div className="container mx-auto">
            <div className={"grid grid-cols-4 gap-4"}>{children}</div>
        </div>
    );
}


export default ApplicationsLayout;
