import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './Login.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../contexts/AuthProvider";
const eye = <FontAwesomeIcon icon={faEye} />;

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signIn, handleGoogleSignIn } = useContext(AuthContext);
  const [loginError, setLoginError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  // password hide
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const handleLogin = data => {
    console.log(data);
    setLoginError('');

    signIn(data.email, data.password)
      .then(result => {
        const user = result.user;
        console.log(user)
        navigate(from, { replace: true });
      })
      .catch(error => {
        console.log(error.message)
        setLoginError(error.message);
      });

  };

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
          </div>{" "}

          {/* Password  */}
          <div>
            <label className="label"><span className="label-text">Password</span></label>
            {""}
            <div className="login-pass-wrapper">
              {""}
              <input type={passwordShown ? "text" : "password"}
                className="input input-bordered w-full max-w-xs"
                {...register("password", {
                  required: "Password is required",
                })}
                aria-invalid={errors.password ? "true" : "false"}
                placeholder="Enter Password" />
              <i className="login-pass-wrapper-i" onClick={togglePasswordVisiblity}>{eye}</i>
              {""}
            </div>

            <label className="label"><span className="label-text">Forget Password</span></label>
            {errors.password && <p className="text-red-600">{errors.password?.message}</p>}
          </div>
          <input className="btn btn-accent w-full" type="submit" />
          <div>
            {loginError && <p className="text-red-500">{loginError}</p>}
          </div>
        </form>

        <p>New User? <Link className="text-secondary" to="/signup">Create New Account</Link></p>
        <div className="divider">OR</div>

        <button onClick={handleGoogleSignIn} className="btn btn-outline w-full">CONTINUE WITH GOOGLE</button>
      </div>
    </div>
  );
};

export default Login;
