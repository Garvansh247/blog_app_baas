import { useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import {Container,Button} from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate } from "react-router-dom";
import { setAllPosts,deletePostFromAllPosts } from "../features/postSlice";
import parse from 'html-react-parser';
import { useEffect } from "react";

function Post(){
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const { slug } = useParams();
    const { allPosts } = useSelector((state) => state.post);
    // Posts returned from Appwrite TablesDB may not include an explicit `slug`
    // field; the row id (`$id`) is often used as the slug/identifier.
    // Try matching by either `slug` or `$id` so both cases work.
    const post = allPosts?.find((post) => post?.slug === slug || post?.$id === slug);
    
    const deletePost=async ()=>{
        const res=await appwriteService.deletePost(post?.slug || post?.$id);
        if(res){
            dispatch(deletePostFromAllPosts(post?.$id));
            navigate("/");
        }
    }
    const {status,userData}=useSelector((state)=>state.auth);
    const isAuthor=status && userData?.$id === post?.userId;

    useEffect(()=>{
        appwriteService.getAllPosts().then((posts) => {
            dispatch(setAllPosts(posts.rows));
        });
    }, [isAuthor, post?.slug || post?.$id]);
    if (!post) {
        return <h1>Post not found</h1>;
    }
    return (
        <Container>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                <img src={appwriteService.getFilePreview(post.featuredImage)} alt={post.title} className="w-full h-auto mb-4" />
                <div className="text-gray-700 mb-4">{parse(post.content)}</div>
                {isAuthor && (
                    <div className="flex gap-4">
                        <Button onClick={()=>{navigate(`/edit-post/${post.slug || post.$id}`)}} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                            Edit Post
                        </Button>
                        <Button onClick={deletePost} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
                            Delete Post
                        </Button>
                    </div>
                )}
            </div>
        </Container>
    );
}

export default Post;
