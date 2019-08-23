const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.set('useFindAndModify', false)
mongoose
  .connect(url, { useNewUrlParser: true })
  .then(result => {
    console.log('connected to mongodb')
  })
  .catch(error => {
    console.log('Error connecting to mongodb:', error.message)
  })

const peopleSchema = new mongoose.Schema({
  name: {type: String, required: true, minlength: 3,unique: true},
  number: {type: String, required:true, minlength: 8},
  date: Date
})

peopleSchema.plugin(uniqueValidator)

peopleSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('People', peopleSchema)
