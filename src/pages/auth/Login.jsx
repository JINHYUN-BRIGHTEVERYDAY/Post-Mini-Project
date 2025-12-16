
/** @jsxImportSource @emotion/react */
import * as s from "./styles";

import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom"; // navigate는 더 이상 사용하지 않지만, 일단 남겨둡니다.

function Login() {
    // navigate를 사용하지 않으므로 제거하거나 주석 처리해도 무방합니다.
    // const navigate = useNavigate();

    const handleOAuth2LoginOnClick = (e) => {
        // e.currentTarget은 이벤트 리스너가 실제로 붙어있는 요소를 가리킵니다.
        const clientName = e.currentTarget.id; 
        
        // window.location.href를 사용하여 외부 OAuth2 서버로 리다이렉트
        window.location.href = "http://localhost:8080/oauth2/authorization/" + clientName;
    }

    return <div css={s.layout}>
        <div css={s.container}>
            <div css={s.leftBackground}></div>
            <div css={s.rightContainer}>
                <h1>Social Board</h1>
                <p>친구들과 함께 사진 또는 글을 공유해보세요</p>
                <div>
                    {/* onClick 속성을 태그 내부에 정확히 배치 */}
                    <button id="google" css={s.google} onClick={handleOAuth2LoginOnClick}> 
                        <FcGoogle />구글 로그인
                    </button>
                    <button id="naver" css={s.naver} onClick={handleOAuth2LoginOnClick}> 
                        <SiNaver />네이버 로그인
                    </button>
                    <button id="kakao" css={s.kakao} onClick={handleOAuth2LoginOnClick}> 
                        <RiKakaoTalkFill />카카오 로그인
                    </button>
                </div>
            </div>
        </div>
    </div>
}

export default Login;


// /** @jsxImportSource @emotion/react */
// import * as s from "./styles";

// import { FcGoogle } from "react-icons/fc";
// import { SiNaver } from "react-icons/si";
// import { RiKakaoTalkFill } from "react-icons/ri";
// import { useNavigate } from "react-router-dom";

// function Login() {
//     const navigate = useNavigate();

//     const handleOAuth2LoginOnClick = (e) => {
//         const clientName = e.target.id;
//         navigate("http://localhost:8080/oauth2/authorization/" + clientName);
//     }

//     return <div css={s.layout}>
//         <div css={s.container}>
//             <div css={s.leftBackground}></div>
//             <div css={s.rightContainer}>
//                 <h1>Social Board</h1>
//                 <p>친구들과 함께 사진 또는 글을 공유해보세요</p>
//                 <div>
//                     <button id="google" css={s.google}> onClick = {handleOAuth2LoginOnClick} <FcGoogle />구글 로그인</button>
//                     <button id="naver" css={s.naver}> onClick = {handleOAuth2LoginOnClick} <SiNaver />네이버 로그인</button>
//                     <button id="kakao" css={s.kakao}> onClick = {handleOAuth2LoginOnClick} <RiKakaoTalkFill />카카오 로그인</button>
//                 </div>
//             </div>
//         </div>
//     </div>
// }

// export default Login;