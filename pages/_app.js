import '../styles.scss'

import '../components/AboutMe/styles.scss'
import '../components/Navbar/styles.scss'
import '../components/Projects/styles.scss'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}