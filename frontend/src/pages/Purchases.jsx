import { useEffect, useState } from "react";
import {
    getPurchases,
    getEquipment,
    getBases,
    addPurchase
} from "../services/api";

function Purchases() {

    const [purchases, setPurchases] = useState([]);
    const [equipment, setEquipment] = useState([]);
    const [bases, setBases] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [equipmentId, setEquipmentId] = useState("");
    const [baseId, setBaseId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [date, setDate] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const loadData = async () => {

        try {

            const purchaseData = await getPurchases();
            const equipmentData = await getEquipment();
            const baseData = await getBases();

            setPurchases(purchaseData);
            setEquipment(equipmentData);
            setBases(baseData);

        } catch (error) {

            console.error(error);
            setError("Unable to load purchase data");
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

            await addPurchase({
                equipmentId: Number(equipmentId),
                baseId: Number(baseId),
                quantity: Number(quantity),
                date: date
            });

            setMessage("Purchase added successfully");

            setEquipmentId("");
            setBaseId("");
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

                    <h2>Purchases</h2>

                    <p>
                        Record and manage equipment purchases
                    </p>

                </div>

                <button
                    className="primary-button"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? "Close Form" : "Add Purchase"}
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

                    <h3>Add Purchase</h3>

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
                                            {item.name} - {item.code}
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

                                <label>Purchase Date</label>

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
                            Save Purchase
                        </button>

                    </form>

                </div>

            )}

            <div className="data-card">

                <h3>Purchase History</h3>

                {purchases.length === 0 ? (

                    <p>No purchases found.</p>

                ) : (

                    <table>

                        <thead>

                            <tr>
                                <th>ID</th>
                                <th>Equipment ID</th>
                                <th>Base ID</th>
                                <th>Quantity</th>
                                <th>Date</th>
                            </tr>

                        </thead>

                        <tbody>

                            {purchases.map((purchase) => (

                                <tr key={purchase.id}>

                                    <td>{purchase.id}</td>
                                    <td>{purchase.equipmentId}</td>
                                    <td>{purchase.baseId}</td>
                                    <td>{purchase.quantity}</td>
                                    <td>{purchase.date}</td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                )}

            </div>

        </div>
    );
}

export default Purchases;