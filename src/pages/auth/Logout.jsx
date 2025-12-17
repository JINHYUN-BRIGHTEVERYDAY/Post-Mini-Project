import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();
    localStorage.removeItem("AccessToken");

    useEffect(() => {
        alert("로그아웃");
        navigate("/auth/login");
    }, []);

    return <></>
        
}

export default Logout;