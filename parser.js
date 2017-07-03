"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, firstName, lastName, email, phone, createdAt ){
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.createdAt = new Date().toISOString();
  }
}

class PersonParser {

  constructor(file) {
    this._file = file;
    this.arr = []
    this._data = this.getData()
    this._people = this.inputPeople()
  }
  
  getData(){
    let fs = require('fs');
    let csv = (fs.readFileSync(this._file, "utf-8"))
    // console.log(csv);
    let arrData = csv.split('\n')
    for(let i = 0 ; i <  arrData.length ; i++){
      arrData[i] = arrData[i].split(',')
    }
    // console.log(arrData);
    return arrData
  }

  inputPeople(){
    let arr = [];
    for (let i = 1 ; i < this._data.length ; i++){
      arr[i-1] = new Person(this._data[i][0], this._data[i][1], this._data[i][2], this._data[i][3], this._data[i][4])
    }
    
    return arr
  }
  
  get people() {
    return this._people
  }
  
  get file(){
    return this._file;
  }
  
  addPerson(inputNewPerson) {
    this._people.push(inputNewPerson);
    this.writePeople(inputNewPerson);
  }

  writePeople(inputPeople){
    let fs = require('fs')
    let string = `${inputPeople.id},${inputPeople.firstName},${inputPeople.lastName},${inputPeople.email},${inputPeople.phone},${inputPeople.createdAt}\n`;
    fs.appendFileSync(this._file, string, 'utf-8')
    
  }
}

let parser = new PersonParser('people.csv')
// console.log(parser.inputPeople());
console.log(parser._people.length);

parser.addPerson(new Person(201, 'Lisa', 'Kusumawati', 'miss.lizz@gmail.com', '1-703-520-4121', '16 Maret 1986'))
console.log(`There are ${parser._people.length} people in the file '${parser.file}'.`)
console.log(parser._people[200]);
console.log(parser._people[150].email)
