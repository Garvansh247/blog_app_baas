import {useForm} from "react-hook-form";
import {Input,Logo,Button} from "../index";
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import authService from "../../appwrite/auth";
import {login} from "../../features/authSlice"
import { useDispatch } from "react-redux";

function Login(){
    const {register,handleSubmit,formState:{errors : rhfErrors}}=useForm();
    const navigate=useNavigate();
    const [serverError, setServerError] = useState("");
    const dispatch=useDispatch();


    const loginHandler=async (data)=>{
            setServerError("");
            try{
                const session=await authService.login(data);
                if(session){
                    const userData=await authService.getCurrentUser();
                    if(userData){
                        dispatch(login({userData}));
                        navigate("/");
                    }
                }
            } catch (e){
                setServerError(e.message || "Login failed. Please try again.");
            }
            
    }
    return (
        <>
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <Logo />
                </div>
                <h1 className="text-2xl font-bold text-gray-300 mb-6 text-center">Login to Your Account</h1>
                <p>Don&apos;t have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link></p>
                <form onSubmit={handleSubmit(loginHandler)} className="space-y-4 mt-6">
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        {...register("email",
                                {required:"Email is required",
                                validate:{
                                    matchPattern:(value)=>/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) || "Invalid email address"
                                }
                        })}
                    />
                    {rhfErrors.email && <p className="text-red-500 text-sm">{rhfErrors.email.message}</p>}
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {required:"Password is required"})}
                    />
                    {rhfErrors.password && <p className="text-red-500 text-sm">{rhfErrors.password.message}</p>}
                    {serverError && <p className="text-red-500 text-sm">{serverError}</p>}
                    <Button type="submit" className="w-full">Login</Button>
                </form>
            </div>
        </div>
        </>
    )
}

export default Login;