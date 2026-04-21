const mongoose = require('mongoose')

if (process.argv.length < 3) {

    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://juansanchezrobles_db_user:${password}@cluster0.jxrtdsl.mongodb.net/agenda?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 4) {
    const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
})
    person.save().then(result =>{
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    console.log(person)
    mongoose.connection.close()
})
} else {
    Person.find({}).then(result => {
        console.log(`Phonebook:`)
        result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
    })
  mongoose.connection.close()
})
}

