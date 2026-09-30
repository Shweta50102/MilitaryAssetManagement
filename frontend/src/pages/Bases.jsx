import { useEffect, useState } from "react";
import { getBases } from "../services/api";

function Bases() {
    const [bases, setBases] = useState([]);

    useEffect(() => {
        getBases()
            .then((data) => {
                setBases(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <div className="page-header">
                <div>
                    <h2>Bases</h2>
                    <p>Manage military bases and locations</p>
                </div>
            </div>

            <div className="data-card">
                <h3>Base Information</h3>

                {bases.length === 0 ? (
                    <p>No bases found.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Base Name</th>
                                <th>Location</th>
                                <th>Code</th>
                            </tr>
                        </thead>

                        <tbody>
                            {bases.map((base) => (
                                <tr key={base.id}>
                                    <td>{base.id}</td>
                                    <td>{base.name}</td>
                                    <td>{base.location}</td>
                                    <td>{base.code}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default Bases;