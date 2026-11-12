import { useState } from "react"
import { useNavigate } from "react-router-dom";


function CreateTask(){

    const [title,setTitle] = useState("");
    const [subject,setSubject] = useState("");
    const [description,setDescription] = useState("");
    const [due_date,setDue_date] = useState("");
    const [priority,setPriority] = useState("High");
    const [status,setStatus] = useState("Pending");

    const navigate = useNavigate();
    
    function handleTitleInput(e){
        setTitle(e.target.value);
    }
    function handleSubjectInput(e){
        setSubject(e.target.value);
    }
       function handleDescriptionInput(e){
        setDescription(e.target.value);
    }
    function handleDateInput(e){
        setDue_date(e.target.value);
    }
       function handlePriorityInput(e){
        setPriority(e.target.value.toLowerCase());
    }
    function handleStatusInput(e){
        setStatus(e.target.value);
    }
    function handleAddTask(e){
        e.preventDefault();
        async function sendData(){
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks`,{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({
                    title : title,
                    Subject : subject,
                    Description : description,
                    Due_date: due_date,
                    Priority : priority.toLowerCase(),
                    Status : status
                })
            }
            )
            const data = await response.json();
            if(!response.ok){
                throw new Error("Adding New Task is Failed !")
            }
            navigate("/");
        }
        catch(error){
            console.log(error)
        }
    }
    sendData();
    }

    return(
        <>
        <div className="create-task-container">
         <form onSubmit={handleAddTask} className="task-form">
            <h2>Create New Task</h2>
                <label htmlFor="title"> Title: </label>
                <input type="text" placeholder="Enter The Title" id="title" value={title} onChange={handleTitleInput} required/>
                <label htmlFor="Subject"> Subject: </label>
                <input type="text" placeholder="Enter The Subject" id="Subject" value={subject} onChange={handleSubjectInput} required/>
                <label htmlFor="Description"> Description: </label>
                <input type="text" placeholder="Enter The Description" id="Description" value={description} onChange={handleDescriptionInput}/>
                <label htmlFor="Due_date"> Choose a Deadline: </label>
                <input type="date" id="Due_date" value={due_date } onChange={handleDateInput}required/>
                <label htmlFor="Priority"> Priority: </label>
                <select id="Priority" value={priority} onChange={handlePriorityInput} required>
                    <option value= "High"> High </option>
                    <option value = "Medium"> Medium </option>
                    <option value = "Low"> Low </option>
                </select>
                <label htmlFor="Status"> Status: </label>
                <select id="Status" value={status} onChange={handleStatusInput} required>
                    <option value="Pending"> Pending </option>
                    <option value="Completed"> Completed </option>
                </select>
                <button type="submit"> Add Task </button>
            </form>
        </div>
        </>
    )
}

export default CreateTask