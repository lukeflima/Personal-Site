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
    label: "BLOG",
    view: "blog-post-feed",
  },
];

const scrollToView = (view: string) => {
  const elem = document.getElementById(view)
  if (elem !== null)
    elem.scrollIntoView({ behavior: "smooth", block: "center" });
}

let TextTransition: any = null;

const loadTextTransition = async () => {
  TextTransition =
    typeof window !== `undefined` ? await import("react-text-transition") : null;
}

interface NavbarProps {
  title: string,
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {
  const [mobileMenuOpened, setMobileMenuOpened] = useState<boolean>(false);
  const mobileMenuStyle = useSpring({ scaleY: mobileMenuOpened ? 1 : 0, config: { duration: 250 } })

  useEffect(() => {
    loadTextTransition();

    document.onmouseup = (event) => {
      if (
        event && event.target && event.target instanceof HTMLElement &&
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
      <nav>
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
