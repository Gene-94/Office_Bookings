import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
  title : {
    type: String,
    required: true,
  },
  price : {
    type: Number,
    required: true,

  },
  maxPeople : {
    type: Number,
    required: true
  },
  roomNumber : {
    type: Number,
    required: true
  },
  unavalibleDates : {
    type: [Date],
    min: Date.now()
  }
  
},
{timestamps: true }
);

export default mongoose.model("Room", RoomSchema)