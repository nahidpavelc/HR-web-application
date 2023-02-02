import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();
  
  const handleLogin = data => {
    console.log(data);
  }

  return (
    <div className='h-[800px] flex justify-center items-center' style={{ height: '720px' }} >
      <div className="w-96 p-7 bg-accent-focus">
        <h2 className="text-xl text-center">Login</h2>

        <form onSubmit={handleSubmit(handleLogin)} >
          <div className="form-control w-full max-w-xs">
            <label className="label"><span className="label-text">Email</span></label>
            <input type="text" className="input input-bordered w-full max-w-xs" {...register("email")} placeholder="Enter Email" />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label"><span className="label-text">Password</span></label>
            <input type="password" className="input input-bordered w-full max-w-xs" {...register("password")} placeholder="Enter Password" />
            <label className="label"><span className="label-text">Forget Password</span></label>
          </div>

          <input className="btn btn-accent w-full" type="submit" />
        </form>
        <p>New User? <Link className="text-secondary" to="/signup">Create New Account</Link></p>
        <div className="divider">OR</div>

        <button className="btn btn-outline w-full">CONTINUE WITH GOOGLE</button>
      </div>
    </div>
  );
};

export default Login;
