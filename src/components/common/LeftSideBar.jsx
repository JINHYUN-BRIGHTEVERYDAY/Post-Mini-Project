/** @jsxImportSource @emotion/react */
import { Link, useLocation } from "react-router-dom";
import * as s from "./styles";
import { IoHomeOutline, IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { useMeQuery } from "../../queries/usersQueries";
import AddPostModal from "../post/AddPostModal";
import { useEffect, useRef, useState, useCallback } from "react";
import { RiChatSmileAiLine } from "react-icons/ri";
import OpenaiApiModal from "../openai/OpenaiApiModal";

function LeftSideBar({ children }) {
    const location = useLocation();
    const { pathname } = location;
    const [addPostModalOpen, setAddPostModalOpen] = useState(false);
    const [openAiModalOpen, setOpenAiModalOpen] = useState(false);
    const [homeRefresh, setHomeRefresh] = useState(false);
    const layoutRef = useRef();

    const { isLoading, data } = useMeQuery();

    // --- 1. 함수들을 useEffect보다 위로 이동 (TDZ 에러 해결) ---
    
    const handleAddPostModalOpenOnClick = () => {
        setAddPostModalOpen(true);
    };

    const addPostModalClose = () => {
        setAddPostModalOpen(false);
    };

    const handleOpenaiModalOpenOnClick = () => {
        setOpenAiModalOpen(true);
    };

    const openaiModalClose = useCallback(() => {
        setOpenAiModalOpen(false);
    }, []);
    


     // --- 2. useEffect 설정 ---


    useEffect(() => {
        if (homeRefresh) {
            setHomeRefresh(false);
        }
    }, [homeRefresh]);


    // --- handleEsckey 설정 ---

    const handleEscKey = useCallback((e) => {
        if (e.key === "Escape") {
            openaiModalClose();
        }
    }, [openaiModalClose]);

   
    useEffect(() => {
        // 이제 handleEscKey가 위에 선언되어 있으므로 에러가 발생하지 않습니다.
        if (openAiModalOpen) {
            document.addEventListener("keydown", handleEscKey);
        }
        return () => document.removeEventListener("keydown", handleEscKey);
    }, [openAiModalOpen, handleEscKey]);


    return (
        <div css={s.sideBarLayout} ref={layoutRef}>
            <aside css={s.sideBarContainer}>
                <h1>Social Board</h1>
                <ul>
                    <Link to={"/"}>
                        <li css={s.menuListItem(pathname === "/")}>
                            <div><IoHomeOutline /></div>Home
                        </li>
                    </Link>
                    <Link to={"/search"}>
                        <li css={s.menuListItem(pathname === "/search")}>
                            <div><MdOutlineExplore /></div>Explore
                        </li>
                    </Link>
                    <Link>
                        <li css={s.menuListItem(false)} onClick={handleAddPostModalOpenOnClick}>
                            <div><IoAddCircleOutline /></div>Add a Post
                        </li>
                    </Link>
                    {
                        !isLoading && data?.data && (
                            <Link to={"/" + data.data.nickname}>
                                <li css={s.menuListItem(decodeURI(pathname) === "/" + data.data.nickname)}>
                                    <div><div css={s.profileImg(data.data.imgUrl)}></div></div>
                                    {data.data.nickname}
                                </li>
                            </Link>
                        )
                    }
                </ul>
                <div>
                    <Link to={"/logout"}>Logout</Link>
                </div>
            </aside>
            
            {!homeRefresh && children}

            {!!layoutRef.current && addPostModalOpen && (
                <AddPostModal
                    isOpen={addPostModalOpen}
                    onRequestClose={addPostModalClose}
                    layoutRef={layoutRef}
                    setHomeRefresh={setHomeRefresh}
                />
            )}

            <div css={s.aiChat} onClick={handleOpenaiModalOpenOnClick}><RiChatSmileAiLine /></div>
            
            <div css={s.aiChatLayout(openAiModalOpen)}>
                <div css={s.aiChatContainer}>
                    <OpenaiApiModal />
                </div>
                <button css={s.aiChatClose} onClick={openaiModalClose}>닫기</button>
            </div>
        </div>
    );
}

export default LeftSideBar;