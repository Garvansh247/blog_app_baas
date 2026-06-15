import { createSlice } from "@reduxjs/toolkit";

const initialState={
    allPosts: [], // to store all the posts
    activePosts: [], // to store only active posts
    myPosts: [] // to store posts of logged in user

}

const postSlice=createSlice(
    {
        name: 'post',
        initialState,
        reducers:{
                setAllPosts(state,action){
                    state.allPosts = JSON.parse(JSON.stringify(action.payload));
                },
                setMyPosts(state,action){
                    state.myPosts=JSON.parse(JSON.stringify(action.payload));
                },
                setActivePosts(state,action){
                    state.activePosts=JSON.parse(JSON.stringify(action.payload));
                },
                addToAllPosts(state,action){
                    state.allPosts.push(action.payload);
                },
                addToMyPosts(state,action){
                    state.myPosts.push(action.payload);
                },
                addToActivePosts(state,action){
                    state.activePosts.push(action.payload);
                },
                updatePostInAllPosts(state,action){
                    const updatedPost=action.payload;
                    state.allPosts=state.allPosts.map((post)=>post.$id===updatedPost.$id? updatedPost : post);
                },
                updatePostInMyPosts(state,action){
                    const updatedPost=action.payload;
                    state.myPosts=state.myPosts.map((post)=>post.$id===updatedPost.$id? updatedPost : post);
                },
                updatePostInActivePosts(state,action){
                    const updatedPost=action.payload;
                    state.activePosts=state.activePosts.map((post)=>post.$id===updatedPost.$id? updatedPost : post);
                },
                deletePostFromAllPosts(state,action){
                    const deletedPostId=action.payload;
                    state.allPosts=state.allPosts.filter((post)=>post.$id!==deletedPostId);
                },
                deletePostFromMyPosts(state,action){
                    const deletedPostId=action.payload;
                    state.myPosts=state.myPosts.filter((post)=>post.$id!==deletedPostId);
                },
                deletePostFromActivePosts(state,action){
                    const deletedPostId=action.payload;
                    state.activePosts=state.activePosts.filter((post)=>post.$id!==deletedPostId);
                }
        }
    }
)

export const {setAllPosts,setMyPosts,setActivePosts,addToAllPosts,addToMyPosts,addToActivePosts,updatePostInAllPosts,updatePostInMyPosts,updatePostInActivePosts,deletePostFromAllPosts,deletePostFromMyPosts,deletePostFromActivePosts}=postSlice.actions;

export default postSlice.reducer;