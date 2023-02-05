import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './SignUp.css'
import { AuthContext } from '../../contexts/AuthProvider';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-hot-toast';
const eye = <FontAwesomeIcon icon={faEye} />;

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser, updateUser } = useContext(AuthContext)
  const [signUpError, setSignUpError] = useState(' ')

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const handleSignUp = (data) => {
    console.log(data);
    setSignUpError('');

    createUser(data.email, data.password)
      .then(result => {
        const user = result.user;
        console.log(user);
        toast('User created Successfully.')
        const userInfo = {
          displayName: data.name
        }
        updateUser(userInfo)
          .then(() => { })
          .catch(err => console.log(err));
      })
      .catch(error => {
        console.log(error)
        setSignUpError(error.message)
      });
  }

  return (
    <>
      <div className='h-[800px] flex justify-center items-center' style={{ height: '720px' }} >
        <div className="w-96 p-7 bg-blue-700">
          <h2 className="text-xl text-center">Sign Up</h2>

          <form onSubmit={handleSubmit(handleSignUp)} >
            {/* Name  */}
            <div className="form-control w-full max-w-xs">
              <label className="label"><span className="label-text">Name</span></label>
              <input type="text" {...register("name", { required: 'Name is required' })} className="input input-bordered w-full max-w-xs" placeholder='Enter Name' />
              {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
            </div>

            {/* Email  */}
            <div className="form-control w-full max-w-xs">
              <label className="label"><span className="label-text">Email</span></label>
              <input type="email" {...register("email", { required: 'Email is required' })} className="input input-bordered w-full max-w-xs" placeholder="Enter Email" />
              {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
            </div>

            {/* Password  */}
            <div className="form-control w-full max-w-xs">
              <label className="label"><span className="label-text">Password</span></label>
              {" "}
              <div className='sign-pass-wrapper'>
                {" "}
                <input type={passwordShown ? "text" : "password"}
                  className="input input-bordered w-full max-w-xs"
                  {...register("password", {
                    required: 'Password is required',
                    // minLength: { value: 6, message: "Password length must be 6+ Character with Aa, @#$%& & 0-9" },
                    pattern: { value: /(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*[0-9]){1,})(?=(.*[@#$%&]){1,}).{6,}/, message: 'Password length must be 6+ Character with AB, ab, @&#$% & 0-9' }
                  })}
                  placeholder="Enter Password"
                />
                <i className='sign-pass-wrapper-i' onClick={togglePasswordVisiblity}>{eye}</i>
                {" "}
              </div>

              {errors.password && <p className='text-red-500'>{errors.password.message}</p>}

              <span className='pt-5'></span>
            </div>

            <input className="btn btn-accent w-full" value="Sign Up" type="submit" />
            { signUpError && <p className='text-red-500'>{signUpError}</p>

            }
          </form>
          <p>Already have an account? <Link className="text-secondary" to="/login">Please Login</Link></p>
          <div className="divider">OR</div>

          <button className="btn btn-outline w-full">CONTINUE WITH GOOGLE</button>
        </div>
      </div>
    </>
  );
};

export default SignUp;
