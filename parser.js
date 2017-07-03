"use strict"

//
var fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor (id, first_name, last_name, email, phone, created_at) {
    this.id = id
    this.firstName = first_name
    this.lastName = last_name
    this.email = email
    this.phone = phone
    this.createDay = new Date()
  }
  get attributes(){
    return `${this.id},${this.firstName},${this.lastName},${this.email},${this.phone},${this.createDay}`
}
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  readFile() {
    var csvFile = fs.readFileSync(this._file, 'utf8').toString().trim().split('\n');
    let arr = [];
    for (let i=0; i<csvFile.length; i++) {
      arr.push(csvFile[i].split(','))
    }
    for (let i = 1; i < arr.length; i++) {
      let newObj = {};
      for (let j = 0; j < 6; j++) {
        newObj[arr[0][j]] = arr[i][j];
      }
      this._people.push(newObj);
    }
    return this._people;
  }

  get people() {
    return this._people
  }

  addPerson(add) {
    return this._people.push(add.attributes)
  }

  save(){
    fs.appendFileSync(this._file, this._people + ('\n'), 'utf8')
  }
}

let parser = new PersonParser('people.csv')
let newUser = new Person ('201', 'Rahmat', 'Hidayat', 'hidayat.85@gmail.com', '081572016058', new Date())
parser.addPerson(newUser);
parser.save();

console.log(parser.people);
// console.log(`There are ${parser._people.length} people in the file ${parser._file}.`)
console.log(parser.readFile());
