var socket = io();

function scrollToBottom(){
    var message=jQuery('#messages');
    var newmessage=message.children('li:last-child');

    var clientHeight=message.prop('clientHeight');
    var scrollTop=message.prop('scrollTop');
    var scrollHeight=message.prop('scrollHeight');
    var newMessageHeight=newmessage.innerHeight();
    var lastMessageHeight=newmessage.prev().innerHeight();

    if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight >= scrollHeight){
        message.scrollTop(scrollHeight);
        // console.log('should work');
    }

};

socket.on('connect', function () {
    // console.log("connected to server");
    var params=jQuery.deparam(window.location.search);

    socket.emit('join',params,function(err){

        if(err){
            alert(err);
            window.location.href='/';
        }else{
            console.log('NO error');
        }
    });
});

socket.on('disconnect', function () {
    console.log("disconnected from server");
});

socket.on('updateUserList',function(users){
    var ol=jQuery('<ol></ol>');
    users.forEach(function(user){
        ol.append(jQuery('<li></li>').text(user.name));
    });

    jQuery('#users').html(ol);
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
    scrollToBottom();
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
    scrollToBottom();
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
        from: 'Admin',
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