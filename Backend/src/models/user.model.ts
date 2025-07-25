import mongoose, { Schema } from 'mongoose'; // Importing third party package
import bcrypt from 'bcryptjs'; // Importing third party package
import { IUser } from '../types/user.types'; // Imported user.types.ts as IUser interface is defined there

const UserSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: false,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  // New field for storing favorite movie IMDb IDs
  favorites: {
    type: [String], // array of IMDb IDs
    default: [],
  },
});

UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
