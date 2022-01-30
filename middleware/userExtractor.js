const jwt = require('jsonwebtoken');

module.exports= (req, res, next) => {
    const authorization = req.get('authorization');
    let token = '';

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        /* token = authorization.split(' ')[1]; */
        token = authorization.substring(7);
    }

    let decoredToken = jwt.verify(token, process.env.SECRET);

    if (!token || !decoredToken.id) {
        return res.status(401).json({
            error: 'token missing or invalid'
        });
    }

    const { id: userId } = decoredToken;
    req.userId = userId;
    next();
}