const express = require('express');
const app = express();
const { sentences } = require("../randomSentences")
const User = require("../server/models/user");
const cors = require("cors")
const session = require("express-session");
const bodyParser = require('body-parser')
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({ extended: false }))
 app.use(cors()); // Use this after the variable declaration
 app.use(session({
     secret:'lifeless-gaming-123',
     saveUninitialized: true,
     cookie: {
         secure: true,
         maxAge: 3600000
     }
 }))

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
        
        session.userid = user.username
        console.log(session.userid)
        return res.send('Logged in')
    }
})

app.get('/login', async(req, res) => {
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


app.listen(5000, () => {
    console.log('Listening')
})