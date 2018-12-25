var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var socketID;
var router = require("./routes/routes")
var io = require('socket.io')(http);


var port = process.env.PORT || 8000;

app.use('/', router);
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');


/**
 * To support JSON-encoded bodies.
 */
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({ limit: '100mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));


io.on('connection', function (socket) {

    console.log(`user ${socket.id} connected`);
    // socket.emit('custom_event', { "hello": "client" });
    socketID = socket.id;
    module.exports= socketID;
    console.log("here")
    socket.on('disconnect', function () {
        console.log(`user ${socket.id} disconnected`);
    });
});




http.listen(port, function () {
    console.log('listening on *:8000');
});

