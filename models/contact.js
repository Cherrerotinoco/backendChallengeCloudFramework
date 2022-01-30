import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const contactSchema = new Schema({
  contactName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  }
})

const Contact = mongoose.model.Contact || mongoose.model('Contact', contactSchema)

export default Contact