import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Dashboard({tasks, getTasksList}){

    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() =>{
        getTasksList();
    },[]);

    function handleAddClick(){
        navigate('/createTask')
    }

    function handleEditClick(id){
        navigate(`/edit/${id}`);
    }

    function handleShowTask(id){
        navigate(`/show/${id}`)
    }

    async function handleDelete(id){
        try{
            let userConfirmation = confirm("Do you want to delete this task ?");

            if(userConfirmation){
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`,{
                method: "DELETE",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id
                })
            });
            const data = await response.json()
            if(!response.ok){
                throw new Error(data.message || "Unable to Delete this Task")
            }
        }
            getTasksList();
        }
        catch(err){
            console.log(err.message)
        }
    }

    const filteredTasks = tasks.filter((task) => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
);

    return(
        <>
        <div className="dashboard-container">
          <h1 className="dashboard-title"> DashBoard </h1>

          <div className="search-add-forms">

          <div className="addTaskForm">
           <form onSubmit={handleAddClick}>
           <button type="submit" className="addTaskBtn"> Add Task</button>
           </form>
          </div>

          <div className="serach-bar">
            <form>
            <label htmlFor="serach-box"> 🔍 </label>
            <input type="text" placeholder="serach the task by its Title only" id="serach-box"
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </form>
          </div>

          </div>

          <div className="task-cards">
            {filteredTasks.map((task) => {
                return (
                <div key={task._id} className="card"> 
                 <div>

                    <div className="card-header">
                    <p className="card-Subject">{task.Subject}</p>

                    <div className="btns-container">
                    <button className="editBtn" onClick={() => handleEditClick(task._id)}> Edit </button>
                    <button className="deleteBtn" onClick={() => handleDelete(task._id)}> Delete </button>
                    </div>

                    </div>

                    <div onClick={() => handleShowTask(task._id)} title="Click To Open">
                    <h3 className="card-title">{task.title}</h3>
                    <p className="card-Description">{task.Description}</p>
                    </div>

                 </div>
                <div className="card-footer" onClick={() => handleShowTask(task._id)} title="Click To Open">
                    <span className="card-Due_date">{new Date(task.Due_date).toLocaleDateString()}</span>

                    <div>
                    <span className={`card-Priority ${task.Priority?.toLowerCase()}`}>{task.Priority}</span>
                    <span className={`card-Status ${task.Status?.toLowerCase()}`}>{task.Status}</span>
                    </div>  

                </div>
                </div>
                )
            })}
          </div>
          </div>
        </>
    )
}

export default Dashboard