"use strict"
const fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = created_at;
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = [];
  }

  get people() {
    return this._people;
  }

  addPerson(append) {
    fs.appendFile('people.csv', append, (err) => {
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
    });
  }

  parser() {
    let filePeople = fs.readFileSync(this._file, 'utf8');

    let arrLine = filePeople.split('\n');
    let arrPeople = [];
    let arrMulti = [];
    for (let i = 1; i < arrLine.length; i++) {
      arrPeople.push(arrLine[i]);
    }
    for (let i = 0; i < arrPeople.length - 1; i++) {
      arrPeople[i] = arrPeople[i].split(',');
      this._people.push(new Person(arrPeople[i][0], arrPeople[i][1], arrPeople[i][2], arrPeople[i][3], arrPeople[i][4], arrPeople[i][5]));
    }

    return this._people;
  }

}

let parser = new PersonParser('people.csv')
console.log(parser.parser());
console.log();
let nextId = parseInt(parser._people[parser._people.length - 1].id) + 1;
parser.addPerson(`${nextId},AMcKenzie,Aurris,Aauris.Aorbi.non@nequeNullam.com,2-906-235-0832,3013-07-06T07:23:09-07:00\n`);
//console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
