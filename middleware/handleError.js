const ERROR_HANDLERS = {

    'CastError': res => res.status(400).send({ error: 'id use id malformed' }),

    'ValidationError' : (err,res) => res.status(409).send({ error: err.message }),

    'JsonWebTokenError' : res => res.status(401).send({ error: "token missing or invalid" }),

    'TokenExpiredError' : res => res.status(401).send({ error: "token expired" }),

    deafultError: res => res.status(500).end()

}

module.exports  = (err, req, res, next) => {
    console.error(err.name);
    const handler = ERROR_HANDLERS[err.name] || ERROR_HANDLERS.deafultError;
    handler(err, res);
}