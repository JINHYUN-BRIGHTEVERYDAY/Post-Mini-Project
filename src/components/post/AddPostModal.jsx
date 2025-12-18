/** @jsxImportSource @emotion/react */
import ReactModal from "react-modal";
import  * as s  from "./styles";
import { useEffect, useRef, useState } from "react";
import { useMeQuery } from "../../queries/usersQueries";
import Select from "react-select";
ReactModal.setAppElement("#root");
import Loading from "../common/Loading"
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";

function AddPostModal({isOpen, onRequestClose, layoutRef}) {
    const [ uploadImages, setUploadImages ] = useState([]);
    const imageListBoxRef = useRef();
    const {isLoading, data} = useMeQuery();

    const handleOnWheel = (e) => {
        imageListBoxRef.current.scrollLeft += e.deltaY;
    }

    const handleFileLoadonClick = () => {
        const fileInput = document.createElement("input");
        fileInput.setAttribute("type", "file");
        fileInput.setAttribute("accept", "image/*");
        fileInput.setAttribute("multiple", "true");
        fileInput.click();

        fileInput.onchange = (e) => {
            const {files} = e.target;
            const fileArray = Array.from(files);

            const readFile = (file) => new Promise ((resolve) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = (e) => {
                    resolve({
                        file,
                        dataURL: e.target.result,
                    });
                }
            });

            // for (let file of fileArray) {
            //     const fileReader = new FileReader();
            //     fileReader.readAsDataURL(file);

            //     fileReader.onload = (e) => {
            //         setUploadImages([...uploadImages,
            //              {
            //                 file, 
            //                 dataUrl: e.target.result
            //             }
            //         ]);
            //     }
            // }

            
            Promise
            .all(fileArray.map(file => readFile(file)))
            .then(result => {
                setUploadImages([...uploadImages, ...result]);
            });
        }
    }

    if (isLoading) {
        return <Loading />
    }


    // isOpen은 필수옵션
    return <ReactModal 
        style={{
            overlay: {
                position: "absolute", 
                top: 0,
                left: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#00000000"
            },
            content: {
                position: "static", // 가운데 배치
                boxShadow: "0 0 10px 5px #00000033",
                padding: "0",
            }

        }}
        isOpen={isOpen} 
        onRequestClose={onRequestClose}
        parentSelector={() => layoutRef.current}
        appElement = {layoutRef.current}
        ariaHideApp = {false}> 
            <div css={s.modalLayout}>
                <header>
                    <h2>Add a Post</h2>
                </header>
                <main>
                    <div css={s.profileContainer}>
                        <div css={s.profileImg(data.data.imgUrl)}></div>
                        <div>{data.data.nickname}</div>
                    </div>
                    <Select
                        options={[
                            {
                                label: "Public",
                                value: "Public",
                            },
                            {
                                label: "Public",
                                value: "Public",
                            },
                        ]} />     
                    <div css={s.contentInputBox}>
                        <textarea></textarea>
                    </div>
                    <div css={s.uploadBox} onClick={handleFileLoadonClick}>
                        <IoCloudUploadOutline />
                        <div>Please Post your story.</div>
                        <button>Add Image</button>
                    </div>
                    <div css={s.imageListBox} ref={imageListBoxRef} onWheel={handleOnWheel}>
                        {
                            uploadImages.map(img => (
                                <div css={s.preview(img.dataURL)}>
                                    <div><IoIosClose /></div>
                                </div>
                            ))
                        }
                    </div>

                </main>
                <footer>
                    <button css={s.postButton}>Post</button>
                    <button onClick={onRequestClose}>Cancel</button>
                </footer>
            </div>
    </ReactModal>
}

export default AddPostModal;