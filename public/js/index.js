var socket = io();

socket.on('connect', function () {
    console.log("connected to server");
});

socket.on('disconnect', function () {
    console.log("disconnected from server");
});

socket.on('newmessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a')
    // console.log('///////',message.from);
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);

    // console.log("newmessage", message);

    // var li=jQuery('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);

    // jQuery('#messages').append(li);
});

socket.on('newlocationmessage', function (message) {
    var time = moment(message.createdAt).format('h:mm a')
    var template = jQuery('#location-message-template').html();

    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: time
    });

    jQuery('#messages').append(html);

    // var li=jQuery('<li></li>');
    // var a=jQuery('<a target="_blank">My current location</a>');
    // // console.log('==========',message.url);

    // li.text(`${message.from}  ${time}:`);
    // a.attr('href',message.url);
    // li.append(a);
    // jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createmessage', {
        from: jQuery('[name=username]').val(),
        text: jQuery('[name=message]').val()
    }, function () {
        jQuery('[name=message]').val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('GeoLocation not supported for your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Send Location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createlocationmessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function () {
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location');
    });
});