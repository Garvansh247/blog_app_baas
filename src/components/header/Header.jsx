import { useNavigate,Link } from "react-router-dom";
import  {LogoutBtn,Container,Logo,Button} from "../index";
import { useSelector } from "react-redux";

function Header(){
    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status);
    const navItems=[
        {
            name:"Home",
            path:"/",
            isActive:true,
        },
        {
            name:"All Posts",
            path:"/all-posts",
            isActive:authStatus, // only show if user is logged in
        },
        {
            name:"Create Post",
            path:"/create-post",
            isActive:authStatus, // only show if user is logged in
        },
        {
            name:"Login",
            path:"/login",
            isActive:!authStatus, // only show if user is not logged in
        },
        {
            name:"Sign Up",
            path:"/signup",
            isActive:!authStatus, // only show if user is not logged in
        }
    ]
    return (
        <header className="bg-gray-800 text-white p-4">
            <Container>
                    <nav className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center">
                        <Link to="/"><Logo width="120px" /></Link>
                    </div>
                    <ul>
                        {
                            navItems.map(
                                (item)=> (item.isActive?(
                                    <li key={item.name} className="inline-block">
                                        <Button
                                            onClick={()=>{navigate(item.path)}}
                                            className="mx-2 bg-gray-700 hover:bg-gray-600 "
                                        >{item.name}
                                        </Button>
                                    </li>
                                ):
                                null)
                            )
                        }
                        {
                            authStatus && (
                                <li className="mx-2">
                                    <LogoutBtn />
                                </li>
                            )
                        }
                    </ul>
                    </nav>
            </Container>
            
        </header>
    )
}

export default Header;