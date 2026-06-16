import { Container,PostForm } from "../components";
import { useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import appwriteService from "../appwrite/config";
import { useEffect,useState } from "react";
import { setAllPosts} from "../features/postSlice";


function EditPost(){
    const {slug}=useParams();
    const {allPosts}=useSelector((state)=>state.post);
    const {userData,status}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        if(!allPosts || allPosts.length===0){
            setLoading(true);
            appwriteService.getAllPosts().then((posts) => {
                dispatch(setAllPosts(posts.rows));
                setLoading(false);
            });
        }
    }, [dispatch]);
    const post=allPosts?.find((post)=>post.slug===slug || post.$id===slug);
    if(loading){
        return (
            <Container>
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-2xl font-semibold text-gray-300">Loading...</h1>
                </div>
            </Container>
        )
    }
    else if (post && status && userData?.$id !== post.userId) {
        return (
            <Container>
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-2xl font-semibold text-gray-300">You are not allowed to edit this post.</h1>
                </div>
            </Container>
        );
    }

    else if(!post){
        return (
            <Container>
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-2xl font-semibold text-gray-300">Post not found</h1>
                </div>
            </Container>
        )
    }
    return (
        <Container>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-semibold text-gray-300 mb-4">Edit Post</h1>
                <PostForm post={post} />
            </div>
        </Container>
    );
}

export default EditPost;