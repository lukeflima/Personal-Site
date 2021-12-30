

import Layout from "../components/Layout"
import Landing from "../components/Landing"
import AboutMe from "../components/AboutMe"
import Projects from "../components/Projects";


const Index = () => {

    return (
        <Layout>
            <Landing title={Landing.title} />
            <AboutMe title={AboutMe.title} />
            <Projects title={Projects.title} />
        </Layout>
    );
}

export default Index;