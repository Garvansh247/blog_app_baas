import { useState,useEffect } from 'react'
import './index.css'
import authService from './appwrite/auth.js';
import { useDispatch } from 'react-redux';
import { login,logout } from './features/authSlice.js';

function App() {
  const [loading,setLoading]=useState(true);
  const dispatch = useDispatch();

  useEffect( // will run once when the app loads/mounts to check if user is already logged in or not
    ()=>{
      authService.getCurrentUser()
        .then((user)=>{
          if(user){
            console.log("User is logged in",user);
            dispatch(login({userData: user}));
          } else {
            console.log("No user logged in");
            dispatch(logout());
          }
        })
        .catch((err)=>{
          console.error("Error fetching user data",err);
          // dispatch(logout());
        })
        .finally(()=>{
          setLoading(false);
        });
    },[]
  )
  return !loading? (
    <>
      
    </>
  )
   :
  <>
    {"Loading..."};
  </>
}

export default App
