const express = require('express');
const app = express();
const { sentences } = require("./randomSentences")
const User = require("./user");
const server = require('http').Server(app)
const io = require('socket.io')(server)
const port = process.env.PORT || 5000;
require('dotenv').config();
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
  debug: true
});
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { v4: uuidV4 } = require('uuid')
app.use('/peerjs', peerServer);

const sessions = require("express-session");
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');

app.use(express.urlencoded({ extended: true, limit: '512kb' }));
app.use(express.json({ limit: '15mb' }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
let website = 'https://reactroast.up.railway.app/'
var cors = require('cors');    
app.use(cors({credentials: true, origin: true}));

app.use(express.urlencoded({ extended: true, limit: '512kb' }));
app.use(sessions({
  name: 'API Roast',
  secret: 'theapibestroast2022',
  resave: true,
  saveUninitialized: true
}));
let session;
let ifLoggedIn;
app.use(bodyParser.json())
app.use(fileUpload());
const oneDay = 1000 * 60 * 60 * 24;
app.use(express.static('public'))
// app.use(sessions({
//   secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
//   saveUninitialized: true,
//   cookie: { maxAge: oneDay },
//   resave: false
// }));

app.get('/api', (req, res) => {
  maxSentences = sentences.length;
  let index = Math.floor(Math.random() * (maxSentences - 1));
  
  res.json({ message: sentences[index] });

})
app.use(express.json())
app.post('/user', async (req, res) => {

  let reqUser = req.body.username
  let reqPassword = req.body.password
  console.log(reqUser)


  let test = await User.findOne({ username: reqUser })
  if (test) {
    
    res.status(400).send({ message: 'already user' })
  } else {
    new User({
      username: reqUser,
      password: reqPassword
    }).save()
    

    res.redirect('/successful_signup')
  }


})
app.post('/login', async (req, res) => {
  let user;
  user = await User.findOne({ username: req.body.username, password: req.body.password })
  if (user === null) {
    
    return res.status(400).json({ message: 'No user found with these credentials' })
  } else {
    session = req.session;
    session.userid = user.username
    console.log(session.userid)
    //ifLoggedIn = true
    return res.send({ loggedIn: true, user: session.userid })
  }
})

app.get('/login', async (req, res) => {
  session = req.session;
  if (session.userid) {
    //ifLoggedIn = true
    res.send({ loggedIn: true, user: session.userid })
  } else {
    //ifLoggedIn = false
    res.send({ loggedIn: false })
  }
})
app.get('/successful_signup', (req, res) => {
  
  res.send('Successfully signed up')
})
app.get('/user', async (req, res) => {

  const users = await User.find({}).distinct('username')
  
  res.json(users)
})

app.get('/logout', async (req, res) => {
  session = req.session;
  req.session.destroy();
  console.log(session.userid + ' before destruction')

  console.log(`Destroyed session at ${Date(Date.now())}`)
  
  res.redirect('/');
})

app.post('/profilepicture', async (req, res) => {
  // console.log(req.body.user)
  // res.send({message: req.body.image})
  await User.findOneAndUpdate({ username: req.body.user }, { profilepicture: req.body.image })
  
  res.send({ message: 'Updated profile picture!' })
})

app.post('/getprofilepicture', async (req, res) => {

  
  await User.find({ username: req.body.username }).select('profilepicture').then((response) => res.send(response[0]))

})
app.get('/', (req, res) => {
  
  res.send('Welcome to the home page')
})

app.get('/covid', (req, res) => {

  fetch('https://api.covidtracking.com/v2/states.json').then(response => response.json()).then(data => res.send(
    
  {
    name: data['data'][0].name ,
    state_code: data['data'][0].state_code,
    population: data['data'][0].census['population'],
    url:  data['data'][0].sites[0].url,
    
  },
    ))
})

let final;

app.post('/getgoogle', async(req, res) => {
  
  let uid = req.body.uid;
  
  let email = req.body.email
  
  
  let validation = await User.findOne({ username: email })
  let pfp = await User.findOne({ username: email }).select('profilepicture')
  if(validation){
    session = req.session

    session.userid = email
    //console.log(session.userid)
    final = {
      username: session.userid,
      profilepicture: pfp,
      uid: uid,
      loggedIn: true
    }
    //ifLoggedIn = true
    res.status(200).send({ message: "logged in with google", email: email, loggedIn: true })
    
  }

  else {
    
    User.create({ username: email ,  profilepicture: req.body.profilepicture, uid: req.body.uid })
    session = req.session

    session.userid = email
    //console.log(session.userid)
    final = session.userid
     res.status(200).send({ message: "Created an account", uid: req.body.uid })
  }
 
  
})

// app.get('/t', async(req, res) => {

//   let ugh = await User.findOne({ username: 'test' }).select('profilepicture')

//   res.send({ message: ugh.profilepicture})
// })

app.get('/googlepost', (req, res) => {
  session = req.session
  //console.log(session)
  //console.log(session.userid)

  if(final.username) {
    //ifLoggedIn = true
     res.send({ loggedIn: true, username: final.username ,pfp: final.profilepicture, uid: final.uid })
  }
  else if(final.username === undefined) {
    //ifLoggedIn = false
    res.send({ loggedIn: false })
  }
  
})

app.post('/googlelogout', async(req, res) => {
  //ifLoggedIn = false
  res.send({ loggedIn: false })
})

app.post('/flashcard', async(req, res) => {

  let testUser = await User.findOne({ username: req.body.username }).select("cards")
  //User.create({ cards: { flashcard: ['hello'], answer:["world"]} })
  
  //res.send({ flashcard: req.body.flashcard, answer: req.body.answer, user: req.body.username })
  //console.log(testUser['cards'].flashcard)
  let firstArray = testUser['cards'].flashcard
  firstArray.push(req.body.flashcard)
  let answerArray = testUser['cards'].answer
  answerArray.push(req.body.answer)

  await User.findOneAndUpdate({ username: req.body.username }, { cards: { flashcard: firstArray, answer: answerArray }})
  res.send({ flashcard: req.body.flashcard, answer: req.body.answer, user: req.body.username })
})

app.post('/getflashcard', async(req, res) => {
   
  let ugh = await User.find({ username: req.body.username }).select("cards")
  res.send(ugh)
})

app.get('/testnet', async(req, res) => {

  let final = await User.findOne({ username: "testing" }).select("cards")

  res.send(final)
})


app.listen(process.env.PORT || 5000, function () {

  console.log(`Server listening on port 3000, http://localhost:5000 ${process.env.PORT}`);
});
