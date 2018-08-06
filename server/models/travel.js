import mongoose from 'mongoose'
const Schema = mongoose.Schema

const travelSchema = new Schema({
  userId: { type: 'String', required: true },
  travelId: { type: 'String', required: true },
  type: { type: 'String', required: true },
  dateStart: { type: 'Date' },
})

export const Travel = mongoose.model('Travel', travelSchema, 'travels')
