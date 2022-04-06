import { useEffect, useRef, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { faGithubSquare } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as wasm from 'qoi-viewer';
import { read } from 'fs';

const QoiViewer = () => {
    const [_isLoading, setLoading] = useState<boolean>(false);
    const [image, setImage] = useState<ImageData | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);

    const decode = async (file: File) => {
        const reader = new FileReader();
        reader.onload = function () {
            if (!(reader.result instanceof ArrayBuffer)) {
                throw new Error(`Expected e to be an ArrayBuffer, was ${reader && reader.constructor && reader.constructor.name || reader}`);
            }
            const imageArray = new Uint8Array(reader.result);
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
        const inputImage = document.getElementsByName("qoi-image")[0]
        if (!(inputImage instanceof HTMLInputElement))
            throw new Error(`Expected e to be an HTMLInputElement, was ${inputImage && inputImage.constructor && inputImage.constructor.name || inputImage}`);
        inputImage.accept = ".qoi"
    })

    useEffect(() => {
        const renderImage = async () => {
            if (image !== null) {
                try {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    if (ctx === null) throw Error("No canvas context");
                    canvas.width = image.width;
                    canvas.height = image.height;
                    ctx.putImageData(image, 0, 0);

                    const img = imgRef.current;
                    if (img === null) throw Error("No image ref");
                    img.src = canvas.toDataURL();
                    img.onload = _ => setLoading(false);
                } catch (e) {
                    setErrorMsg("Error while rendenring the image");
                    setLoading(false);
                    console.error(e)
                }
            }
        }
        renderImage();
    }, [image])



    return (
        <div style={{
            width: "100%", height: "100vh",
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
                <FileUploader classes="drag-input" label="Upload or drop a QOIF Image here" id='qoi-image' name='qoi-image' handleChange={(f: File) => { setLoading(true); decode(f); }} />
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