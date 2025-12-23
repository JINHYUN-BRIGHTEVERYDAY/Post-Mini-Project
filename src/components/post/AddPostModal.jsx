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
import { createPost } from "../../apis/posts/postsApi";
import { useCreatePostMutation } from "../../mutations/postMutations";


function AddPostModal({isOpen, onRequestClose, layoutRef, setHomeRefresh}) {
    const [ visibilityOption, setVisibilityOption ] = useState({label: "Public", value: "Public"});
    const [ textareaValue, setTextareaValue ] = useState("");
    const [ uploadImages, setUploadImages ] = useState([]);
    const [ disabled, setDisabled ] = useState(true);
    const imageListBoxRef = useRef();
    const {isLoading, data} = useMeQuery();
    const createPostMutation = useCreatePostMutation();


    useEffect(() => {
        setDisabled(!textareaValue || !uploadImages.length);
    }, [textareaValue, uploadImages]); 
    // 아무것도 입력 안하면 post 버튼이 막히고 입력하면 열린다


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

    // 사진 제거
    // // 저장된 인덱스부터 찍어봐야 => 해당 인덱스를 삭제하여 파일이 삭제되도록
    const handleImageDeleteOnClick = (index) => {
        const deletedImages = uploadImages.filter((img, imgindex) => imgindex !== index);
        setUploadImages(deletedImages);
    }


    const handlePostSubmitOnClick = async () => {
        const formData = new FormData();
        formData.append("visibility", visibilityOption.value);
        formData.append("content", textareaValue);
        for (let img of uploadImages) {
           formData.append("files", img.file); 
        }
        try{
           await createPostMutation.mutateAsync(formData);
           alert("작성 완료");
           setHomeRefresh(true);
           onRequestClose();
        } catch(error) {
           alert(error.response.data.message);
        }
    } 


    // 사진 제거
    // 버튼을 클릭하여 제거 팝업이 뜨도록 먼저

    // 사진이 배열에 저장되고 있음 -> 해당되는 인덱스를 먼저 찾을 수 있어야
    // // 해당 인덱스에 해당하는 사진을 지워야
    // const handleImageDeleteOnClick = 


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
            {   
                createPostMutation.isPending && <Loading />
            }
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
                                label: "Follow",
                                value: "Follow",
                            },
                        ]}

                        value={visibilityOption}
                        onChange={(option) => setVisibilityOption(option)} />
                    <div css={s.contentInputBox}>
                        <textarea value={textareaValue} onChange={(e) => setTextareaValue(e.target.value)}></textarea>
                    </div>
                    <div css={s.uploadBox} onClick={handleFileLoadonClick}>
                        <IoCloudUploadOutline />
                        <div>Please Post your story.</div>
                        <button>Add Image</button>
                    </div>
                    <div css={s.imageListBox} ref={imageListBoxRef} onWheel={handleOnWheel}>
                        {
                            uploadImages.map((img, index) => (
                                <div css={s.preview(img.dataURL)}>
                                    <div onClick={() => handleImageDeleteOnClick(index)}><IoIosClose /></div>
                                </div>
                            ))
                        }
                    </div>

                </main>
                <footer>
                    <button css={s.postButton} onClick={handlePostSubmitOnClick} disabled={disabled}>Post</button>
                    <button onClick={onRequestClose}>Cancel</button>
                </footer>
            </div>
    </ReactModal>
}

export default AddPostModal;