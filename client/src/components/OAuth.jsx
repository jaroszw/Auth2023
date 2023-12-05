import { GoogleAuthProvider } from 'firebase/auth';

export default function OAuth() {
  const hanldeGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
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
