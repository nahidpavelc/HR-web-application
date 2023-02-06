import React from 'react';
import { Link } from 'react-router-dom';


const Banner = () => {
  

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src="https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" className="max-w-sm rounded-lg shadow-2xl" alt='' />
          <div>
            <h1 className="text-5xl font-bold">Apply For Leaves</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <Link to="/applyleaves">
            <button className="btn btn-primary">Apply </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
