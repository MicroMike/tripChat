import mongoose from 'mongoose'
const Schema = mongoose.Schema

const tripSchema = new Schema({
  userId: { type: 'String', required: true },
  tripId: { type: 'String', required: true },
})

export const Trip = mongoose.model('Trip', tripSchema, 'trips')
