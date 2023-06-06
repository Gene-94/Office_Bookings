import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username : {
    type: String,
    required: true,
    unique: true
  },
  email : {
    type: String,
    required: true,
    unique: true,
    //validate for correct email format
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "invalid email format"]
  },
  password : {
    //pass wprd is hashed therefore validation is made on submittion
    type: String,
    required: true
  },
  isAdmin : {
    type: Boolean,
    default: false
  },
  
},
{timestamps: true }
);

export default mongoose.model("User", UserSchema)