import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = ({ active }) => {
    return (
        <nav id="sidebar" className={active ? "active" : ""}>
            <div className="p-4 pt-5">
                <ul className="list-unstyled components mb-5">
                    <li>
                        <Link to="/chat">Chat</Link>
                    </li>
                    <li>
                        <Link to="/violations">Violations</Link>
                    </li>
                    <li>
                        <Link to="/">Contact</Link>
                    </li>
                </ul>

                <div className="footer">
                    <p>@siajlab</p>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
