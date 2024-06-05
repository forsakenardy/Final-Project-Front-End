import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { Navigate } from "react-router-dom";

function IsAnon({children}){
    const {isLoggedIn, isLoading} = useContext(AuthContext);
    if(isLoading) return <img className="ball2" src="https://i.ibb.co/WKTHyR0/white-ball.png" alt="" />

    if(isLoggedIn){
        return <Navigate to="/"/>
    }else{
        return children
    }
}
export default IsAnon;