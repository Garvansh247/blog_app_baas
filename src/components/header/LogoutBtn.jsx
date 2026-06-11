import { logout } from "../../features/authSlice";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import Button from "../Button";
function LogoutBtn({

}) {
    const dispatch=useDispatch();
    const logoutHandler=()=>{
        authService.logout()
            .then(()=>{
                dispatch(logout());
                console.log("User logged out successfully");
            })
            .catch((err)=>{
                console.error("Error logging out",err);
            })
    }
    return (
        <Button onClick={logoutHandler} className="bg-red-600 hover:bg-red-700">
            Logout
        </Button>
    )
}

export default LogoutBtn;