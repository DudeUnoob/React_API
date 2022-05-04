const express = require('express');
const app = express();
const { sentences } = require("../randomSentences")
const User = require("../server/models/user");
const cors = require("cors")
const sessions = require("express-session");
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({ extended: false }))
 app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
      credentials: true,
    })
  );
  app.use(express.urlencoded({ extended: true, limit:'512kb' }));
  app.use(sessions({
    name:'API Roast',
    secret:'theapibestroast2022',
    resave: true,
    saveUninitialized: true
    }));
  let session;
  app.use(bodyParser.json())
  app.use(fileUpload());
  const oneDay = 1000 * 60 * 60 * 24;
  app.use(express.static('public'))
  app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
  }));

app.get('/api', (req, res) => {
    maxSentences = sentences.length;
let index = Math.floor(Math.random() * (maxSentences - 1));
    res.json({message: sentences[index]});

})
app.use(express.json())
app.post('/user', async(req, res)=> {

    let reqUser = req.body.username
    let reqPassword = req.body.password
    console.log(reqUser)


    let test = await User.findOne({ username: reqUser })
    if(test){
        res.status(400).send({ message:'already user'})
    } else {
        new User({
            username: reqUser,
            password: reqPassword
        }).save()

        res.redirect('/successful_signup')
    }
        
    
})
app.post('/login', async(req, res) => {
    let user;
    user = await User.findOne({ username: req.body.username, password: req.body.password })
    if(user === null){
        return res.status(400).json({ message: 'No user found with these credentials' })
    } else {
        session = req.session;
        session.userid = user.username
        console.log(session.userid)
        return res.send({ loggedIn: true, user: session.userid })
    }
})

app.get('/login', async(req, res) => {
    session = req.session;
    if(session.userid){
        res.send({ loggedIn: true, user: session.userid })
    } else {
        res.send({ loggedIn: false })
    }
})
app.get('/successful_signup', (req, res) => {
    res.send('Successfully signed up')
})
app.get('/user', async(req, res) => {

    const users = await User.find({}).distinct('username')
    res.json(users)
})

app.get('/logout', async(req, res) => {
    session = req.session;
    req.session.destroy();
    console.log(session.userid + ' before destruction')
    
    console.log(`Destroyed session at ${Date(Date.now())}`)
    res.redirect('/home');
})

app.post('/profilepicture', async(req, res) => {
    
})
app.get('/home', (req, res) => {
    res.send('Welcome to the home page')
})
app.listen(5000, () => {
    console.log('Listening')
})