import { useSelector,useDispatch } from "react-redux";
import appwriteService from "../appwrite/config";
import { Container,PostCard } from "../components";
import { setAllPosts } from "../features/postSlice";
import { useEffect,useState } from "react";
import { toPlain } from "../utils/serialize";

function AllPosts(){
    const {allPosts}=useSelector((state)=>state.post);
    const dispatch=useDispatch();
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        appwriteService.getAllPosts().then((posts) => {
            console.log("All posts fetched:", posts);
            dispatch(setAllPosts(toPlain(posts.rows)));
            setLoading(false);
        });
    }, [dispatch]);

    if(loading){
        return (
            <Container>
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-2xl font-semibold text-gray-300">Loading...</h1>
                </div>
            </Container>
        )
    } else if(!allPosts || allPosts.length===0){
        return (
            <Container>
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-2xl font-semibold text-gray-300">No posts available</h1>
                </div>
            </Container>
        )
    }

    return (
        <Container>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {allPosts.map((post) => (
                    <PostCard key={post.$id} {...post} />
                ))}
            </div>
        </Container>
    );
}

export default AllPosts;