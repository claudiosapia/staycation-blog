
const express = require('express');
const app = express();
const port = 3000;
const http = require('http');
const https = require('https');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.use("/public", express.static(__dirname+ '/public'));
app.use("/public", express.static(__dirname+ '/'));

var blogContent=[];

app.get('/',(req,res)=> {
    var date = new Date();
    date = date.toLocaleDateString();

    res.render('index', {blogContent:blogContent , date: date})
});

app.get('/write',(req,res)=> {
    res.render('write')
});
app.get('/favicon.ico', (req, res) => res.status(204));



app.post('/write',(req,res)=> {
    var {title, author, description, location, url, dateStart, dateEnd, files, trimmedText, key}= req.body;
    
    key= Date.now();
    trimmedText = description.slice(0, 20);

    var item= {title, author, description, location, url, dateStart, dateEnd, files, trimmedText, key};

    blogContent.push(item);
   

    res.redirect('/');
});
app.get('/favicon.ico', (req, res) => res.status(204));


app.get('/:id',(req,res)=> {
    var query= req.params.id; 
    console.log(query);

    function arrayFind(dynamo) {
       key= Number(query);
       return dynamo.key === key;
    } 
     
    

     var found= blogContent.find(arrayFind); 
   
    


    res.render('found', {found:found})
});




app.listen(port, function(){
    console.log("Server is running on" + port)
})


