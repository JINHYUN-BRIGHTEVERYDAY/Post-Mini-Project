import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMeQuery } from "../queries/usersQueries";


function OAuth2() {
    const navigate = useNavigate();
    const [ searchParams ] = useSearchParams();
    const accessToken = searchParams.get("accessToken");
    // searchParams : get 요청때 사용된 파라미터들 가져오기

    if (!!accessToken) {
        localStorage.setItem("AccessToken", accessToken);
    }
    const meQuery = useMeQuery();

    // undefined 그 다음에 렌더링
    useEffect(() => {
        const {isLoading, data} = meQuery;
        if (!isLoading) {
            if (data.status !== 200) {
                alert("인증이 필요합니다");
                navigate("/auth/login");
            } else {
                alert("로그인 성공");
                navigate("/");
            }
        }
    }, [meQuery.data]);
    
    return <></>
}

export default OAuth2;

