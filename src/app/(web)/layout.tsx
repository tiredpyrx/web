import React from "react";
import { Header } from "@/components/Header";

function WebLayout({children}: { children: React.ReactNode }): React.JSX.Element {
    return (
        <>
            <Header />
            <div className={"p-6"}>{children}</div>
        </>
    );
}


export default WebLayout;
