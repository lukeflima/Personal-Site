import { faLinkedin, faGithubSquare, faTwitterSquare } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const AboutMe = () => {
    return (
        <div id="about-me" className="content secodary-bg" >
            <div className="content-about-me" style={{ flex: 3 }}>
                <div style={{ flex: 3, height: "100%" }}></div>
                <div style={{ flex: 3, height: "100%", display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", margin: "auto", flex: 1 }}>
                        <h3 className="about-me">
                            So... I&apos;m a Computer Engineering student, who&apos;s into Web Development, likes to play CTFs and do some hardware stuff.
                        </h3>
                    </div>
                    <div style={{ display: "flex", margin: "auto", width: "100%", flex: 1, alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                        <p>
                            I got a CTF team with some friends that&apos;s called <a target="_blank" rel="noopener noreferrer" href="https://ctftime.org/team/71631">ByteForc3</a>.
                        </p>
                    </div>
                    <div style={{ display: "flex", margin: "auto", width: "100%", flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                        <div id="contatos" style={{ display: "flex" }}>
                            <span>
                                <a href="https://www.twitter.com/lukeflima/">
                                    <FontAwesomeIcon icon={faTwitterSquare} style={{ width: "5em" }} />
                                </a>
                            </span>
                            <span>
                                <a href="https://github.com/lukeflima">
                                    <FontAwesomeIcon icon={faGithubSquare} style={{ width: "5em" }} />
                                </a>
                            </span>
                            <span>
                                <a href="https://www.linkedin.com/in/lukeflima/">
                                    <FontAwesomeIcon icon={faLinkedin} style={{ width: "5em" }} />
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


AboutMe.displayName = "About me"

export default AboutMe;