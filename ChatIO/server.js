const express = require('express');
const http = require('http');
const socket = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socket.listen(server);
var usernames = [];

server.listen(process.env.PORT || 3000);
console.log('Server Running...');

app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection',function(socket){
    console.log('Socket Connection Established...');

    //New User
    socket.on('new user',function(data, callback){
        if(usernames.indexOf(data) > -1)
        {
            callback(false);
        }else
        {
            callback(true);
            socket.username = data;
            usernames.push(socket.username);
            updateUsernames();
            //io.sockets.emit('usernames',usernames);
        }
    });

    function updateUsernames(){
        for(i=0;i<usernames.length;i++)
            {
                console.log(usernames[i]);        
            }
        io.sockets.emit('usernames',usernames);
    }
    //Send Message..
    socket.on('send message', function(data){
        io.sockets.emit('new message', {msg: data, user: socket.username});
    });

    //Disconnect Username
    socket.on('disconnect',function(data){
        if(!socket.username){
            return;
        }
        usernames.splice(usernames.indexOf(socket.username),1);
        updateUsernames();
        //io.sockets.emit('usernames',usernames);
            
    });
    // socket.on('send message',function(data){
    //     io.sockets.emit('new message',{msg: data});
    // });
    // socket.emit('news', { hello: 'world' });
    // socket.on('my other event', function (data) {
    //     console.log(data);
    // });
});
