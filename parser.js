"use strict"
let fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor (id, first_name, last_name, email, phone, create_at) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.create_at = create_at;
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.parse();
  }

  parse() {
    let list = fs.readFileSync('people.csv','utf8').split('\n');
    let data = [];
    let arrObj = [];
    for (var i = 0; i < list.length; i++) {
      data[i] = list[i].split(',')
    }
    for (var i = 0; i < data.length; i++) {
      arrObj[i] = new Person(data[i][0], data[i][1], data[i][2],data[i][3], data[i][4], data[i][5])
    }
    return arrObj;
    //console.log(arrObj);
  }
  get people() {
    return this._people
  }

  addPerson(Obj) {
   this.people.push(new Person(Obj));
   let ObjBaru = Obj;
   this.string = `${ObjBaru.id}, ${ObjBaru.first_name}, ${ObjBaru.last_name}, ${ObjBaru.email}, ${ObjBaru.phone}, ${ObjBaru.create_at.toISOString()}\n`
   fs.appenFileSync(this.file.string,'utf8')
   return Obj
  }

}

let parser = new PersonParser('people.csv')
parser.parse()
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
console.log(parser.people);
