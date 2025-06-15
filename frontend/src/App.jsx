import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from 'react-router-dom';
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import { UseThemeStore } from "./store/UseThemeStore";
// import { UseAuthStore } from "./store/UseAuthStore";

const Home = lazy(()=>import('./pages/Home'));
const Signup = lazy(()=>import('./pages/Signup'));
const Login = lazy(()=>import('./pages/Login'));
const Profile = lazy(()=>import('./pages/Profile'));
const Community = lazy(()=>import('./pages/Community'));
const Thread = lazy(()=>import('./pages/PostThread'));
const ViewCommunity = lazy(()=>import('./components/ViewCommunity'));

function App() {
  const { theme } = UseThemeStore();
  // const navigate = useNavigate();
  // const { authUser } = UseAuthStore();

  // if(!authUser){
  //   navigate('/login');
  // }

  return (
    //todo
    <div data-theme={theme} >
      <Suspense fallback={<Loading/>}>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar/>
        <Routes>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/profile/:id" element={<Profile/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/community" element={<Community/>}/>
          <Route path="/newThread" element={<Thread/>}/>
          <Route path="/viewCommunity/:id" element={<ViewCommunity/>}/>
        </Routes>
        <Footer/>
      </Suspense>
    </div>
  )
}

export default App