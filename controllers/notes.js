const noteRouter = require('express').Router();
const Note = require('../models/Notes');
const User = require('../models/User');
const userExtractor = require('../middleware/userExtractor');


noteRouter.get('/', async (req, res) => {
    const notes = await Note.find({}).populate('user', {
        username: 1,
        name: 1,
    });
    res.json(notes);
});

noteRouter.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Note.findById(id).then(note => {
        if (note) {
            res.json(note);
        } else {
            res.status(404).json({ error: 'Note does not exist' });
        }
    }).catch(err => {
        next(err);
    });
});

noteRouter.put('/:id', userExtractor, (req, res, next) => {
    const { id } = req.params;
    const note = req.body;

    const updateNote = {
        title: note.title,
        content: note.content
    };

    Note.findByIdAndUpdate(id, updateNote, { new: true }).then(note => {
        res.json(note);
    }).catch(err => {
        next(err);
    });
});

noteRouter.delete('/:id', userExtractor, async (req, res, next) => {

    const { id } = request.params;

    const note = await Note.findByIdAndDelete(id);
    if (note === null) return response.sendStatus(404);

    response.status(204).end();
});

noteRouter.post('/', userExtractor, async (req, res) => {

    const {
        content,
        important
    } = req.body;
    
    /* sacar el userId de req */
    const { userId } = req;

    const user = await User.findById(userId)

    const note = new Note({
        content: content,
        important: important,
        date: new Date(),
        user: user._id
    });

    try {
        const savedNote = await note.save();
        user.notes = user.notes.concat(savedNote._id);
        await user.save();
        res.json(savedNote);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }

});

module.exports = noteRouter;