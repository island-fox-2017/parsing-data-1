"use strict"

var fs = require('fs')
var dataPerBaris = fs.readFileSync('people.csv', 'utf8').trim().split('\n')


class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, firstName, lastName, email, phone, created) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.phone = phone
    this.created = created
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  get people() {
    return this._people
  }

  addPerson(newNamaDepan, newNamaBelakang, newEmail, newHp) {
    let textNewPerson = new Person(dataPerBaris.length, newNamaDepan, newNamaBelakang, newEmail, newHp, new Date())
    // let textNewPersonValue = []
    // for (let i=0; i<textNewPerson.length; i++) {
    //   textNewPersonValue.push(textNewPerson[i].split(':')[1])
    // }
    fs.appendFile('people.csv', `${textNewPerson['id']},${textNewPerson['firstName']},${textNewPerson['lastName']},${textNewPerson['email']},${textNewPerson['phone']},${textNewPerson['created']}\n`, (err) => {
      if (err) throw err
      console.log('The "data to append" was appended to file!')
    })
  }

  parse() {
    for (let i=1; i<dataPerBaris.length; i++) {
      dataPerBaris[i] = dataPerBaris[i].split(',')
      this._people.push(new Person(dataPerBaris[i][0], dataPerBaris[i][1], dataPerBaris[i][2], dataPerBaris[i][3], dataPerBaris[i][4], dataPerBaris[i][5]))
    }
    // console.log(this.people);
  }

}

let parser = new PersonParser('people.csv')
parser.parse()

// parser.addPerson('irianto','kbarek','iriantokbarek@local','082199990000')
// parser.addPerson('tri','kbarek','trikbarek@campus','082100009999')
// console.log(parser.people)

console.log(`There are ${parser._people.length} people in the file '${parser._file}'.`)
