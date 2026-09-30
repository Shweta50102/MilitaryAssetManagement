import { useEffect, useState } from "react";
import {
    getEquipment,
    getBases,
    addEquipment,
    deleteEquipment
} from "../services/api";

function Equipment() {

    const [equipment, setEquipment] = useState([]);
    const [bases, setBases] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [code, setCode] = useState("");
    const [quantity, setQuantity] = useState("");
    const [baseId, setBaseId] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const loadData = async () => {

        try {

            const equipmentData = await getEquipment();
            const basesData = await getBases();

            setEquipment(equipmentData);
            setBases(basesData);

        } catch (error) {

            console.error(error);
            setError("Unable to load equipment data");
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

            await addEquipment({
                name: name,
                type: type,
                code: code,
                quantity: Number(quantity),
                baseId: Number(baseId)
            });

            setMessage("Equipment added successfully");

            setName("");
            setType("");
            setCode("");
            setQuantity("");
            setBaseId("");

            setShowForm(false);

            loadData();

        } catch (error) {

            setError(error.message);
        }
    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this equipment?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteEquipment(id);

            setMessage("Equipment deleted successfully");

            loadData();

        } catch (error) {

            setError(error.message);
        }
    };

    return (
        <div>

            <div className="page-header">

                <div>
                    <h2>Equipment</h2>

                    <p>
                        Manage military equipment and inventory
                    </p>
                </div>

                <button
                    className="primary-button"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? "Close Form" : "Add Equipment"}
                </button>

            </div>

            {message && (
                <p className="success-message">
                    {message}
                </p>
            )}

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            {showForm && (

                <div className="form-card">

                    <h3>Add Equipment</h3>

                    <form onSubmit={handleSubmit}>

                        <div className="form-grid">

                            <div>
                                <label>Equipment Name</label>

                                <input
                                    type="text"
                                    value={name}
                                    onChange={(event) =>
                                        setName(event.target.value)
                                    }
                                    placeholder="Example: Military Truck"
                                    required
                                />
                            </div>

                            <div>
                                <label>Equipment Type</label>

                                <input
                                    type="text"
                                    value={type}
                                    onChange={(event) =>
                                        setType(event.target.value)
                                    }
                                    placeholder="Example: Vehicle"
                                    required
                                />
                            </div>

                            <div>
                                <label>Equipment Code</label>

                                <input
                                    type="text"
                                    value={code}
                                    onChange={(event) =>
                                        setCode(event.target.value)
                                    }
                                    placeholder="Example: TRK002"
                                    required
                                />
                            </div>

                            <div>
                                <label>Quantity</label>

                                <input
                                    type="number"
                                    min="0"
                                    value={quantity}
                                    onChange={(event) =>
                                        setQuantity(event.target.value)
                                    }
                                    required
                                />
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

                        </div>

                        <button
                            type="submit"
                            className="primary-button"
                        >
                            Save Equipment
                        </button>

                    </form>

                </div>
            )}

            <div className="data-card">

                <h3>Equipment List</h3>

                {equipment.length === 0 ? (

                    <p>No equipment found.</p>

                ) : (

                    <table>

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Code</th>
                                <th>Quantity</th>
                                <th>Opening Balance</th>
                                <th>Base ID</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {equipment.map((item) => (

                                <tr key={item.id}>

                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.type}</td>
                                    <td>{item.code}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.openingBalance}</td>
                                    <td>{item.baseId}</td>

                                    <td>

                                        <button
                                            className="delete-button"
                                            onClick={() =>
                                                handleDelete(item.id)
                                            }
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                )}

            </div>

        </div>
    );
}

export default Equipment;