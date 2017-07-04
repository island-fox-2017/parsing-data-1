"use strict"

var fs = require('fs');

// console.log(file);

class Person {
  constructor(id, first_name, last_name, email, phone, created_at){
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email =  email
    this.phone = phone
    this._created_at = new Date(created_at)

  }
  // Look at the above CSV file
  // What attributes should a Person object have?
}

class PersonParser {
  constructor(file) {
    this._file = file
    this._people = this.parserFile()
  }

  parserFile(){
    let fileParser = fs.readFileSync('people.csv').toString().split('\n');
    let files = [];
    let arrObj = [];
    // this.person = new person()
    for (let i = 1; i < fileParser.length; i++) {
      files.push(fileParser[i].split(','))
    }
    for (let i = 0; i < files.length; i++){
      // for (let j = 0; j < files[i].length; j++){
        arrObj[i]=new Person(files[i][0],files[i][1],files[i][2],files[i][3],files[i][4],files[i][5]) //komposisi
      }
    return arrObj;
  }

  get people() {
    return this._people
  }

  addPerson(Obj) {
    this.people.push(Obj)
    // return this._parsing
    let Objz = Obj
    // console.log(Objz)
    this.string = `${Objz.id},${Objz.first_name},${Objz.last_name},${Objz.email},${Objz.phone},${Objz._created_at.toISOString()}\n`
    fs.appendFileSync(this._file,this.string,'utf8');
    // console.log(this.string);
    return Obj
  }
}

let parser = new PersonParser('people.csv')
console.log(parser.parserFile());
console.log(parser.addPerson(new Person ("202","ahmad","nisikin","nisikin@ahmad.com","1-325-209-3431","16 Feb 1887")));
console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)
