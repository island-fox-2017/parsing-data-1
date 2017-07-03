"use strict"

let fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at){
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = new Date(created_at)
  }
  
  get insert(){
    return `${this.id}, ${this.first_name}, ${this.last_name}, ${this.email}, ${this.phone}, ${this.created_at}`
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  get people() {
    //split file by enter
    let fileContent = fs.readFileSync(this._file, 'utf8').trim().split('\n')
    
    //split by comma
    for(let i = 0; i < fileContent.length; i++){
      fileContent[i] = fileContent[i].split(',')
    }
    
    //split by row
    for(let i = 2; i < fileContent.length; i++){
      let persons = new Person(fileContent[i][0], fileContent[i][1], fileContent[i][2], fileContent[i][3], fileContent[i][4], new Date(fileContent[i][5]))
      this._people.push(persons)
    }
    return this._people
  }

  addPerson(addNew){
    this._people.push(addNew.insert)
    return this._people
  }
  
  save(){
    fs.appendFileSync(this._file, this._people + ('\n'), 'utf8')
  }
  
}

let parser = new PersonParser('people.csv')
let addNewPerson = new Person ('201', 'Ali', 'Hikmat', 'alihikmat@yahoo.com', '081314151617', (new Date ))
parser.addPerson(addNewPerson)
parser.save()

console.log(parser.people);
console.log(`There are ${parser._people.length} people in the file ${parser._file}.`)
