import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import { useEffect } from "react";
import OAuth2 from "../pages/OAuth2";
import { useMeQuery } from "../queries/usersQueries";
import Loading from "../components/common/Loading";
import Logout from "../pages/auth/Logout";
import Home from "../pages/home/Home";
import LeftSideBar from "../components/common/LeftSideBar";



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


    if (meQuery.isLoading) {
        return <Loading />;
    }

    // 화면에 렌더링 될 수 없게끔 막기
    if (meQuery.isSuccess && meQuery.data.status !== 200) {
        return <Routes>
            <Route path="/auth/login" element={<Login />}/>
            <Route path="/auth/login/oauth2" element={<OAuth2 />}/>
        </Routes>
    }


    return <LeftSideBar>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/logout" element={<Logout />} />
        </Routes>
    </LeftSideBar>
    



}

export default AuthRoute;