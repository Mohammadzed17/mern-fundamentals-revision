import CreateTask from "./CreateTask"
import Dashboard from "./Dashboard"
import {Routes,Route, Outlet,useNavigate} from "react-router-dom"
import NavBar from "./NavBar"
import Edit from "./Edit"
import { useState } from "react"
import Show from "./Show"

function App(){

  const [tasks, setTasks] = useState([]);
      const navigate = useNavigate();
  
      async function getTasksList(){
  
          try{
          const response = await fetch("http://localhost:3000/api/tasks");
          const data = await response.json();
  
          setTasks(data);
  
          console.log(tasks);
  
          }
          catch(error){
              console.log(error);
          }
      }

    return(
        <>
        <NavBar/>
          <Routes>
            <Route path="/" element={<Dashboard tasks = {tasks} getTasksList = {getTasksList} />}/>
            <Route path="/createTask" element={<CreateTask/>}/>
            <Route path="/edit/:id" element={<Edit />}/>
            <Route path="/show/:id" element={<Show/>}/>
          </Routes>
        </>
    )
}

export default App