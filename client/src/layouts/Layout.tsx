import React from "react"
import Header from "../components/Header"

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-screen flex flex-col p-1">
            <Header />

            <main id="main-content" className="flex-1 p-5">
                {children}
            </main>
        </div>
    )
}

export default Layout