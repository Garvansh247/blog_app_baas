import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from './store/store.js';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import {Home,Login,Signup,AllPosts,MyPosts,CreatePost,Post,EditPost} from './pages/index.js';
import AuthLayout from './components/AuthLayout.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path:"/",
        element:<AuthLayout workForAll={true}><Home/></AuthLayout>,
      },
      {
        path:"/login",
        element:<AuthLayout authenticated={false}><Login/></AuthLayout>,
      },
      {
        path:"/signup",
        element:<AuthLayout authenticated={false}><Signup/></AuthLayout>,
      },
      {
        path:"/all-posts",
        element:<AuthLayout workForAll={true}><AllPosts/></AuthLayout>,
      },
      {
        path:"/my-posts",
        element:<AuthLayout authenticated={true}><MyPosts/></AuthLayout>,
      },
      {
        path:"/create-post",
        element:<AuthLayout authenticated={true}><CreatePost/></AuthLayout>,
      },
      {
        path:"/post/:slug",
        element:<AuthLayout workForAll={true}><Post/></AuthLayout>,
      },
      {
        path:"/edit-post/:slug",
        element:<AuthLayout authenticated={true}><EditPost/></AuthLayout>,
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
