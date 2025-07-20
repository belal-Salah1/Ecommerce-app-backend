const jwt = require('jsonwebtoken');

const generateJwt = (payload)=>{
    const token = jwt.sign(payload , process.env.JWT_SECRTER_KEY, { expiresIn: '10m' });
    return token;
}
module.exports = generateJwt;