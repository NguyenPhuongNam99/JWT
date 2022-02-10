const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')
require('dotenv').config();

const verifyToken = require('./middleware/auth')


// //database
// const users = [
//     {
//         id: 1,
//         username: 'Jimy'
//     },
//     {
//         id: 2,
//         username: 'Peter'
//     }
// ]

//app

const posts = [
    {
        userId: 1,
        post: 'post Jimy'
    }, 
    {
        userId: 2,
        post: 'post Peter'
    }, 
    {
        userId: 2,
        post: 'post Peter 2'
    }
]


app.use(express.json())


app.get('/posts',verifyToken , (req, res) => {
    res.json(posts.filter(post => post.userId === req.userId))
    // res.json({posts: 'my post'});
})

// app.post('/login', (req, res) => {
//     const username = req.body.username;
//     const user = users.find((item) => item.username === username)
//     console.log('user', user)
//     if(!user) return res.sendStatus(401);
//     else{
//          const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
//              expiresIn: '15s'
//          })
//          console.log('accessToken', accessToken)
//         res.json({accessToken})
//     }
   
// })

const PORT =process.env.PORT || 4000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`))