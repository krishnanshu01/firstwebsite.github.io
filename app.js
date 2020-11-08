const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs")
const port = 3000;
const bodyparser = require("body-parser")
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/details', {useNewUrlParser: true});
//Define mangoose schema
var details = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    address: String,
    more: String
  });
  const detail = mongoose.model('detail', details);
//add to use pug
app.use(express.urlencoded());
app.use('/static' , express.static('static'));
const pug = require('pug');


app.set('view engine' , 'pug');
//setting path of the engine
app.set('views' ,path.join(__dirname,'views'));

app.get('/' , (req , res) =>{
    const con = 'this is the best place where you can directly contact me without any problem';
    const params = {'title' : 'pubG is a best game not', 'content': con}
    res.status(200).render('index.pug', params)
})
app.post('/' , (req , res) =>{
    var mydata = new detail(req.body);
    mydata.save().then(() =>{
        res.send("<h1><------------- item saved ----------------></h1>")
    }).catch(() => {
        res.status(400).send("not saved")
    });
})

app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
})
