const express = require('express');
const app = express();
const Task = require("../Models/tasks.js");
const cors = require("cors");

require("dotenv").config();

const mongoose = require('mongoose');

const port = process.env.PORT;

async function main(){
    await mongoose.connect(process.env.MONGODB_URL);
}

main().then(() => console.log("connection successfull"))
.catch(err => console.log(err));


app.use(cors({
    origin: process.env.FRONTEND_URL
}));

app.use((req,res,next) =>{
    console.log(`${req.method} ${req.path} ${new Date().toLocaleTimeString()}`);
    next();
});

app.use(express.json());

app.get("/",(req,res) =>{
    res.send("<h1> Hi From Server </h1>");
});

// Index Route 

app.get("/api/tasks",async (req,res) =>{
    try{
        const tasks = await Task.find();
        console.log(tasks);
        res.status(200).json(tasks);
    }
    catch(err){
        res.status(400).json({
            message: err.message
        });
    }
});

// Create route

app.post("/api/tasks",async (req,res) =>{

    try{
        const {title,Subject,Description, Priority, Due_date, Status } = req.body;

        const newTask = new Task({
            title: title,
            Subject: Subject,
            Description: Description,
            Priority: Priority,
            Due_date: Due_date,
            Status: Status
        });

        const savedTask = await newTask.save()

        res.status(201).json({
            newTask: savedTask,
            message: "Data Stored Successfully In Database"
        });
    }
    catch(err){
        res.status(400).json({
            message: err.message
        });
    }
});

// show route 

app.get("/api/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(task);
    } catch (err) {
        res.status(400).json({ 
            message: err.message 
        });
    }
});

// edit route 

app.patch(`/api/tasks/edit/:id`,async (req,res) =>{

    const {id} = req.params;
    
    const {title, Subject, Description,Due_date, Priority, Status } = req.body;

    try{
        const updatedTask = await Task.findByIdAndUpdate(id,{$set: {
            title: title,
            Subject: Subject,
            Description: Description,
            Due_date: Due_date,
            Priority: Priority,
            Status: Status
        }},{ returnDocument: 'after', runValidators: true });

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({
            message: "Task Details Are Successfully Updated",
            updatedTask: updatedTask
        })
    }
    catch(error){
        res.status(400).json({
            message: error.message
        })
    }

});

// delete route 

app.delete("/api/tasks/:id", async (req,res)=>{

    const {id} = req.body;

    try{
        const deletedTask = await Task.findByIdAndDelete(id);

        res.status(200).json({
            message: "Task is successfully deleted",
            deletedTask: deletedTask
        })
    }
    catch(error){
        res.status(400).json({
            message: error.message
        });
    }

})

app.get("/*splat",(req,res) =>{
    res.send("<h1> 404 - The Page Or Resource You Are Looking For Does Not Exist </h1>")
});

app.listen(port,() =>{
    console.log(`server is listening on port ${port}`);
});