import { useState } from "react";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Bases from "./pages/Bases";
import Equipment from "./pages/Equipment";
import Purchases from "./pages/Purchases";
import Transfers from "./pages/Transfers";
import Assignments from "./pages/Assignments";
import Expenditures from "./pages/Expenditures";
import AuditLogs from "./pages/AuditLogs";
import Users from "./pages/Users";

import Navigation from "./components/Navigation";

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(
        sessionStorage.getItem("auth") !== null
    );

    const [page, setPage] = useState("dashboard");

    if (!isLoggedIn) {
        return (
            <Login onLogin={() => setIsLoggedIn(true)} />
        );
    }

    return (
        <div className="app-layout">

            <Navigation setPage={setPage} />

            <main className="main-content">

                <header className="topbar">
                    <div>
                        <h1>Military Asset Management System</h1>
                        <p>Asset tracking and logistics management</p>
                    </div>

                    <div className="user-section">
                        <span>
                            {sessionStorage.getItem("username")}
                        </span>

                        <button
                            className="logout-button"
                            onClick={() => {
                                sessionStorage.removeItem("auth");
                                sessionStorage.removeItem("username");
                                sessionStorage.removeItem("role");
                                setIsLoggedIn(false);
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </header>

                <section className="page-content">

                    {page === "dashboard" && <Dashboard />}
                    {page === "bases" && <Bases />}
                    {page === "equipment" && <Equipment />}
                    {page === "purchases" && <Purchases />}
                    {page === "transfers" && <Transfers />}
                    {page === "assignments" && <Assignments />}
                    {page === "expenditures" && <Expenditures />}
                    {page === "auditLogs" && <AuditLogs />}
                    {page === "users" && <Users />}

                </section>

            </main>

        </div>
    );
}

export default App;