import React from 'react';
import { Link,useNavigate } from "react-router-dom";
import Blog from './Blog';

export const Navbar = () => {
    const navigate = useNavigate()
    const logout =()=>{
        localStorage.clear()
        navigate("/login")
    }
    return (<>
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-primary">
                <div className="container-fluid">

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item" ><Link className="nav-link" to="/">Home</Link></li>
                            <li className="nav-item"  ><Link className="nav-link" to="/addblog">Add Blog</Link></li>
                            {/* <li className="nav-item"  ><Link className="nav-link" to="/login">Login</Link></li> */}
                            {/* <li className="nav-item"  ><Link className="nav-link" to="/">contact us</Link></li> */}
                            <a className="nav-item" onClick={logout}><li className="nav-link">Logout</li></a>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
        <Blog/>
        </>);

}


export default Navbar;
