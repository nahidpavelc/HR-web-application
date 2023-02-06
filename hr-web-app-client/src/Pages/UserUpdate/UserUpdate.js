import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;

const UserUpdate = () => {

  const { user } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  console.log(user)

  // password hide
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <>
      <div className='h-[800px] flex justify-center items-center' style={{ height: '720px' }} >
        <div className="w-96 p-7 bg-blue-700">
          <h2 className="text-xl text-center">Update User</h2>

          <form onSubmit={handleSubmit()} >
            {/* Image */}
            <div className='grid place-content-center p-5'>
              <div className="avatar text-center">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
            </div>


            {/* insert Image  */}
            <input type="file" className="file-input file-input-bordered w-full max-w-xs" accept="image/png, image/jpeg" />
            {/* Name  */}
            <div className="form-control w-full max-w-xs">
              <label className="label"><span className="label-text">Name</span></label>
              <input type="text" {...register("name", { required: true })} className="input input-bordered w-full max-w-xs" placeholder="Enter Name" defaultValue={user?.displayName} />
            </div>


            {/* Email  */}
            <div className="form-control w-full max-w-xs">
              <label className="label"><span className="label-text">Email</span></label>
              <input type="text"
                defaultValue={user?.email}
                className="input input-bordered w-full max-w-xs"
                {...register("email")}
                aria-invalid={errors.email ? "true" : "false"}
                placeholder="Enter Email" />
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
                  placeholder="Update Password"
                />
                <i className='sign-pass-wrapper-i' onClick={togglePasswordVisiblity}>{eye}</i>
                {" "}
              </div>
              {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
              <span className='pt-5'></span>
            </div>

            <button className="btn btn-accent w-full" type="submit">Update</button>
          </form>




        </div>
      </div>
    </>
  );
};

export default UserUpdate;
