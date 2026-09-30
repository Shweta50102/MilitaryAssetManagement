import { useEffect, useState } from "react";
import {
    getDashboard,
    getBases,
    getEquipment
} from "../services/api";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [error, setError] = useState("");

    const [baseId, setBaseId] = useState("");
    const [bases, setBases] = useState([]);

    const [equipmentType, setEquipmentType] = useState("");
    const [equipmentTypes, setEquipmentTypes] = useState([]);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [showMovementDetails, setShowMovementDetails] = useState(false);

    useEffect(() => {

        setDashboard(null);
        setError("");

        getDashboard(
            baseId,
            equipmentType,
            startDate,
            endDate
        )
            .then((data) => {
                setDashboard(data);
            })
            .catch(() => {
                setError("Unable to load dashboard data");
            });

    }, [baseId, equipmentType, startDate, endDate]);

    useEffect(() => {

        getBases()
            .then((data) => {
                setBases(data);
            })
            .catch((error) => {
                console.error(error);
            });

    }, []);

    useEffect(() => {

        getEquipment()
            .then((data) => {

                const types = [
                    ...new Set(
                        data
                            .map((item) => item.type)
                            .filter((type) => type)
                    )
                ];

                setEquipmentTypes(types);
            })
            .catch((error) => {
                console.error(error);
            });

    }, []);

    if (error) {
        return (
            <div>
                <h2>Dashboard</h2>
                <p>{error}</p>
            </div>
        );
    }

    if (!dashboard) {
        return (
            <div>
                <h2>Dashboard</h2>
                <p>Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div className="dashboard">

            <div className="dashboard-header">

                <div>
                    <h2>Dashboard</h2>

                    <p>
                        Overview of military assets and movements
                    </p>
                </div>

                <div className="dashboard-filter">

                    <div>
                        <label>Base</label>

                        <select
                            value={baseId}
                            onChange={(event) =>
                                setBaseId(event.target.value)
                            }
                        >
                            <option value="">
                                All Bases
                            </option>

                            {bases.map((base) => (
                                <option
                                    key={base.id}
                                    value={base.id}
                                >
                                    {base.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Equipment Type</label>

                        <select
                            value={equipmentType}
                            onChange={(event) =>
                                setEquipmentType(event.target.value)
                            }
                        >
                            <option value="">
                                All Types
                            </option>

                            {equipmentTypes.map((type) => (
                                <option
                                    key={type}
                                    value={type}
                                >
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Start Date</label>

                        <input
                            type="date"
                            value={startDate}
                            onChange={(event) =>
                                setStartDate(event.target.value)
                            }
                        />
                    </div>

                    <div>
                        <label>End Date</label>

                        <input
                            type="date"
                            value={endDate}
                            onChange={(event) =>
                                setEndDate(event.target.value)
                            }
                        />
                    </div>

                    <div>
                        <button
                            type="button"
                            onClick={() => {
                                setBaseId("");
                                setEquipmentType("");
                                setStartDate("");
                                setEndDate("");
                            }}
                        >
                            Clear Filters
                        </button>
                    </div>

                </div>

            </div>

            <div className="dashboard-cards">

                <div className="dashboard-card">
                    <h3>Opening Balance</h3>
                    <p>{dashboard.openingBalance}</p>
                </div>

                <div className="dashboard-card">
                    <h3>Purchases</h3>
                    <p>{dashboard.purchases}</p>
                </div>

                <div className="dashboard-card">
                    <h3>Transfer In</h3>
                    <p>{dashboard.transferIn}</p>
                </div>

                <div className="dashboard-card">
                    <h3>Transfer Out</h3>
                    <p>{dashboard.transferOut}</p>
                </div>

                <div className="dashboard-card">
                    <h3>Assigned</h3>
                    <p>{dashboard.assigned}</p>
                </div>

                <div className="dashboard-card">
                    <h3>Expended</h3>
                    <p>{dashboard.expended}</p>
                </div>

                <div className="dashboard-card closing-card">
                    <h3>Closing Balance</h3>
                    <p>{dashboard.closingBalance}</p>
                </div>

            </div>

            <div
                className="movement-section"
                onClick={() => setShowMovementDetails(true)}
                style={{ cursor: "pointer" }}
            >

                <h3>Net Movement</h3>

                <p>
                    {dashboard.netMovement}
                </p>

                <span>
                    Purchases + Transfer In - Transfer Out
                </span>

                <small>
                    Click to view movement details
                </small>

            </div>

            {showMovementDetails && (
                <div
                    className="modal-overlay"
                    onClick={() => setShowMovementDetails(false)}
                >
                    <div
                        className="movement-modal"
                        onClick={(event) => event.stopPropagation()}
                    >

                        <h2>Net Movement</h2>

                        <div className="movement-detail">
                            <span>Purchases</span>
                            <strong>{dashboard.purchases}</strong>
                        </div>

                        <div className="movement-detail">
                            <span>Transfer In</span>
                            <strong>{dashboard.transferIn}</strong>
                        </div>

                        <div className="movement-detail">
                            <span>Transfer Out</span>
                            <strong>{dashboard.transferOut}</strong>
                        </div>

                        <hr />

                        <div className="movement-detail total">
                            <span>Net Movement</span>
                            <strong>{dashboard.netMovement}</strong>
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowMovementDetails(false)}
                        >
                            Close
                        </button>

                    </div>
                </div>
            )}

        </div>
    );
}

export default Dashboard;