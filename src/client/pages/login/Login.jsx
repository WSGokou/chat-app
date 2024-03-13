import React from 'react';

const Login = () => {
  return (
    <div className="Login-container flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="Login-bg w-full p-6 rounded-lg bg-gray-600">
        <h1 className="Login-header text-3xl font-semibold text-center">
          Login
        </h1>

        <form className="Login-form">
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
          <a
            href="#"
            className="text-sm hover:underline hover:text-blue-600 cursor-pointer mt-2"
          >
            Don't have an account?{' '}
          </a>
          <button className="btn btn-block btn-sm mt-2">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
