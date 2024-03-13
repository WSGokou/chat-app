import React from 'react';

const SignUp = () => {
  return (
    <div className="Signup-container flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="Signup-bg w-full p-6 rounded-lg bg-gray-600">
        <h1 className="Signup-header text-3xl font-semibold text-center">
          Sign Up
        </h1>

        <form className="Signup-form">
          <div className="Username-container">
            <label
              htmlFor="username"
              className="label p-2"
            >
              <span className="text-base label-text">Username</span>
            </label>
            <input
              id="username"
              placeholder="Enter Username"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div className="Password-container">
            <label
              htmlFor="password"
              className="label p-2"
            >
              <span className="text-base label-text">Password</span>
            </label>
            <input
              id="password"
              placeholder="Enter password"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div className="Confirm-password-container">
            <label
              htmlFor="confirm-password"
              className="label p-2"
            >
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              id="confirm-password"
              placeholder="Confirm password"
              className="w-full input input-bordered h-10"
            />
          </div>
          <a
            href="#"
            className="text-sm hover:underline hover:text-blue-600 cursor-pointer mt-2"
          >
            Already have an account?{' '}
          </a>
          <button className="btn btn-block btn-sm mt-2">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
