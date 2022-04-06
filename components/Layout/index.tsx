import React, { useState, useEffect } from "react"
import Head from "../Head"
import Navbar from "../Navbar"
const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {

    // @ts-ignore
    const titles = children.map(c => c.type.displayName);
    const [title, setTitle] = useState<string>("Lucas")

    useEffect(() => {
        if (typeof window !== `undefined`) {
            window.onscroll = function () {
                const currentScrollPos = window.pageYOffset;
                const h = Math.min(document.documentElement.clientHeight, window.innerHeight || 0);
                const index = Math.floor((currentScrollPos + 0.2 * h) / (h));
                setTitle(titles[index]);
            }
        }
    })

    return (
        <>
            <Head />
            <Navbar title={title} />
            {children}
        </>
    );
}

export default Layout;