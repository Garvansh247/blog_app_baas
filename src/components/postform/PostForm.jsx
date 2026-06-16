import { RTE,Input,Select,Button} from "../index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect,useCallback } from "react";
import appwriteService from "../../appwrite/config";
import { useDispatch } from "react-redux";
import { addToAllPosts,addToMyPosts,addToActivePosts,updatePostInActivePosts,updatePostInAllPosts,updatePostInMyPosts,deletePostFromActivePosts,deletePostFromAllPosts,deletePostFromMyPosts } from "../../features/postSlice";
import { toPlain } from "../../utils/serialize";





function PostForm({post}) {
    console.log("updating post",post);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {userData}=useSelector((state)=>state.auth);
    const {register,handleSubmit,control,setValue,watch,formState :{errors}}=useForm({
        defaultValues:{
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        }
    })
    const onSubmit =async (data)=>{
        const fileInput=data.imageData?data.imageData[0]:null;
        delete data.imageData; // remove imageData from data object to avoid sending it to appwrite
        if(post){
            data.$id=post.$id;
            console.log("updating post",data);
            if(userData?.$id !== post.userId){
                return;
            }
            const newlyUploaded=fileInput? await appwriteService.createFile(fileInput) : null;
            if(newlyUploaded){
                await appwriteService.deleteFile(post.featuredImage);
                data.featuredImage=newlyUploaded.$id;
            }
            const res=await appwriteService.updatePost(post.$id,data); // we need to give old slug to update the post because in appwrite we are using slug as rowId and if slug is changed then it will create new post instead of updating the existing post
            if(res){
                dispatch(updatePostInAllPosts(toPlain(res)));
                if(userData.$id===res.userId){
                    dispatch(updatePostInMyPosts(toPlain(res)));
                }
                if(res.status==="active"){
                    dispatch(updatePostInActivePosts(toPlain(res)));
                }
                navigate(`/post/${res.slug || res.$id}`);
            }
        } else{
            const newlyUploaded=await appwriteService.createFile(fileInput);
            if(newlyUploaded){
                data.featuredImage=newlyUploaded.$id;
            }
            const res=await appwriteService.createPost(data.slug,{...data,userId: userData.$id});
            if(res){
                dispatch(addToAllPosts(toPlain(res)));
                if(userData.$id===res.userId){
                    dispatch(addToMyPosts(toPlain(res)));
                }
                if(res.status==="active"){
                    dispatch(addToActivePosts(toPlain(res)));
                }
                navigate(`/post/${res.slug || res.$id}`);
            }
        }
    }

    const slugTransform=useCallback((title)=>{
        return title.toLowerCase().replace(/ /g,"-").replace(/[^\w-]+/g,"");
    },[]);

    useEffect(()=>{
        const subscription=watch((value,{name})=>{
            if(name==="title"){
                const generatedSlug=slugTransform(value.title);
                setValue("slug",generatedSlug,{shouldValidate:true});
            }
        })
        return ()=>{
            subscription.unsubscribe();
        }
    },[watch,slugTransform,setValue]) // even if lexical scope of function changes the effect will run after rerender function is memoized but if watch or setValue changes the effect will run again and subscribe to the changes with new references of watch and setValue

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-wrap gap-4">
            {/* for title , slug and RTE this div is used on left */}
            <div  className="flex flex-col gap-4 w-full md:w-2/3">
                <Input
                    label="Title"
                    placeholder="Enter title"
                    {...register("title",{required:"Title is required"})}
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                <Input
                    label="Slug"
                    placeholder="Enter slug"
                    {...register("slug",{required:"Slug is required"})}
                    onInput={(e)=>setValue("slug",slugTransform(e.currentTarget.value),{shouldValidate:true})}
                />
                {errors.slug && <p className="text-red-500 text-sm">{errors.slug.message}</p>}
                <RTE
                    label="Content"
                    control={control}
                    name="content"
                    defaultValue={post?.content || ""}
                />
            </div>
            {/* for featured image and status this div is used on right also button */}
            <div  className="flex flex-col gap-4 w-full md:w-1/3">
                <Input
                    label="Featured Image"
                    type="file"
                    accept="image/*"
                    {...register("imageData",{required: post ? false : "Featured image is required"})}
                />
                {errors.imageData && <p className="text-red-500 text-sm">{errors.imageData.message}</p>}
                <Select
                    label="Status"
                    options={[
                        {value:"active",label:"Active"},
                        {value:"inactive",label:"Inactive"},
                    ]}
                    {...register("status",{required:"Status is required"})}
                />
                {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
                <Button type="submit" className={`mt-4 ${post ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"}`}>
                    {post ? "Update Post" : "Create Post"}
                </Button>
                
                    

            </div>
        </form>
    )

    
}

export default PostForm;