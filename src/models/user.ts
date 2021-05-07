import { Schema, model, Types } from 'mongoose';

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  pass: {
    type: String, 
    required: true,
  },
  sectors: [{
    type: Types.ObjectId,
    ref: 'Sector',
  }],
});

export default model('User', schema);
