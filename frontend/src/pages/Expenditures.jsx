import { useEffect, useState } from "react";
import {
    getExpenditures,
    getEquipment,
    getBases,
    addExpenditure
} from "../services/api";

function Expenditures() {

    const [expenditures, setExpenditures] = useState([]);
    const [equipment, setEquipment] = useState([]);
    const [bases, setBases] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [equipmentId, setEquipmentId] = useState("");
    const [baseId, setBaseId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [reason, setReason] = useState("");
    const [date, setDate] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const loadData = async () => {
        try {
            const expenditureData = await getExpenditures();
            const equipmentData = await getEquipment();
            const baseData = await getBases();

            setExpenditures(expenditureData);
            setEquipment(equipmentData);
            setBases(baseData);
        } catch (error) {
            console.error(error);
            setError("Unable to load expenditure data");
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
            await addExpenditure({
                equipmentId: Number(equipmentId),
                baseId: Number(baseId),
                quantity: Number(quantity),
                reason: reason,
                date: date
            });

            setMessage("Expenditure added successfully");

            setEquipmentId("");
            setBaseId("");
            setQuantity("");
            setReason("");
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
                    <h2>Expenditures</h2>
                    <p>Track equipment used or expended</p>
                </div>

                <button
                    className="primary-button"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? "Close Form" : "Add Expenditure"}
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

                    <h3>Add Expenditure</h3>

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
                                <label>Reason</label>

                                <input
                                    type="text"
                                    value={reason}
                                    onChange={(event) =>
                                        setReason(event.target.value)
                                    }
                                    placeholder="Example: Damaged equipment"
                                    required
                                />
                            </div>

                            <div>
                                <label>Expenditure Date</label>

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
                            Save Expenditure
                        </button>

                    </form>

                </div>
            )}

            <div className="data-card">

                <h3>Expenditure History</h3>

                {expenditures.length === 0 ? (
                    <p>No expenditures found.</p>
                ) : (

                    <table>

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Equipment ID</th>
                                <th>Base ID</th>
                                <th>Quantity</th>
                                <th>Reason</th>
                                <th>Date</th>
                            </tr>
                        </thead>

                        <tbody>

                            {expenditures.map((expenditure) => (

                                <tr key={expenditure.id}>

                                    <td>{expenditure.id}</td>

                                    <td>{expenditure.equipmentId}</td>

                                    <td>{expenditure.baseId}</td>

                                    <td>{expenditure.quantity}</td>

                                    <td>{expenditure.reason}</td>

                                    <td>{expenditure.date}</td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                )}

            </div>

        </div>
    );
}

export default Expenditures;