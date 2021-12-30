import { useEffect, useRef, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import * as wasm from 'qoi-viewer';
import QoiViewer from '../QoiViewer';

function imagedata_to_image(imagedata) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = imagedata.width;
    canvas.height = imagedata.height;
    ctx.putImageData(imagedata, 0, 0);

    const image = new Image();
    image.src = canvas.toDataURL();
    return image;
}

const Projects = () => {
    const [image, setImage] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const canvasRef = useRef(null)
    const divRef = useRef(null)

    const decode = (file) => {

        // const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function () {

            const arrayBuffer = this.result,
                array = new Uint8Array(arrayBuffer);

            const is_valid_qoif = wasm.check_if_valid_qoif(array)
            if (is_valid_qoif) {
                const image = wasm.decode_qoi(array, file.size);
                setImage(image);
                setErrorMsg(null);
            } else {
                setErrorMsg("Invalid QOIF Image");
            }
        }
        reader.readAsArrayBuffer(file);
    }
    useEffect(() => {
        document.getElementsByName("qoi-image")[0].accept = ".qoi"
    })

    useEffect(() => {
        if (image) {
            const canvas = canvasRef.current
            const context = canvas.getContext('2d')

            const width = image.get_width()
            const height = image.get_height()
            const channels = image.get_channels()
            const bytes = image.get_bytes()

            const div_width = divRef.current.offsetWidth - 80
            const div_height = divRef.current.offsetHeight - 80

            let imgData = null
            if (channels == 4) {
                imgData = new ImageData(new Uint8ClampedArray(bytes), width, height)
            } else {
                imgData = new ImageData(width, height)
                let b_i = 0;
                for (let i = 0; i < width * height * 4; i += 4) {
                    imgData.data[i + 0] = bytes[b_i + 0]
                    imgData.data[i + 1] = bytes[b_i + 1]
                    imgData.data[i + 2] = bytes[b_i + 2]
                    imgData.data[i + 3] = 255
                    b_i += channels
                }
            }

            if (width <= div_width && height <= div_height) {
                canvas.width = width
                canvas.height = height
                context.putImageData(imgData, 0, 0)
            } else {
                canvas.height = div_height
                canvas.width = div_width * (height < width ? height / width : width / height)
                const img = imagedata_to_image(imgData)
                img.onload = () => context.drawImage(img, 0, 0, width, height, 0, 0, canvas.width, canvas.height)
            }
        }
    }, [image])

    return (
        <>
            <div id="projects" className="content">
                <QoiViewer />
            </div >
        </>
    )
}

Projects.title = "Projects"

export default Projects;