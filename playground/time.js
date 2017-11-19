const moment = require('moment');

var date = moment();
console.log(date.format('h:mm a'));
//10:35 am

var someTimestamp = moment().valueOf();
console.log(someTimestamp);

var createdAt = 1234
var date2 = moment(createdAt);
console.log(date.format('h:mm a'))
