"use strict"

let fs = require("fs");

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
} // ---------- class Person


class PersonParser {
  constructor(file) {
    this._file = file;
    // this._file = fs.readFileSync(file, 'utf-8').trim();
    this._people = this.people;
  }

  get file() {
    return this._file;
  }

  get people() {
    let data = fs.readFileSync(this._file, 'utf-8').trim();
    // let data = this._file;
    let line = data.split('\n')

    let peopleInfo = [];
    for (var i = 1; i <= line.length - 1; i++) {
      let info = line[i].split(',');
      peopleInfo.push(new Person (info[0], info[1], info[2], info[3], info[4], info[5]));
    }

    return peopleInfo;
  }

  get size() {
    return this.people.length;
  }

  addPerson(baru) {
    let idBaru = this._people.length + 1;
    let entry = `\n${idBaru}, ${baru.first_name}, ${baru.last_name}, ${baru.email}, ${baru.phone}, ${baru.created_at}`;
    // debugger;
    fs.appendFileSync(this._file, entry, 'utf-8');
  }

} // ---------- class PersonParser

let parser = new PersonParser('people.csv');

// parser.addPerson(new Person(11, 'New', 'Person', 'fake@email.com', '1234567890', new Date().toISOString()));
console.log(parser.people);

// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`);
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`);
