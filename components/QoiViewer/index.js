import { useEffect, useRef, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { faGithubSquare } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as wasm from 'qoi-viewer';

const QoiViewer = () => {
    const [isLoading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const imgRef = useRef(null)

    useEffect(() => {
        document.getElementsByName("qoi-image")[0].accept = ".qoi"
    })

    useEffect(() => {
        if (image === null) return;

        const renderImage = async () => {
            try {
                const width = image.get_width()
                const height = image.get_height()
                const channels = image.get_channels()
                const bytes = image.get_bytes()

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

                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = imgData.width;
                canvas.height = imgData.height;
                ctx.putImageData(imgData, 0, 0);

                const img = imgRef.current;
                img.src = canvas.toDataURL();
                img.onload = _ => setLoading(false);
            } catch {
                setErrorMsg("Error while rendenring the image");
                setLoading(false);
            }
        }

        renderImage();
    }, [image])

    const decode = async (file) => {
        const reader = new FileReader();
        reader.onload = function () {

            const arrayBuffer = this.result,
                array = new Uint8Array(arrayBuffer);

            try {
                const is_valid_qoif = wasm.check_if_valid_qoif(array)
                if (is_valid_qoif) {
                    const image = wasm.decode_qoi(array, file.size);
                    setImage(image);
                    setErrorMsg(null);
                } else {
                    setErrorMsg("Invalid QOIF Image");
                }
            } catch {
                setErrorMsg("Error decoding QOIF Image");
            }
        }
        reader.readAsArrayBuffer(file);
    }

    return (
        <>
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
            <div style={{
                width: "100%", height: "100%",
                position: "relative"
            }}>
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
        </>
    )
}

QoiViewer.title = "Qoi Viewer"

export default QoiViewer;