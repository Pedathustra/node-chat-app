const expect = require('expect');
const {Users} = require('./users');

describe('Users', ()=>{
    it('should add new user', ()=>{
        var users = new Users();
        var user = {
          id: '123',
          name: 'Pebbles',
          room: 'The Office Fans'
        }
        var resUser = users.addUser(user.id, user.name, user.room);
        //toEqual for objects
        expect(users.users).toEqual([user]);
    });
});
