const express = require('express');
const app = express();
const { sentences } = require("../randomSentences")
const User = require("../server/models/user");
const cors = require("cors")
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
 app.use(cors()); // Use this after the variable declaration
 

app.get('/api', (req, res) => {
    maxSentences = sentences.length;
let index = Math.floor(Math.random() * (maxSentences - 1));
    res.json({message: sentences[index]});

})
app.use(express.json())
app.post('/user', async(req, res)=> {

    let reqUser = req.body.username
    console.log(reqUser)


    let test = await User.findOne({ username: reqUser })
    if(test){
        res.status(400).send({ message:'already user'})
    } else {
        new User({
            username: reqUser
        }).save()

        res.send('worked')
    }
        
    
})

app.get('/user', async(req, res) => {

    const users = await User.find({}).distinct('username')
    res.json(users)
})


app.listen(5000, () => {
    console.log('Listening')
})