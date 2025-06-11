import { Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react';
import { useState } from "react";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { UseAuthStore } from '../store/UseAuthStore';

function Login() {
  const { login, isLogging } = UseAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const validateForm = () => {
    if(!formData.email.trim()) return toast.error("email is required");
    if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid format");
    if(!formData.password.trim()) return toast.error("password is required");
    if(formData.password.length < 6 ) return toast.error("password atleast 6 character long");

    return true;
  };

  const handleSubmit = async(e) =>{
    e.preventDefault();
    const success = validateForm();
    if(success){
      login(formData);
    }
  }

  return (
    <div className='container h-screen flex justify-center items-center flex-col space-y-7 ' > 
      <div className='flex justify-center items-center flex-col space-y-[-50px] md:space-y-[-70px] lg:space-y-[-70px] ' >
        <img src="voicely.png" alt="logo" className='h-[400px] w-[400px] md:h-[300px] md:w-[300px] hover:animate-pulse' />
        <h1 className='text-2xl md:text-4xl lg:text-6xl font-stretch-expanded font-bold ' >Welcome back to Voicely</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 w-[40%] " >
      <div className="form-control" >
              <label className="label">
                <span className="label-text font-medium" >Email</span>
              </label>
              <div className="relative" >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none " >
                  <Mail className="size-5 text-base-content/40 "/>
                </div>
                <input type="email" 
                name="email"
                placeholder="johndoe123@gmail.com"
                className={`input input-bordered w-full pl-10`}
                value={formData.email}
                onChange={(e)=>setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div className="form-control" >
              <label className="label">
                <span className="label-text font-medium" >Password</span>
              </label>
              <div className="relative" >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none " >
                  <Lock className="size-5 text-base-content/40 "/>
                </div>
                <input type={showPassword ? "text" : "password"} 
                name="password"
                placeholder="******"
                className={`input input-bordered w-full pl-10`}
                value={formData.password}
                onChange={(e)=>setFormData({ ...formData, password: e.target.value })}
                />
                <button type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center "
                onClick={()=>setShowPassword(!showPassword)} >
                  { showPassword ? (
                    <EyeOff className="size-5 text-base-content/40 "/>
                  ) : (
                    <Eye className="size-5 text-base-content/40"/>
                  )}
                </button>
              </div>
            </div>
            <button type="submit" 
            className="btn btn-primary w-full" disabled={isLogging} >
              {
                isLogging ? (
                  <>
                  <Loader2 className="size-5 animate-spin"/>
                  Loading...
                  </>
                ) : (
                  "Logging Account"
                )
              }
            </button>
          </form>
          <div className="text-center" >
            <p className="text-base-content/60" >
            Create an account ? {" "}
            <Link to="/signup" className="link link-primary ">
            Signin
            </Link>
            </p>
          </div>
    </div>
  )
}

export default Login