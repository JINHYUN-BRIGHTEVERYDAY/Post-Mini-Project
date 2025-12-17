import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import { useEffect } from "react";
import OAuth2 from "../pages/OAuth2";
import { useMeQuery } from "../queries/usersQueries";

function AuthRoute() {
    const navigate = useNavigate();
    const location = useLocation();
    const {pathname} = location;

    const meQuery = useMeQuery();

    // 경로 이동하도록 지정
    useEffect(() => {
        const { isLoading, data } = meQuery;
        if (!isLoading) {
            if (data.status !== 200) { 
                if (!pathname.startsWith("/auth")) {
                    navigate("/auth/login");
                } 
            } else { 
                if (pathname.startsWith("/auth")) {
                    navigate("/");
                }
            }
        }
    }, [pathname, meQuery.data]);

    return <Routes>
        <Route path="/" element={<></>} />
        <Route path="/auth/login" element={<Login />}/>
        <Route path="/auth/login/oauth2" element={<OAuth2 />}/>
        <Route path="/auth/signup" element={<SignUp />}/>
    </Routes>
}

export default AuthRoute;