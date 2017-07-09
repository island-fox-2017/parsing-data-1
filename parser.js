"use strict"
let fs = require('fs');

class Person {

  constructor(id,first_name,last_name,email,phone,created_at){
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = new Date().toISOString()
  }

  get insert(){
    return `${this.id},${this.first_name},${this.last_name},${this.email},${this.phone},${this.created_at}`
  }
  // Look at the above CSV file
  // What attributes should a Person object have?
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = [];
  }

  get people() {
    return this._people
  }

  ambil (){

    let dataAwal = fs.readFileSync('people.csv','utf8');
    let list = dataAwal.trim().split("\n");
    //let dataL = [];

    for(let i=0;i<list.length;i++){
      list[i] = list[i].split(",")
    }

    for(let i=1;i<list.length;i++){
        let persons = new Person(list[i][0],list[i][1],list[i][2],list[i][3],list[i][4],new Date(list[i][5]))
          this._people.push(persons)
    }
      // let data = list[i];
      // let dataPer1 = data.split(',')
      //   dataL.push(dataPer1)
  return this._people
  }

  save() {
   fs.appendFileSync(this._file,this._people + ("\n"),'utf8')
  }

  addPerson(addData) {
    this._people.push(addData.insert)
    return this._people
  }
  //
  // size(){
  //   return parser.ambil().length
  // }

}


let parser = new PersonParser('people.csv')
// let addData = new Person("201","Ar","ri","ari@google.com","898378",(new Date))
// parser.addPerson(addData)
// parser.save()
console.log(parser.ambil());
// console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)
//console.log(parser._people[170 - 1].last_name);
//console.log(list);
