import { Schema, model } from 'mongoose';

const schema = new Schema({
  title: { 
    type: String, 
    required: true,
    unique: true,
  },
  records: [{
    text: {
      type: String,
      required: true,
    },
    executionDate: {
      type: Date,
      default: null,
    }, 
    executionPlanTime: {
      type: Number,
      required: true,
    },
    executionTime: {
      type: Number,
      default: 0,
    },
    executionIntervals: [{ 
      start: {
        type: Date,
        required: true,
      },
      end: Date,
    }],
  }],
});

export default model('Sector', schema);