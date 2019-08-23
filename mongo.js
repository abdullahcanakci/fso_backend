const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fso_backend_db:${password}@cluster0-gsrix.mongodb.net/phonebook_app?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true })

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date
})

const Phone = mongoose.model('Phone', phoneSchema)

if (number !== undefined && name !== undefined) {
  const phone = new Phone({
    name: name,
    number: number,
    date: new Date()
  })

  phone
    .save()
    .then(response => {
      console.log('note saved')
      mongoose.connection.close()
    })
    .catch(error => {
      console.log('Error while saving the phone entry\n', error)
    })
} else {
  Phone
    .find({})
    .then(persons => {
      persons.map(p => console.log(p))
      mongoose.connection.close()
    })
    .catch(error => {
      console.log('Error while retrieving phone entries\n', error)
    })
}
