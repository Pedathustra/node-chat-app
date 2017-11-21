[{
  id: '',
  name: '',
  room: ''
}]

//addUser(id,name,room)
//removeUser(id)
//getUser(id)
//getUserList(ro)

class Users{
    constructor (){
        this.users = [];
    }
    addUser(id,name,room){
        var user = {id,name,room};
        this.users.push(user);
        return user;
    }
}
module.exports={Users};

/*
//es6 class
class Person {
  constructor(name, age){
      this.name = name;
      this.age = age;
  }
  //method
  getUserDescription(){
    return `${this.name} is ${this.age} year(s) old.`
  }
}

var me = new Person('Pebbles',9)
var desc = me.getUserDescription();
console.log(desc);
*/
