const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

require('dotenv').config();

const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String
    }
})

const todoModel = mongoose.model('todo',todoSchema);

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@todo.nu04o.mongodb.net/?retryWrites=true&w=majority&appName=todo`)
.then(()=>{
    console.log('DB connected')
})
.catch(err=>{
    console.log(err);
})

app.post('/todos',async(req,res)=>{
    try{
        const {title,description,isCompleted} = req.body;
        const newTodos = new todoModel({title,description});
        const newAwait = await newTodos.save();
        res.json(newAwait);
    }
    catch(err){
        console.log(err);
    }
})
app.get('/todos',async(req,res)=>{
    try{
        const newGetTodos = await todoModel.find();
        res.json(newGetTodos);
    }
    catch(err){
        console.log(err);
    }
})
app.put('/update/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const {title,description} = req.body;
        const newUpdateTodos = await todoModel.findByIdAndUpdate(id,{title,description});
        res.json(newUpdateTodos);
    }
    catch(err){
        console.log(err);
    }
})
app.delete('/delete/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const newDeleteTodos = await todoModel.findByIdAndDelete(id);
        res.json(newDeleteTodos);
    }
    catch(err){
        console.log(err);
    }
})
app.listen(8000,()=>{
    console.log('port is conneted to port 8000');
})