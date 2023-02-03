import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleLogin = data => {
    console.log(data);
    console.log(errors);
  }

  return (
    <div className='h-[800px] flex justify-center items-center' style={{ height: '720px' }} >
      <div className="w-96 p-7 bg-blue-700">
        <h2 className="text-xl text-center">Login</h2>

        <form onSubmit={handleSubmit(handleLogin)} >
          {/* Email  */}
          <div className="form-control w-full max-w-xs">
            <label className="label"><span className="label-text">Email</span></label>
            <input type="text"
              className="input input-bordered w-full max-w-xs"
              {...register("email", { required: "Email Address is required" })}
              aria-invalid={errors.email ? "true" : "false"}
              placeholder="Enter Email" />
            {errors.email && <p className="text-red-600">{errors.email?.message}</p>}
          </div>

          {/* Password  */}
          <div className="form-control w-full max-w-xs">
            <label className="label"><span className="label-text">Password</span></label>
            <input type="password"
              className="input input-bordered w-full max-w-xs"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be 6 chacter or longer"}

              })}
              aria-invalid={errors.password ? "true" : "false"}
              placeholder="Enter Password" />
            <label className="label"><span className="label-text">Forget Password</span></label>
            {errors.password && <p className="text-red-600">{errors.password?.message}</p>}
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
