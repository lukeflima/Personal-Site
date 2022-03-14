import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { useSpring, animated } from 'react-spring'


const buttons = [
  {
    label: "HELLO",
    view: "landing",
  },
  {
    label: "ABOUT ME",
    view: "about-me",
  },
  {
    label: "PROJECTS",
    view: "projects",
  },
];

const scrollToView = (view) => {
  document.getElementById(view) &&
    document
      .getElementById(view)
      .scrollIntoView({ behavior: "smooth", block: "center" });
}

let TextTransition = null;

const loadTextTransition = () => {
  TextTransition =
    typeof window !== `undefined` ? require("react-text-transition") : null;
}

const Navbar = ({ title, navClass }) => {
  const [mobileMenuOpened, setMobileMenuOpened] = useState(false);
  const mobileMenuStyle = useSpring({ scaleY: mobileMenuOpened ? 1 : 0, config: { duration: 250 } })

  useEffect(() => {
    loadTextTransition();

    document.onmouseup = (event) => {
      if (
        event &&
        !event.target.classList.contains("mobile-menu") &&
        event.target.offsetParent &&
        !event.target.offsetParent.classList.contains("mobile-menu")
      ) {
        setMobileMenuOpened(false);
      }
    };
  }, []);

  return (
    <div className="nav" id="navbar">
      <nav className={navClass ? navClass : ""}>
        <h1 className="logo">
          {TextTransition && (
            <TextTransition.default
              text={title}
              springConfig={TextTransition.presets.wobbly}
            />
          )}
          {!TextTransition && title}
        </h1>
        <ul className="mobile-hide">
          {buttons.map((button) => {
            const { label, view } = button;
            return (
              <button key={view} role="link" onClick={() => scrollToView(view)}>
                <li>{label}</li>
              </button>
            );
          })}
        </ul>
        <div
          className="mobile hamburger"
          style={{ cursor: "pointer" }}
          onClick={() => setMobileMenuOpened(!mobileMenuOpened)}
        >
          <FontAwesomeIcon icon={faBars} />
        </div>
        <animated.div
          style={mobileMenuStyle}
          className="mobile mobile-menu primary-bg"
        >
          <ul>
            {buttons.map((button) => {
              const { label, view } = button;
              return (
                <button key={view} role="link" onClick={() => scrollToView(view)}>
                  <li>{label}</li>
                </button>
              );
            })}
          </ul>
        </animated.div>
      </nav>
    </div>
  );
};

export default Navbar;
