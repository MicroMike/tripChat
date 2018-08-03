import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userInfoSchema = new Schema({
  userId: { type: 'String', required: true },
  avatar: { type: 'String', required: true },
  gender: { type: 'String', required: true },
})

export const UserInfo = mongoose.model('UserInfo', userInfoSchema, 'userInfos')
