const jwt = require('jsonwebtoken');

const verifyToken = ( req, res, next) => {
    const authHeadser = req.header('Authorization');
    const token = authHeadser && authHeadser.split(' ')[1]

    if(!token) return res.sendStatus(401);
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log('decoded', decoded);
        req.userId = decoded.id
        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(403)
    }
    
}

module.exports = verifyToken;