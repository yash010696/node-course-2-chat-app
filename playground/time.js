var moment=require('moment');

// var date= new Date();
// var months=['jan','frb','mar','apr','may','june'];
// console.log(months[date.getMonth()]);


var date=moment();
console.log(date.format('MMM YYYY Do'));

console.log('Time:',date.format('hh:mm a'));