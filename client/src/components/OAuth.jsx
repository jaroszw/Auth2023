import { useDispatch } from 'react-redux';
import { signInWithGooglePopup } from '../firbase';
import { signInStart, signInSuccess } from '../redux/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hanldeGoogleClick = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());

      const result = await signInWithGooglePopup();

      const res = await fetch('http://localhost:3000/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
        credentials: 'include',
      });

      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.log('Could not login with google', error);
    }
  };

  return (
    <button
      type="button"
      onClick={hanldeGoogleClick}
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
    >
      Continue with Google
    </button>
  );
}
