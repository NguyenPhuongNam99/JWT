const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const verifyToken = require('./middleware/auth');
require('dotenv').config();

app.use(express.json())


//database
let users = [
    {
        id: 1,
        username: 'Jimy',
        refestToken: null
    },
    {
        id: 2,
        username: 'Peter',
        refestToken: null
    }
]

const generateTokens = payload => {
    const {id, username} = payload;
       const accessToken = jwt.sign({id, username}, process.env.ACCESS_TOKEN_SECRET, {
             expiresIn: '5m'
         })
        
        const refestToken = jwt.sign({id, username}, process.env.REFEST_TOKEN_SECRET, {
            expiresIn: "1h"  
        })

        return {accessToken, refestToken}
}

const updaterefestToken= (username, refestToken) => {
    users = users.map(( item) => {
        if(item.username == username){
            console.log('item', item);

            return {
                ...item,
                refestToken
            }
        }
        else{
            
            console.log('po');return item;
        }
        
    })
}

app.post('/login',  (req, res) => {
    const username = req.body.username;
    console.log('username', username)
    const user = users.find((item) => item.username === username)
    console.log('user', user)
    if(!user) return res.sendStatus(401);
    else{
        const tokens =  generateTokens(user);
      
        updaterefestToken(username, tokens.refestToken)
     
      return  res.json(tokens);
       
    }
   
})

app.post('/token', (req, res) => {
    const refestToken= req.body.refestToken;

    if(!refestToken) return  res.sendStatus(401)

    const user = users.find((item) => item.refestToken == refestToken)
    if(!user) return res.sendStatus(403)
    try {
        jwt.verify(refestToken, process.env.REFEST_TOKEN_SECRET)
        const tokens = generateTokens(user)
        updaterefestToken(user.username, tokens.refestToken)
        return res.json(tokens)
    } catch (error) {
        console.log(error);
    }
})


app.delete('/logout', verifyToken, (req, res) => {
    const user = users.find(user => user.id === req.userId)
    updaterefestToken(user.username, null)
})


const PORT =process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`))