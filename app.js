var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var rekHandler = require('./rekHandler');
var app = express();

var port = process.env.PORT || 3000;

app.use(express.static(__dirname+"/public"));
app.set('view engine', 'ejs');


/**
 * To support JSON-encoded bodies.
 */
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({ limit: '100mb',extended: true }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));


app.get('/', (req, res) => {
    res.sendFile(__dirname+"/index.html");
})

app.get('/facerec', (req, res) => {
    res.sendFile(__dirname+"/public/facerec.html");
})

app.get('/data', (req, res) => {
    console.log("got hit");
    console.log(req.body);
    res.sendStatus(200)
})


app.post('/upload',(req,res) =>{

     new rekHandler().recognizer(req.body,(err,result)=>{
         if(result.results.FaceMatches.length > 0){
            var imageid=result.results.FaceMatches[0].Face.ExternalImageId
            res.render('welcome',{
                data:imageid
       
            })

         }else{
         

            res.render('notrecognized',{
                imagedata:req.body,
                path :result.file_reference
       
            })

         }

        // console.log(err,JSON.stringify(result));
        
        

     }); 


     app.post('/enroll',(req,res) =>{
        new rekHandler().enroll(req.body.imagepath,req.body.participantname,(err,result)=>{
            if(err){
                console.log(error)
            }
            else{
                // console.log(err,JSON.stringify(result));
                console.log("enrolled successfully")
            }
        })

     })

   


})



app.listen(port);
console.log("Server Running Successfully at port " + port);

module.exports = app