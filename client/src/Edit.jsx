import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setUpdatedTitle] = useState("");
    const [subject, setUpdatedSubject] = useState("");
    const [description, setUpdatedDescription] = useState("");
    const [due_date, setUpdatedDue_date] = useState("");
    const [priority, setUpdatedPriority] = useState("high");
    const [status, setUpdatedStatus] = useState("Pending");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getSelectedTask() {
            try {
                const response = await fetch(`http://localhost:3000/api/tasks/${id}`);
                
                if (!response.ok) {
                    throw new Error("Task Not Found");
                }

                const data = await response.json();

                setUpdatedTitle(data.title);
                setUpdatedSubject(data.Subject);
                setUpdatedDescription(data.Description || "");
                setUpdatedDue_date(data.Due_date ? data.Due_date.split("T")[0] : "");
                setUpdatedPriority(data.Priority);
                setUpdatedStatus(data.Status);
            } catch (error) {
                console.log(error.message);
            }
            finally{
                setLoading(false);
            }
        }

        getSelectedTask();
    }, [id]);

    function handleTitleInput(e){ 
        setUpdatedTitle(e.target.value);
    }
    function handleSubjectInput(e){
         setUpdatedSubject(e.target.value); 
    }
    function handleDescriptionInput(e){
         setUpdatedDescription(e.target.value);
    }
    function handleDateInput(e){
         setUpdatedDue_date(e.target.value); 
    }
    function handlePriorityInput(e){
         setUpdatedPriority(e.target.value.toLowerCase());
    }
    function handleStatusInput(e){
         setUpdatedStatus(e.target.value);
    }

    function handleEditTask(e) {
        e.preventDefault();

        async function editData() {
            try {
                const response = await fetch(`http://localhost:3000/api/tasks/edit/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title: title,
                        Subject: subject,
                        Description: description,
                        Due_date: due_date,
                        Priority: priority,
                        Status: status
                    })
                });

                if (!response.ok) {
                    throw new Error("Editing of Task Details Failed!");
                }

                navigate("/");
            } catch (error) {
                console.log(error);
            }
        }
        editData();
    }

    if (loading) {
        return <div className="create-task-container"><h2>Loading task details...</h2></div>;
    }

    return (
        <div className="create-task-container">
            <form onSubmit={handleEditTask} className="task-form">
                <h2>Edit Task Details</h2>
                
                <label htmlFor="title"> Title: </label>
                <input type="text" placeholder="Enter The Title" id="title" value={title} onChange={handleTitleInput} required/>

                <label htmlFor="Subject"> Subject: </label>
                <input type="text" placeholder="Enter The Subject" id="Subject" value={subject} onChange={handleSubjectInput} required/>

                <label htmlFor="Description"> Description: </label>
                <input type="text" placeholder="Enter The Description" id="Description" value={description} onChange={handleDescriptionInput}/>

                <label htmlFor="Due_date"> Choose a Deadline: </label>
                <input type="date" id="Due_date" value={due_date} onChange={handleDateInput} required/>

                <label htmlFor="Priority"> Priority: </label>
                <select id="Priority" value={priority} onChange={handlePriorityInput} required>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>

                <label htmlFor="Status"> Status: </label>
                <select id="Status" value={status} onChange={handleStatusInput} required>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>

                <button type="submit"> Edit Task </button>
            </form>
        </div>
    );
}

export default Edit;