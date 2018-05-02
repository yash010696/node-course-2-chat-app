var moment = require('moment');
var generatemessage = (from, text) => {
    // console.log('--------0',from);
    return {
        from,
        text,
        createdAt: moment().valueOf()
    };
};

var generatelocationmessage = (from, latitude, longitude) => {
    // console.log('********',latitude);
    return {
        from,
        url: `http://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: moment().valueOf()
    };
};

module.exports = { generatemessage, generatelocationmessage };