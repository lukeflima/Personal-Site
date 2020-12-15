import { faLinkedin, faGithubSquare, faTwitterSquare } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = () => {
    return (
        <div id="about-me" className="content whitebg blacktxt" >
            <div style={{ display: "flex", margin: "auto"  }}>
                <div style={{ flex: 1 }}></div>
                <h3 className="about-me">
                    So... I'm a Computer Engineering student, who's into Web Development, likes to play CTFs and do some hardware stuff.
                </h3>
            </div>
            <div style={{ display: "flex", margin: "auto", width: "100%" }}>
                <div style={{ flex: 1 }}></div>
                <p style={{ flex: 1 }}>
                    I got a CTF team with some friends that's called <a target="_blank" rel="noopener noreferrer" href="https://ctftime.org/team/71631">ByteForc3</a>.
                </p>
            </div>
            <div style={{ display: "flex", margin: "auto", width: "100%" }}>
                <div style={{ flex: 1 }}></div>
                <div style={{ flex: 1 }}>
                    <span>
                        <a href="https://www.twitter.com/lukeflima/">
                            <FontAwesomeIcon icon={faTwitterSquare}  style={{  width: "5em" }}/>
                        </a>
                    </span>
                    <span>
                        <a href="https://github.com/lukeflima">
                            <FontAwesomeIcon icon={faGithubSquare}  style={{  width: "5em" }}/>
                        </a>
                    </span>
                    <span>
                        <a href="https://www.linkedin.com/in/lukeflima/">
                            <FontAwesomeIcon icon={faLinkedin}  style={{  width: "5em" }}/>
                        </a>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Header;