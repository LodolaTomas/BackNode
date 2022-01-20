const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/User');

loginRouter.post('/', async (req, res, next) => {

    const { body } = req;
    const { username } = body;

    const user = await User.findOne({ username });
    const passwordCorrect = user === null ? false : await bcrypt.compare(body.password, user.passwordHash);

    if (!(user && passwordCorrect)) {
        res.status(401).json({
            error: 'invalid username or password'
        });
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    };
    /*
    60 = 60seg; 
    60 * 60 = 1hs; 
    60 * 60 * 24 = 1 dia; 
    60 * 60 * 24 * 7 = 1 semana;
    60 * 60 * 24 * 30 = 1 Mes;
    60 * 60 * 24 * 365 = 1 anio;
    */
    const token = jwt.sign(userForToken, process.env.SECRET,{expiresIn: 60*60 });

    res.send({ token, username: user.username, name: user.name });


});


module.exports = loginRouter;