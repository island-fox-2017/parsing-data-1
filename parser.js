"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first, last, email, phone, createAt){
      this.id = id;
      this.firstName = first;
      this.lastName = last;
      this.email = email;
      this.phone = phone;
      this.createAt = createAt;
  }

}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = [];
  }

  get people() {
    return this._people;
  }

  addPerson(object) {
    this._people.push(object);

    let string = `${object.id},${object.firstName},${object.lastName},${object.email},${object.phone},${object.createAt}\n`;
    const fs = require('fs');
    fs.appendFile('people.csv', string, (err) => {
    if (err) throw err;
    console.log('The "data to append" was appended to file!');
});
  }



  parser(){
    var fs = require('fs');
    var data = fs.readFileSync(this._file).toString().split('\n');

    let multiArray = [];
    for(let i = 0; i < data.length; i++)
    {
      multiArray.push(data[i].split(','));
    }

    for(let i = 1; i < multiArray.length; i++)
    {
        let id = multiArray[i][0];
        let firstName = multiArray[i][1];
        let lastName = multiArray[i][2];
        let email = multiArray[i][3];
        let phone = multiArray[i][4];
        let createAt = multiArray[i][5];
        this._people.push(new Person(id, firstName, lastName, email, phone, createAt));
    }

    return this._people;

  }

}

let parser = new PersonParser('people.csv');
console.log(parser.parser());
let cek = parser.parser();
let date = new Date();
parser.addPerson(new Person('201', 'ahmad', 'nasikin', 'ahmad@gmail.com', '082312323', date));
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)

console.log(cek[cek.length-1]);
