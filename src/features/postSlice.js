import { createSlice } from "@reduxjs/toolkit";

const initialState={
    allPosts: [], // to store all the posts
    myPosts: [] // to store posts of logged in user

}

const postSlice=createSlice(
    {
        name: 'post',
        initialState,
        reducers:{
                setAllPosts(state,action){
                    state.allPosts=action.payload;
                },
                setMyPosts(state,action){
                    state.myPosts=action.payload;
                },
                addToAllPosts(state,action){
                    state.allPosts.push(action.payload);
                },
                addToMyPosts(state,action){
                    state.myPosts.push(action.payload);
                },
                updatePostInAllPosts(state,action){
                    const updatedPost=action.payload;
                    state.allPosts=state.allPosts.map((post)=>post.$id===updatedPost.$id? updatedPost : post);
                },
                updatePostInMyPosts(state,action){
                    const updatedPost=action.payload;
                    state.myPosts=state.myPosts.map((post)=>post.$id===updatedPost.$id? updatedPost : post);
                },
                deletePostFromAllPosts(state,action){
                    const deletedPostId=action.payload;
                    state.allPosts=state.allPosts.filter((post)=>post.$id!==deletedPostId);
                },
                deletePostFromMyPosts(state,action){
                    const deletedPostId=action.payload;
                    state.myPosts=state.myPosts.filter((post)=>post.$id!==deletedPostId);
                }

                
        }
    }
)

export const {setAllPosts,setMyPosts,addToAllPosts,addToMyPosts,updatePostInAllPosts,updatePostInMyPosts,deletePostFromAllPosts,deletePostFromMyPosts}=postSlice.actions;

export default postSlice.reducer;