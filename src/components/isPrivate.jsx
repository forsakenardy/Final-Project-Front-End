import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { Navigate } from "react-router-dom";

function IsPrivate({children}){
    const {isLoggedIn, isLoading} = useContext(AuthContext);

if(!isLoading) return<img className="ball2" src="src\assets\images\white-ball.png" alt="" />

if(!isLoggedIn) {
    return <Navigate to="/loginForm" />
} else {
    return children
}

}

export default IsPrivate