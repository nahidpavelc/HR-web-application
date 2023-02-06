import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Datepicker from 'react-tailwindcss-datepicker';
import { AuthContext } from '../../../contexts/AuthProvider';

const ApplyLeaves = () => {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11)
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  }

  const { user } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  console.log(user)

  return (
    <>
      <>
        <div className='h-[800px] flex justify-center items-center' style={{ height: '720px' }} >
          <div className="w-96 p-7 bg-blue-700">
            <h2 className="text-xl text-center">Apply for Leaves</h2>

            <form onSubmit={handleSubmit()} >

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
              {/* date  */}
              <div className='form-control w-full max-w-xs'>
                <label className="label"><span className="label-text">Date</span></label>
                <Datepicker value={value} classNames="input input-bordered w-full max-w-xs" onChange={handleValueChange} />
              </div>
              <div className='form-control w-full max-w-xs'>
                <label className="label"><span className="label-text">Add the Reason</span></label>
                <textarea placeholder="Reason" className="textarea textarea-bordered textarea-lg w-full max-w-xs" ></textarea>
              </div>

              <button className="btn btn-accent w-full mt-5" type="submit">Update</button>
            </form>




          </div>
        </div>
      </>
    </>
  );
};

export default ApplyLeaves;
