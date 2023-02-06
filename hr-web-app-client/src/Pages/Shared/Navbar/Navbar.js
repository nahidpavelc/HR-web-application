import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => { })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
        </div>
        <div className="flex-none">
          <div tabIndex={0} className=" w-32 bg-base-100 shadow">
            <Link to="/"><button className="btn btn-primary btn-block"> Home </button></Link>
          </div>

          <div className="dropdown dropdown-end">
            {user?.uid ?
              <>
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={user.photoURL} />
                  </div>
                </label>
                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                  <li>
                    <Link to="/userupdate" className="justify-between">
                      User Update
                      <span className="badge">New</span>
                    </Link>
                  </li>
                  <li><Link to="/dashboard" >Dashboard</Link></li>
                  <li><a onClick={handleLogOut}>Logout</a></li>
                </ul>
              </>
              :
              <Link to="/login"><button className="btn btn-primary btn-block"> login </button></Link>
            }


          </div>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
