const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator/check');
const User = require('../models/User');
const Todo = require('../models/Todo');

// @route   GET api/todos
// @desc    Get all users todos
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const Todos = await Todo.find({ user: req.user.id }).sort({ date: -1 });
        res.json(Todos);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/todos
// @desc    Add new todo
// @access  Private
router.post('/', [
    auth, [
        check('name', 'Name is required').not().isEmpty()]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.statis(400).json({ errors: errors.array() });
    }

    const { name, duedate, description, category, severity } = req.body;

    try {
        const newTodo = new Todo({ user: req.user.id, name, duedate, description, category, severity });
        const todo = await newTodo.save();

        res.json(todo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");


    }
});

// @route   PUT api/todos/:id
// @desc    Update existing todo
// @access  Private
router.put('/:id', auth, async (req, res) => {
    const { name, duedate, description, category, severity } = req.body;
    // Build contact object
    const todoFields = {};
    if (name) todoFields.name = name;
    if (duedate) todoFields.duedate = duedate;
    if (description) todoFields.description = description;
    if (category) todoFields.category = category;
    if (severity) todoFields.severity = severity;

    try {
        let todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ msg: 'Contact not found' });
        // Validate User
        if (todo.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized" });
        }
        todo = await Todo.findByIdAndUpdate(req.params.id, { $set: todoFields }, { new: true });

        res.json(todo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route   DELETE api/todos/:id
// @desc    Delete todo
// @access  Private
router.delete('/:id', auth, async (req, res) => {

    try {
        let todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ msg: 'Contact not found' });
        // Validate User
        if (todo.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized" });
        }
        await Todo.findByIdAndRemove(req.params.id);

        res.json("Todo removed");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


module.exports = router;