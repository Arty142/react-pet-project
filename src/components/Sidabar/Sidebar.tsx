import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const menuItems = [
        { title: "Dashboard", path: "/dashboard", icon: "📊" },
        { title: "Events", path: "/events", icon: "📅" },
        { title: "Tasks", path: "/tasks", icon: "✅" },
        { title: "Settings", path: "/settings", icon: "⚙️" },
];

function Sidebar() {
        return (
                <aside className="sidebar">
                        <h2 className="sidebar__logo">Task Manager</h2>

                        <nav className="sidebar__nav">
                                {menuItems.map((item) => (
                                        <NavLink
                                                key={item.path}
                                                to={item.path}
                                                className={({ isActive }) =>
                                                        `sidebar__link ${isActive ? "sidebar__link--active" : ""}`
                                                }
                                        >
                                                <span>{item.icon}</span>
                                                <span>{item.title}</span>
                                        </NavLink>
                                ))}
                        </nav>
                </aside>
        );
}

export default Sidebar;
