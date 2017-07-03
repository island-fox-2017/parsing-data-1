"use strict"
var fs = require('fs');
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(file){
    this.toArray = file.split(',')
    this.attributes = {}
    this.attributes['id'] = this.toArray[0];
    this.attributes['first_name'] = this.toArray[1];
    this.attributes['last_name'] = this.toArray[2];
    this.attributes['email'] = this.toArray[3];
    this.attributes['phone'] = this.toArray[4];
    this.attributes['created_at'] = new Date(this.toArray[5]).toISOString();
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
    this.toArray = this.splitFile();
    this.addToObject()

  }
  splitFile(){
    var newFile = fs.readFileSync(this._file , 'utf8').toString().trim().split('\n');
    return newFile
  }
  addToObject (input){
    for (var i = 1; i < this.toArray.length ; i++) {
      let toObject = new Person(this.toArray[i])
      this._people.push(toObject.attributes);
    }
  }
  get people() {
    this._people = this._people
    return this
  }
   get size(){
     return this._people.length
   }


  addPerson(input) {
    let toObject = new Person (input) ;
    this._people.push(toObject.attributes);

  }
  save(input){
    fs.appendFileSync(this._file, input)
  }
}

let parser = new PersonParser('people.csv')
console.log(`There are ${parser.size} people in the file '${parser._file}'.`)
