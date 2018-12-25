var express = require('express');
var router = express.Router();
var rekHandler = require('../rekHandler');
var path = require('path')
var socketId= require('../app');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

console.log("socketId",socketId)

router.get('/greeting',(req,res)=>{
    // console.log(socketOb);
    console.log(socketId);
    console.log("got hit at greeting");
    // socketOb.emit('custom_event', { "hello": "client" })
    io.to(socketId).emit('custom_event', { "hello": "client" })
    res.sendStatus(200)

})


router.get('/', (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, '../') });
})


router.get('/data', (req, res) => {
    console.log("got hit");
    console.log(req.body);
    res.sendStatus(200)
})


router.post('/upload', (req, res) => {

    new rekHandler().recognizer(req.body, (err, result) => {
        if (result.results.FaceMatches.length > 0) {
            var imageid = result.results.FaceMatches[0].Face.ExternalImageId
            res.render('welcome', {
                data: imageid

            })

        } else {


            res.render('notrecognized', {
                imagedata: req.body,
                path: result.file_reference

            })

        }

        // console.log(err,JSON.stringify(result));

    });


});


router.post('/enroll', (req, res) => {
    new rekHandler().enroll(req.body.imagepath, req.body.participantname, (err, result) => {
        if (err) {
            console.log(error)
        }
        else {
            // console.log(err,JSON.stringify(result));
            console.log("enrolled successfully")
        }
    })

})


module.exports= router;