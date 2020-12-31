import { useState, useEffect } from "react"

import Head from '../components/Head'

import Navbar from "../components/Navbar"

import Landing from "../components/Landing"
import AboutMe from "../components/AboutMe"
// import Projects from "../components/Projects"

const titles = [
    "Lucas",
    "About me",
    "Projects"
]

const Index = () => {

    const [title, setTitle] = useState("Lucas")

    useEffect(() =>{
        if(typeof window !== `undefined`){
            window.onscroll = function() {
                const currentScrollPos = window.pageYOffset;
                const h = Math.min(document.documentElement.clientHeight, window.innerHeight || 0);
                const index = parseInt((currentScrollPos + 0.1 * h)/(h));
                setTitle(titles[index]);
            }
        }
        
    }, [])

    return (
    <>
        <Head/>
        <Navbar title={title}/>

        <Landing/>
        <AboutMe/>
        {/* <Projects/> */}
    </>
)
}

export default Index;