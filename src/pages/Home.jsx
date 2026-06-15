import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import {PostCard,Container} from "../components";
import { setActivePosts } from "../features/postSlice";

function Home(){
    const {activePosts}=useSelector((state)=>state.post);
    const dispatch=useDispatch();
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        appwriteService.getActivePosts().then((posts) => {
            dispatch(setActivePosts(posts.rows));
            setLoading(false);
        });
    }, [activePosts, dispatch]);
    if(loading){
        return (
            <Container>
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-2xl font-semibold text-gray-300">Loading...</h1>
                </div>
            </Container>
        )
    }
    else if(!activePosts || activePosts.length===0){
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
                {activePosts.map((post) => (
                    <PostCard key={post.$id} {...post} />
                ))}
            </div>
        </Container>
    );
}

export default Home;