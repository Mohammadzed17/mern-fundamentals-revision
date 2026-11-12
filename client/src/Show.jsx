import { useParams,Link } from "react-router-dom"
import { useEffect, useState } from "react";
import "./Show.css"
function Show(){

    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState("");

    const [selectedTask, setSelectedTask] = useState([]);

    useEffect(
        () =>{
            async function showTaskDetails(){
                try{

                    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`);
                    const data = await response.json();

                    setSelectedTask(data);

                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch task details");
                }
                }
                catch(error){
                    setError(error.message);
                }
                finally{
                    setLoading(false)
                }
            }
            showTaskDetails();
        },[]
    )

    if(loading){
        return <div className="loading-container"> <p className="loading-text"> Task details are Loading.... </p></div>
    }
    const formattedDate = selectedTask?.Due_date ? selectedTask.Due_date.split("T")[0] : "";
    return(
        <>
         { error && <div> {error}</div>}
         <div className="show-page-wrapper">
            <div className="show-task-container">
                <div className="task-header-row">
                    <span className={`task-badge priority-${selectedTask?.Priority?.toLowerCase()}`}>
                        {selectedTask?.Priority}
                    </span>
                    <span className={`task-badge status-${selectedTask?.Status?.toLowerCase()}`}>
                        {selectedTask?.Status}
                    </span>
                </div>

                <h1 className="task-title">{selectedTask?.title}</h1>
                
                <div className="task-meta-group">
                    <div className="meta-item">
                        <span className="meta-label">Subject</span>
                        <span className="meta-value">{selectedTask?.Subject}</span>
                    </div>
                    <div className="meta-item">
                        <span className="meta-label">Due Date</span>
                        <span className="meta-value">{formattedDate}</span>
                    </div>
                </div>

                <div className="task-description-box">
                    <h3>Description</h3>
                    <p>{selectedTask?.Description || "No description provided for this task."}</p>
                </div>

                <div className="task-actions">
                    <Link to="/" className="btn-secondary">Back to Dashboard</Link>
                    <Link to={`/edit/${selectedTask?._id}`} className="btn-primary">Edit Task</Link>
                </div>
            </div>
        </div>
        </>
    )
}

export default Show