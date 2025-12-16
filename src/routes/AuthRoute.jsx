import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import { useEffect } from "react";
import OAuth2 from "../pages/OAuth2";

function AuthRoute() {
    const navigate = useNavigate();
    const location = useLocation();
    const {pathname} = location;

    // 경로 이동하도록 지정
    useEffect(() => {
        // console.log(pathname);
        if (pathname === "/") {
            navigate("/auth/login");
        }
    }, [pathname]);

    return <Routes>
        <Route path="/" element={<></>}/>
        <Route path="/auth/login" element={<Login />}/>
        <Route path="/auth/login/oauth2" element={<OAuth2 />}/>
        <Route path="/auth/signup" element={<SignUp />}/>
    </Routes>
}

export default AuthRoute;