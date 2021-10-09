require('dotenv').config()
const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI



mongoose.connect(url).then( () => {
  console.log('connected to MongoDB')
})
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: { type: String, required: true,   minLength: 3, unique: true },
  number: { type: String, required: true,   minLength: 8 },
  date: Date,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

personSchema.plugin(uniqueValidator)



module.exports = mongoose.model('Person', personSchema)
