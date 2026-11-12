import { NavLink } from "react-router-dom"
import Dashboard from "./Dashboard"


function NavBar(){

    return(
        <>
          <nav className="navbar">
            <div className="nav-brand">Study Task Manager</div>
            <div className="nav-links">
            <NavLink to="/" className={({isActive}) => isActive ? "nav-link-active " : "nav-link"}> DashBoard </NavLink>
            </div>
          </nav>
        </>
    )
}

export default NavBar