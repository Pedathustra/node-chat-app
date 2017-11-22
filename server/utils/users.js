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
    removeUser(id){
        //return user that was remvoed
        var user = this.users.filter((user)=>user.id===id)[0];
        if(user){
            this.users = this.users.filter((user)=>user.id!==id);
        }
        return user;
    }
    getUser(id){
            return  this.users.filter((user)=>user.id===id)[0];
    }
    getUserList(room){
        //['mike', 'jen', 'caleb']
        var users = this.users.filter((user)=>user.room===room);
        var namesArray = users.map((user)=>user.name);
        return namesArray;
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
