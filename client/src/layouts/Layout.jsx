import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar.component"
import { useState } from "react"

export const Layout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export const LayoutEditor = () => {
    const[stateEditor, setStateEditor] = useState("editor")

    return (
        <>
            <div className="flex gap-4 mt-3 mr-4 justify-end">
                <button className="btn bg-blue-800 text-white font-semibold" onClick={() => setStateEditor("editor")}>Publish</button>
                <button className="btn bg-blue-100 text-blue-800 font-semibold" onClick={() => setStateEditor("publish")}>Save</button>
            </div>
            <Outlet context={{ stateEditor }} />
        </>
    )
}