import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(null);

  const hanldeChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // body data type must match "Content-Type" header
      });
      const data = await res.json();
      console.log(data);
      data.success ? setError(false) : setError(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="p-3  max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} action="" className="flex flex-col gap-4 ">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={hanldeChange}
        />
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
          {loading ? 'Loading' : 'Sign up'}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error && 'Something wnet wrong'}</p>
    </div>
  );
}
