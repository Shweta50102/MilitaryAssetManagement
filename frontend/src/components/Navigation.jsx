function Navigation({ setPage }) {

    const role = sessionStorage.getItem("role");

    return (
        <aside className="sidebar">

            <div className="sidebar-logo">
                <h2>Military AMS</h2>
                <p>Asset Management</p>
            </div>

            <div className="sidebar-menu">

                <button onClick={() => setPage("dashboard")}>
                    Dashboard
                </button>

                {role === "ADMIN" && (
                    <button onClick={() => setPage("bases")}>
                        Bases
                    </button>
                )}

                <button onClick={() => setPage("equipment")}>
                    Equipment
                </button>

                {(role === "ADMIN" ||
                  role === "LOGISTICS_OFFICER") && (
                    <button onClick={() => setPage("purchases")}>
                        Purchases
                    </button>
                )}

                {(role === "ADMIN" ||
                  role === "LOGISTICS_OFFICER") && (
                    <button onClick={() => setPage("transfers")}>
                        Transfers
                    </button>
                )}

                {(role === "ADMIN" ||
                  role === "BASE_COMMANDER") && (
                    <button onClick={() => setPage("assignments")}>
                        Assignments
                    </button>
                )}

                {(role === "ADMIN" ||
                  role === "BASE_COMMANDER") && (
                    <button onClick={() => setPage("expenditures")}>
                        Expenditures
                    </button>
                )}

                {(role === "ADMIN" ||
                  role === "BASE_COMMANDER") && (
                    <button onClick={() => setPage("auditLogs")}>
                        Audit Logs
                    </button>
                )}

                {role === "ADMIN" && (
                    <button onClick={() => setPage("users")}>
                        Users
                    </button>
                )}

            </div>

        </aside>
    );
}

export default Navigation;