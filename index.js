require('dotenv').config();
require('./mongo.js');

const express = require('express');
const app = express();
const cors = require('cors');
const notFound = require('./middleware/notFound.js');
const handleError = require('./middleware/handleError.js');
const userRouter= require('./controllers/users');
const loginRouter = require('./controllers/login');
const noteRouter = require('./controllers/notes');

app.use(cors());
app.use(express.json());
app.use('/images',express.static('images'));

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

app.use('/api/login', loginRouter);

app.use('/api/notes', noteRouter);

app.use('/api/users', userRouter);

app.use(notFound)

app.use(handleError);


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running  on port ${PORT}`);
});