import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  contacts: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Contact',
    unique: true
  }]
})

const User = mongoose.model.User || mongoose.model('User', userSchema)

export default User