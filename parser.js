"use strict"

class Person {
  constructor(id, first_name, last_name, email, phone, created_at){
    this.id = id;
    this.firstName = first_name;
    this.lastName = last_name;
    this.email = email;
    this.phone = phone;
    this.create = new Date();
  }
  // Look at the above CSV file
  // What attributes should a Person object have?
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
}

  parsingpeople(){
    var fs = require("fs")
    var pase = fs.readFileSync(this._file).toString().split("\n");
    return pase;
    }

  parseArray(){
    var tampungParse = this.parsingpeople();
    var temp = [];
    for(let i=0; i<tampungParse.length ; i++){
      temp.push(tampungParse[i].split(","));
    }
    return temp;
  }
  parseObj(){
    var tampungObj = this.parseArray();
    var arr = [];
    for (var i = 1; i < tampungObj.length; i++) {
      var obj = {};
      for (var j = 0; j < tampungObj[0].length; j++) {
        obj[tampungObj[0][j]] = tampungObj[i][j]
      }
      arr.push(obj);
    }
    return arr;
  }
  get people() {
    return this._people
  }
  addSemuaPerson(){
    var tampObjArr = this.parseObj();
    for (var i = 0; i < tampObjArr.length; i++) {
      var orang = new Person(tampObjArr[i])
      this._people.push(orang);
    }
    return this._people;
   }
  save(){
    var fs = require("fs")
    var ObjtoStr = `${this.tambah.id},${this.tambah.firstName},${this.tambah.lastName},${this.tambah.email},${this.tambah.phone}\n`
    fs.appendFile(this._file, ObjtoStr , "utf8")
  }

addPerson(tambah) {
  this.tambah = tambah
  this._people.push(tambah)
  return this._people
}
}
// let person = new Person("people.csv")
let parser = new PersonParser('people.csv')
console.log(parser.addPerson(new Person("199","Talon","Ryan","condimentum@risusNuncac.org","1-712-327-5317")));
parser.save();
console.log(`There are ${parser.addSemuaPerson().length} people in the file '${parser._file}'.`)

// console.log(parser.parseObj());
// console.log(parser.parseObj());
// console.log(parser.save());
// console.log(parser.addSemuaPerson().length);
