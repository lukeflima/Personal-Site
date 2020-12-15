import { useState, useEffect } from "react"

const TextTransition = typeof window !== `undefined` ? require("react-text-transition") : null


export default ({ title }) => {
    
    const [view, setView] = useState("landing")

    useEffect(
        () => {
            view && 
            document.getElementById(view) && 
            document.getElementById(view).scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
    , [view])
    
    return(
        <div className="nav" id="navbar">
            <nav>
                <h1 className="logo">
                    { TextTransition && 
                        <TextTransition.default 
                            text={ title }
                            springConfig={ TextTransition.presets.wobbly }
                        />
                    }
                    { !TextTransition && title }
                </h1>
                <ul>
                    <button role="link" onClick={ () => setView("landing") }><li>HELLO</li></button>
                    <button role="link" onClick={ () => setView("about-me") }><li>ABOUT ME</li></button>
                    <button role="link" onClick={ () => setView("projects") }><li>PROJECTS</li></button>
                </ul>
            </nav>
        </div>
    )
}