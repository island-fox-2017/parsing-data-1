"use strict"
var fs = require('fs');

class Person {
  constructor(file) {
    this.toArr = file.split(',');
    this.attribute = {};
    this.attribute['id'] = this.toArr[0];
    this.attribute['first_name'] = this.toArr[1];
    this.attribute['last_name'] = this.toArr[2];
    this.attribute['email'] = this.toArr[3];
    this.attribute['phone'] = this.toArr[4];
    this.attribute['created_at'] = new Date();
  }
}

class PersonParser {
  constructor(file) {
    this._file = file;
    this._people = [];
    this.toArr = this.readFile();
    this.attributePerson();
  }

  readFile() {
    var file = fs.readFileSync('people.csv', 'utf8').toString().trim().split('\n');
    return file;
  }

  attributePerson() {
    for (let i = 1; i < this.toArr.length; i++) {
      let orang = new Person(this.toArr[i]);
      this._people.push(orang.attribute);
    }
  }

  tambahOrang(n) {
    this._people.push(n.attribute);
    this.simpan(n);
  }

  simpan(orangBaru) {
    let input = '\n';
    for (var i in orangBaru.attribute) {
        input += orangBaru.attribute[i] + ',';
    }
    fs.appendFileSync('people.csv', input);
  }

  get people() {
    return this._people
  }
}

let parser = new PersonParser('people.csv')
// console.log(parser);
console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)
parser.tambahOrang(new Person('201,Boy,Boyo,boy_boyo@mail.com,021-123-456-7'))
console.log(`Update!, there are ${parser.people.length} people in the file '${parser._file}' now.`)
