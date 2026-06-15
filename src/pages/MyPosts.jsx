import { useDispatch, useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import { Container } from "../components";
import { setMyPosts } from "../features/postSlice";
import { useNavigate } from "react-router-dom";
import { Button,PostCard } from "../components";
import { useState,useEffect } from "react";
import { toPlain } from "../utils/serialize";

function MyPosts(){
    const {myPosts}=useSelector((state)=>state.post);
    const {userData}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [loading,setLoading]=useState(true);
    useEffect(
        ()=>{
            appwriteService.getUserPosts(userData.$id).then((posts) => {
                    dispatch(setMyPosts(toPlain(posts.rows)));
                }).catch((err)=>{
                    console.log(err);
                }).finally(()=>{
                    setLoading(false);
                });
        },[dispatch,userData]
    );
    if(loading){
        return (
            <Container>
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-2xl font-semibold text-gray-300">Loading...</h1>
                </div>
            </Container>
        )
    }
    else if(!userData){
        return (
            <Container>
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-2xl font-semibold text-gray-300">Please login to view your posts</h1>
                    <Button onClick={()=>navigate("/login")} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                        Login
                    </Button>
                </div>
            </Container>
        )
    }
    else if(!myPosts || myPosts.length===0){
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
                {myPosts.map((post) => (
                    <PostCard key={post.$id} {...post} />
                ))}
            </div>
        </Container>
    );
}

export default MyPosts;