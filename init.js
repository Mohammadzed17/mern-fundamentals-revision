const mongoose = require("mongoose");
const Task = require("./Models/tasks.js");

async function main(){
   await mongoose.connect(process.env.MONGODB_URL);
}

const allTasks = [
    {title: "Revise MERN Fndamentals", Description: "To get confidence again", Subject: "Development",
        Priority: "high", Due_date: "2026-11-10", Status: "Pending"
    },
    {title: "Learn Authentication", Description: "To go ahead in development", Subject: "Development",
        Priority: "high", Due_date: "2026-11-15", Status: "Pending"
    },
    {title: "Make MERN Project", Subject: "Development",
        Priority: "medium", Due_date: "2026-11-20", Status: "Pending"
    },
    {title: "Learn Deployment", Subject: "Development",
        Priority: "high", Due_date: "2026-11-23", Status: "Pending"
    },
    {title: "Apply For Internship", Subject: "Development",
        Priority: "high", Due_date: "2026-12-10", Status: "Pending"
    }, 
];

main()
    .then(async () => {
        console.log("Connection successful");
        await Task.insertMany(allTasks);
        console.log("All Tasks are saved successfully");
        mongoose.disconnect(); 
    })
    .catch(err => console.log("Database error:", err));
