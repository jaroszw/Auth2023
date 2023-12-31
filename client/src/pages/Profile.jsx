import { useSelector, useDispatch } from 'react-redux';
import { useRef, useEffect, useState } from 'react';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { app } from '../firbase.js';
import {
  updateFailure,
  updateStart,
  updateSuccess,
  deleteUserSuccess,
  deleteUserStart,
} from '../redux/user/userSlice.js';

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [updateMessageSuccess, setupdateMessageSuccess] = useState(null);
  const [formData, setFormData] = useState({});
  const fileRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (image) {
      imageHandler(image);
    }
  }, [image]);

  const formDataHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const imageHandler = async (img) => {
    if (!img) {
      alert('Please choose a file first!');
    }

    const storage = getStorage(app);
    const fileName = new Date().getTime() + img.name;
    const storageRef = ref(storage, `/files/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setImagePercent(percent);
      },
      (err) => {
        console.log(err);
        setImageError('true');
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, profilePicture: downloadUrl });
        });
      }
    );
  };

  const updateUserHanlder = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateStart());
      const res = await fetch(
        `http://localhost:3000/api/user/update/${currentUser._id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          credentials: 'include',
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateFailure(data));
      }
      dispatch(updateSuccess(data));
      setupdateMessageSuccess(true);
      setTimeout(() => {
        setupdateMessageSuccess(false);
      }, 2000);
    } catch (error) {
      setupdateMessageSuccess(false);
      dispatch(updateFailure(error.message));
      console.log(error);
    }
  };

  const deleteUserHandler = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(
        `http://localhost:3000/api/user/delete/${currentUser._id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateFailure(data));
      }
      dispatch(deleteUserSuccess());
    } catch (error) {
      dispatch(updateFailure(error));
      console.log(error);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <form className="flex flex-col gap-4" onSubmit={updateUserHanlder}>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt="profile"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700">
              Error uploading image (file must be less than 2 MB)
            </span>
          ) : imagePercent < 100 && imagePercent > 0 ? (
            <span className="text-slate-700">
              {`Uploading: ${imagePercent} %`}{' '}
            </span>
          ) : imagePercent === 100 ? (
            <span className="text-green-700">Image uploaded successfuly</span>
          ) : (
            ''
          )}
        </p>
        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
          onChange={formDataHandler}
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={formDataHandler}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
          onChange={formDataHandler}
        />
        <button
          className="bg-slate-700 text-white p-3 rounded-lg uppercase	font-bold hover:opacity-95 disabled-80 "
          disabled={loading}
        >
          {loading ? 'Updating' : 'Update'}
        </button>
      </form>

      <div className="flex justify-between mt-5">
        <span
          onClick={deleteUserHandler}
          className="text-red-700 cursor-pointer"
        >
          delete account
        </span>
        <span className="text-red-700 cursor-pointer">sign out</span>
      </div>
      <p className="text-red-700 mt-5">
        {error && 'Something went wrong, try again or fuck off'}
      </p>
      <p className="text-green-700 mt-5">
        {updateMessageSuccess && 'User was updated succesfully'}
      </p>
    </div>
  );
}
