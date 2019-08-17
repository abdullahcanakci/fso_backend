const mongoose = require('mongoose')
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
	name: String,
	number: String,
	date: Date
})

peopleSchema.set('toJSON', {
    transform:(document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('People', peopleSchema)