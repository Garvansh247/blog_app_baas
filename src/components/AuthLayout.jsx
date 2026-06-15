import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({children,authenticated=true,workForAll=false}){
    const [loading, setLoading] = useState(true);
    const authStatus=useSelector((state)=>state.auth.status);
    const navigate=useNavigate();
    useEffect(()=>{
        if(!workForAll){
            if(authenticated && !authStatus){
            navigate("/login");
            } else if(!authenticated && authStatus){
                navigate("/");
            }
        }
        
        setLoading(false);
    }, [authStatus, authenticated, navigate]);
    return (loading ? <h1>Loading...</h1> : <>{children}</>);

}

export default ProtectedRoute;