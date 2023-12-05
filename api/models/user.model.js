import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        'https://img.freepik.com/premium-wektory/zdjecie-profilowe-awatara-czlowieka-ilustracja-wektorowa_268834-538.jpg',
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
