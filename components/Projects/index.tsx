import QoiViewer from '../QoiViewer';
import TitledComponentProps from '../TitledComponent';

const Projects = () => {
    return (
        <>
            <div id="projects" className="content">
                <QoiViewer />
            </div >
        </>
    )
}

Projects.displayName = "Projects"

export default Projects;