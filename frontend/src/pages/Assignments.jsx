import { useEffect, useState } from "react";
import {
    getAssignments,
    getEquipment,
    getBases,
    addAssignment
} from "../services/api";

function Assignments() {

    const [assignments, setAssignments] = useState([]);
    const [equipment, setEquipment] = useState([]);
    const [bases, setBases] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [equipmentId, setEquipmentId] = useState("");
    const [baseId, setBaseId] = useState("");
    const [personnelName, setPersonnelName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [date, setDate] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const loadData = async () => {
        try {
            const assignmentData = await getAssignments();
            const equipmentData = await getEquipment();
            const baseData = await getBases();

            setAssignments(assignmentData);
            setEquipment(equipmentData);
            setBases(baseData);
        } catch (error) {
            console.error(error);
            setError("Unable to load assignment data");
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setMessage("");
        setError("");

        try {
            await addAssignment({
                equipmentId: Number(equipmentId),
                baseId: Number(baseId),
                personnelName: personnelName,
                quantity: Number(quantity),
                date: date
            });

            setMessage("Assignment added successfully");

            setEquipmentId("");
            setBaseId("");
            setPersonnelName("");
            setQuantity("");
            setDate("");

            setShowForm(false);

            loadData();

        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>

            <div className="page-header">
                <div>
                    <h2>Assignments</h2>
                    <p>Assign equipment to personnel</p>
                </div>

                <button
                    className="primary-button"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? "Close Form" : "Add Assignment"}
                </button>
            </div>

            {message && (
                <p className="success-message">{message}</p>
            )}

            {error && (
                <p className="error-message">{error}</p>
            )}

            {showForm && (
                <div className="form-card">

                    <h3>Add Assignment</h3>

                    <form onSubmit={handleSubmit}>

                        <div className="form-grid">

                            <div>
                                <label>Equipment</label>

                                <select
                                    value={equipmentId}
                                    onChange={(event) =>
                                        setEquipmentId(event.target.value)
                                    }
                                    required
                                >
                                    <option value="">
                                        Select Equipment
                                    </option>

                                    {equipment.map((item) => (
                                        <option
                                            key={item.id}
                                            value={item.id}
                                        >
                                            {item.name} - {item.code} - Base {item.baseId}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label>Base</label>

                                <select
                                    value={baseId}
                                    onChange={(event) =>
                                        setBaseId(event.target.value)
                                    }
                                    required
                                >
                                    <option value="">
                                        Select Base
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
                                <label>Personnel Name</label>

                                <input
                                    type="text"
                                    value={personnelName}
                                    onChange={(event) =>
                                        setPersonnelName(event.target.value)
                                    }
                                    placeholder="Enter personnel name"
                                    required
                                />
                            </div>

                            <div>
                                <label>Quantity</label>

                                <input
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={(event) =>
                                        setQuantity(event.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div>
                                <label>Assignment Date</label>

                                <input
                                    type="date"
                                    value={date}
                                    onChange={(event) =>
                                        setDate(event.target.value)
                                    }
                                    required
                                />
                            </div>

                        </div>

                        <button
                            type="submit"
                            className="primary-button"
                        >
                            Save Assignment
                        </button>

                    </form>

                </div>
            )}

            <div className="data-card">

                <h3>Assignment History</h3>

                {assignments.length === 0 ? (
                    <p>No assignments found.</p>
                ) : (

                    <table>

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Equipment ID</th>
                                <th>Base ID</th>
                                <th>Personnel Name</th>
                                <th>Quantity</th>
                                <th>Date</th>
                            </tr>
                        </thead>

                        <tbody>

                            {assignments.map((assignment) => (

                                <tr key={assignment.id}>

                                    <td>{assignment.id}</td>

                                    <td>{assignment.equipmentId}</td>

                                    <td>{assignment.baseId}</td>

                                    <td>{assignment.personnelName}</td>

                                    <td>{assignment.quantity}</td>

                                    <td>{assignment.date}</td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                )}

            </div>

        </div>
    );
}

export default Assignments;