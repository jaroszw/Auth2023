import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function Signin() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //
  const { loading, error } = useSelector((state) => state.user);

  const hanldeChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('http://localhost:3000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      const data = await res.json();
      console.log(data);

      if (data.success) {
        dispatch(signInSuccess(data));
        navigate('/');
      } else {
        console.dir(data);
        dispatch(signInFailure(data));
      }
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className="p-3  max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} action="" className="flex flex-col gap-4 ">
        <input
          type="text"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={hanldeChange}
        />
        <input
          type="text"
          placeholder="Pasword"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={hanldeChange}
        />
        <button
          disabled={loading}
          type="submit"
          className="text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 bg-slate-700"
        >
          {loading ? 'Loading' : 'Sign in'}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don &apos; t have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">
        {error ? error.message || 'Something went wrong' : ''}
      </p>
    </div>
  );
}
