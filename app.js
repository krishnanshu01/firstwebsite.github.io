const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs")
let port = process.env.PORT || 8080;//ye rha port
//
const bodyparser = require("body-parser")
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://krishnanshu:krish143@cluster0.wxqsk.mongodb.net/krishnanshu?retryWrites=true&w=majority', {useNewUrlParser: true});
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
    const params = {'title' : 'pubG is a best game not'}
    res.status(200).render('index.pug', params)
})
app.get('/defaultrout' , (req , res) =>{
    res.status(200).json({'hello': 'hekki wooerhossd'})
})
// yha schema bna kr main mongo db mai dala hi
app.post('/' , (req , res) =>{
    var mydata = new detail(req.body);
    mydata.save().then(() =>{
        res.send("<h1><------------- item saved ----------------></h1>")
    }).catch(() => {
        res.status(400).send("not saved")
    });
})
//listern port ye rha
app.listen(port, () => {
    console.log(`The application started successfully on port `);
})
//kya missing lg rha isme trko
//kyoke bhai ye first time hi mai koi site bna rha hu toh boht saari mistakes kr rha hougnga
//pr local host pe sahi kam kr rhi hi mre site
