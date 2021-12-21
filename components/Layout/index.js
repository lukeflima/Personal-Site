import { useState, useEffect } from "react"
import Head from "../Head"
import Navbar from "../Navbar"
const Layout = ({ children }) => {
    const titles = children.map(c => c.props.title);
    const [title, setTitle] = useState("Lucas")

    useEffect(() => {
        if (typeof window !== `undefined`) {
            window.onscroll = function () {
                const currentScrollPos = window.pageYOffset;
                const h = Math.min(document.documentElement.clientHeight, window.innerHeight || 0);
                const index = parseInt((currentScrollPos + 0.1 * h) / (h));
                setTitle(titles[index]);
            }
        }

    }, [])

    return (
        <>
            <Head />
            <Navbar title={title} />
            {children}
        </>
    );
}

export default Layout;