const express = require('express');
const router = new express.Router();
const Todo = require('../models/Todo');
const auth = require('../middlewares/auth');


// Get all Todos
router.get('/', auth, async (req, res) => {
    
    const todos = await Todo.find({ user: new Object(req.user._id)});

    if(todos.length < 1){
         return res.send({error: 'Your todos list is empty'})
    }

    res.send(todos);
})

// Add a todo
router.post("/add", auth, async (req, res) => {

   try {
        const {title, isCompleted} = req.body;
        const user = req.user._id;
        const todo = new Todo({title, isCompleted, user});

        await todo.save()

        res.status(201).send({'success': 'Todo added to list'});

   }
   catch(err) {
        res.status(500).send(err.message)
   }
})

// edit a todo by id
router.post('/edit/', auth, async (req, res) => {

     try {
          
          const _id = req.body.id;

          const {title, isCompleted} = req.body;

          const todo = await Todo.findById({ _id });

          if(!todo){
               throw new Error('Todo not found')
          }

          if(title && title != '') {
               todo.title = title;
          }

          if(isCompleted){
               todo.isCompleted = isCompleted;
          }

          await todo.save()
          res.send({success: 'Todo updated succesfully'})

     }
     catch (err) {
          res.status(500).send(err.message)
     }
})


//  delete todo by id
router.post('/delete/', auth, async (req, res) => {

     try {
          const _id = req.body.id;

          const todo = await Todo.findByIdAndRemove({ _id });

          if (!todo) {
               throw new Error('Todo not found')
          }

     
          res.send({ success: 'Todo deleted succesfully' })

     }
     catch (err) {
          res.status(500).send(err.message)
     }
})

module.exports = router