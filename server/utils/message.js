var generatemessage = (from, text) => {
    return {
        from,
        text
    };
};

var generatelocationmessage=(from,latitude,longitude)=>{
    // console.log('********',latitude);
    return {
        from,
        url:`http://www.google.com/maps?q=${latitude},${longitude}`
    };
};

module.exports = { generatemessage ,generatelocationmessage };