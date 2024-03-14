import React from 'react';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import useSignup from '../../hooks/useSignup';

const SignUp = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const {loading, signup} = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await signup(inputs);
  };

  return (
    <div className="Signup-container flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="Signup-bg w-full p-6 rounded-lg bg-gray-600">
        <h1 className="Signup-header text-3xl font-semibold text-center">
          Sign Up
        </h1>

        <form
          onSubmit={handleSubmit}
          className="Signup-form"
        >
          <div className="Username-container">
            <label
              htmlFor="username"
              className="label p-2"
            >
              <span className="text-base label-text">Username</span>
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter Username"
              className="w-full input input-bordered h-10"
              value={inputs.username.toLowerCase()}
              onChange={(e) => setInputs({...inputs, username: e.target.value})}
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
              type="password"
              placeholder="Enter password"
              className="w-full input input-bordered h-10"
              value={inputs.password}
              onChange={(e) => setInputs({...inputs, password: e.target.value})}
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
              type="password"
              placeholder="Confirm password"
              className="w-full input input-bordered h-10"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({...inputs, confirmPassword: e.target.value})
              }
            />
          </div>
          <Link
            to={'/login'}
            className="text-sm hover:underline hover:text-blue-600 cursor-pointer mt-2"
          >
            Already have an account?{' '}
          </Link>
          <button
            className="btn btn-block btn-sm mt-2"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
