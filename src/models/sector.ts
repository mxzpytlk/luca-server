import { Schema, model } from 'mongoose';

const schema = new Schema({
  title: { 
    type: String, 
    required: true,
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