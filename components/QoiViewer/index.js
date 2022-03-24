import { useEffect, useRef, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { faGithubSquare } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as wasm from 'qoi-viewer';

const QoiViewer = () => {
    const [_isLoading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const imgRef = useRef(null);

    const decode = async (file) => {
        const reader = new FileReader();
        reader.onload = function () {
            const imageArray = new Uint8Array(this.result);
            try {
                const image = wasm.decode_qoi(imageArray);
                setImage(image);
                setErrorMsg(null);
            } catch (e) {
                setErrorMsg("Error decoding QOIF Image");
                setLoading(false);
                console.error(e);
            }
        }
        reader.readAsArrayBuffer(file);
    }



    useEffect(() => {
        document.getElementsByName("qoi-image")[0].accept = ".qoi"
    })

    useEffect(() => {
        const renderImage = async () => {
            try {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = image.width;
                canvas.height = image.height;
                ctx.putImageData(image, 0, 0);

                const img = imgRef.current;
                img.src = canvas.toDataURL();
                img.onload = _ => setLoading(false);
            } catch (e) {
                setErrorMsg("Error while rendenring the image");
                setLoading(false);
                console.error(e)
            }
        }
        if (image !== null) renderImage();
    }, [image])



    return (
        <div style={{
            width: "100%", height: "80%",
            position: "relative"
        }}>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column"
            }}>
                <h1 style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}><label htmlFor="qoi-image">QOI Image Viewer</label>
                    <a target="_blank" rel="noreferrer" style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }} href="https://github.com/lukeflima/qoi-viewer">
                        <FontAwesomeIcon icon={faGithubSquare} style={{ marginLeft: "15px", width: "1em" }} />
                    </a>
                </h1>
                <p>Select a QOIF (Quite OK Image Format) Image</p>
                <FileUploader classes="drag-input" label="Upload or drop a QOIF Image here" id='qoi-image' name='qoi-image' handleChange={f => { setLoading(true); decode(f); }} />
                {errorMsg && <p style={{ color: "red", fontWeight: "bold" }}>{errorMsg}</p>}
            </div>

            {image !== null &&
                // eslint-disable-next-line @next/next/no-img-element
                <img style={{
                    maxWidth: "80%",
                    maxHeight: "80%",
                    margin: "auto",
                    padding: 15,
                    display: "block"
                }} ref={imgRef} alt="Image for QOI-Viewer" />
            }
        </div>
    )
}

QoiViewer.title = "Qoi Viewer"

export default QoiViewer;