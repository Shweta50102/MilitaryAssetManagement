import { useEffect, useState } from "react";
import {
    getTransfers,
    getEquipment,
    getBases,
    addTransfer
} from "../services/api";

function Transfers() {

    const [transfers, setTransfers] = useState([]);
    const [equipment, setEquipment] = useState([]);
    const [bases, setBases] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [equipmentId, setEquipmentId] = useState("");
    const [sourceBaseId, setSourceBaseId] = useState("");
    const [destinationBaseId, setDestinationBaseId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [date, setDate] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const loadData = async () => {
        try {
            const transferData = await getTransfers();
            const equipmentData = await getEquipment();
            const baseData = await getBases();

            setTransfers(transferData);
            setEquipment(equipmentData);
            setBases(baseData);
        } catch (error) {
            console.error(error);
            setError("Unable to load transfer data");
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const getBaseName = (id) => {
        const base = bases.find(
            (item) => item.id === id
        );

        return base ? base.name : id;
    };

    const getEquipmentName = (id) => {
        const item = equipment.find(
            (equipmentItem) => equipmentItem.id === id
        );

        return item
            ? `${item.name} - ${item.code}`
            : id;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setMessage("");
        setError("");

        try {
            await addTransfer({
                equipmentId: Number(equipmentId),
                fromBaseId: Number(sourceBaseId),
                toBaseId: Number(destinationBaseId),
                quantity: Number(quantity),
                transferDate: date
            });

            setMessage("Transfer added successfully");

            setEquipmentId("");
            setSourceBaseId("");
            setDestinationBaseId("");
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
                    <h2>Transfers</h2>
                    <p>Move equipment between military bases</p>
                </div>

                <button
                    className="primary-button"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? "Close Form" : "Add Transfer"}
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

                    <h3>Add Transfer</h3>

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
                                <label>Source Base</label>

                                <select
                                    value={sourceBaseId}
                                    onChange={(event) =>
                                        setSourceBaseId(event.target.value)
                                    }
                                    required
                                >
                                    <option value="">
                                        Select Source Base
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
                                <label>Destination Base</label>

                                <select
                                    value={destinationBaseId}
                                    onChange={(event) =>
                                        setDestinationBaseId(event.target.value)
                                    }
                                    required
                                >
                                    <option value="">
                                        Select Destination Base
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
                                <label>Transfer Date</label>

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
                            Save Transfer
                        </button>

                    </form>

                </div>
            )}

            <div className="data-card">

                <h3>Transfer History</h3>

                {transfers.length === 0 ? (
                    <p>No transfers found.</p>
                ) : (

                    <table>

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Equipment</th>
                                <th>Source Base</th>
                                <th>Destination Base</th>
                                <th>Quantity</th>
                                <th>Date</th>
                            </tr>
                        </thead>

                        <tbody>

                            {transfers.map((transfer) => (

                                <tr key={transfer.id}>

                                    <td>{transfer.id}</td>

                                    <td>
                                        {getEquipmentName(
                                            transfer.equipmentId
                                        )}
                                    </td>

                                    <td>
                                        {getBaseName(
                                            transfer.fromBaseId
                                        )}
                                    </td>

                                    <td>
                                        {getBaseName(
                                            transfer.toBaseId
                                        )}
                                    </td>

                                    <td>
                                        {transfer.quantity}
                                    </td>

                                    <td>
                                        {transfer.transferDate || "-"}
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

export default Transfers;